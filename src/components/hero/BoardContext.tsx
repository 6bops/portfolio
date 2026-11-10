import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { trackEvent } from "../../lib/analytics";
import { CANVAS_OBJECTS, objectSize } from "./canvasObjects";
import type { CanvasObject } from "./canvasObjects";

type Point = { x: number; y: number };
type Size = { w: number; h: number };

export type CanvasApi = { centerOn(id: string): void; fitAll(): void };

export type Board = {
  objects: CanvasObject[];
  positions: Record<string, Point>;
  sizes: Record<string, Size>;
  selectedId: string | null;
  hoverId: string | null;
  select(id: string | null, via: "canvas" | "layers"): void;
  setHover(id: string | null): void;
  moveTo(id: string, x: number, y: number): void;
  reportSize(id: string, w: number, h: number): void;
  canvasApi: MutableRefObject<CanvasApi | null>;
};

const BoardContext = createContext<Board | null>(null);

const INITIAL_POSITIONS: Record<string, Point> = Object.fromEntries(CANVAS_OBJECTS.map((o) => [o.id, { x: o.x, y: o.y }]));
const INITIAL_SIZES: Record<string, Size> = Object.fromEntries(
  CANVAS_OBJECTS.filter((o) => o.kind === "frame").map((o) => [o.id, objectSize(o)]),
);

/**
 * The hero board's shared state: where every object sits, how big it is, and what is selected or
 * hovered. Positions live in memory only, so a reload resets them.
 *
 * `textObjects={false}` (the stacked layout on narrow screens, where the intro and status are page
 * content instead) leaves the Intro and Status objects off the board, and nothing can select them.
 */
export function BoardProvider({ children, textObjects = true }: { children: ReactNode; textObjects?: boolean }) {
  const objects = useMemo(() => (textObjects ? CANVAS_OBJECTS : CANVAS_OBJECTS.filter((o) => o.kind !== "text")), [textObjects]);
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [sizes, setSizes] = useState(INITIAL_SIZES);
  const [selectedId, setSelectedId] = useState<string | null>(textObjects ? "intro" : null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const canvasApi = useRef<CanvasApi | null>(null);

  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;
  const objectsRef = useRef(objects);
  objectsRef.current = objects;

  // Leaving the board (switching to the stacked layout) drops a selection or hover of an object that is gone.
  useEffect(() => {
    const has = (id: string | null) => id === null || objects.some((o) => o.id === id);
    setSelectedId((id) => (has(id) ? id : null));
    setHoverId((id) => (has(id) ? id : null));
  }, [objects]);

  const select = useCallback((id: string | null, via: "canvas" | "layers") => {
    if (id !== null && !objectsRef.current.some((o) => o.id === id)) return;
    if (id === selectedRef.current) return;
    selectedRef.current = id;
    setSelectedId(id);
    if (id !== null) trackEvent("canvas_select", { id, via });
  }, []);

  const setHover = useCallback((id: string | null) => setHoverId(id), []);

  const moveTo = useCallback((id: string, x: number, y: number) => {
    setPositions((p) => (p[id] && p[id].x === x && p[id].y === y ? p : { ...p, [id]: { x, y } }));
  }, []);

  const reportSize = useCallback((id: string, w: number, h: number) => {
    setSizes((s) => (s[id] && s[id].w === w && s[id].h === h ? s : { ...s, [id]: { w, h } }));
  }, []);

  const board = useMemo<Board>(
    () => ({ objects, positions, sizes, selectedId, hoverId, select, setHover, moveTo, reportSize, canvasApi }),
    [objects, positions, sizes, selectedId, hoverId, select, setHover, moveTo, reportSize],
  );

  return <BoardContext.Provider value={board}>{children}</BoardContext.Provider>;
}

export function useBoard(): Board {
  const board = useContext(BoardContext);
  if (!board) throw new Error("useBoard must be used inside <BoardProvider>");
  return board;
}
