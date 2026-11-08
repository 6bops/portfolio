import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSkin } from "../../hooks/useSkin";
import { useTheme } from "../../hooks/useTheme";
import { trackEvent } from "../../lib/analytics";
import { buildPaletteItems, filterPaletteItems, type PaletteItem } from "../../lib/paletteItems";

const GROUPS: PaletteItem["group"][] = ["Pages", "Projects", "Actions"];
const FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])";

/** ⌘K command palette. Plain dialog; the open state and the shortcut live in Layout. */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    onCloseRef.current();
  }, [pathname]);

  // The dialog is its own component so every open starts from fresh state (query, active row).
  return open ? <PaletteDialog onClose={onClose} /> : null;
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { select } = useSkin();
  const { resolvedTheme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reported = useRef(false);
  const uid = useId();

  const toggleTheme = useCallback(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"), [resolvedTheme, setTheme]);
  const selectSkin = useCallback((id: Parameters<typeof select>[0]) => select(id, "palette"), [select]);
  const items = useMemo(() => buildPaletteItems({ navigate, toggleTheme, selectSkin }), [navigate, toggleTheme, selectSkin]);
  const results = useMemo(() => filterPaletteItems(items, query), [items, query]);

  // Mounting is opening: remember the trigger and focus the input. Unmounting restores focus to the trigger.
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // StrictMode re-runs this effect on mount in dev; the ref keeps the event to one per open.
    if (!reported.current) {
      reported.current = true;
      trackEvent("command_palette_open");
    }
    inputRef.current?.focus();
    // The background should not scroll behind the dialog.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  const run = (item: PaletteItem) => {
    trackEvent("command_palette_select", { item: item.id });
    onClose();
    item.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length === 0) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (i + step + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) run(item);
    } else if (e.key === "Tab") {
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (focusable.length === 0) return e.preventDefault();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialogRef.current?.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const optionId = (item: PaletteItem) => `${uid}-${item.id}`;

  return (
    // Close on click, not mousedown: the browser moves focus after mousedown, which would undo
    // the focus restore that runs when the dialog unmounts.
    <div className="palette-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => {
          // Keep focus in the input (and inside the dialog) when clicking rows or padding.
          if (e.target !== inputRef.current) e.preventDefault();
        }}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={`${uid}-list`}
          aria-activedescendant={results[activeIndex] ? optionId(results[activeIndex]) : undefined}
          aria-autocomplete="list"
          aria-label="Search pages, projects and actions"
          placeholder="Type a command or search..."
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
        />
        <div ref={listRef} id={`${uid}-list`} className="palette-list" role="listbox" aria-label="Commands">
          {GROUPS.map((group) => {
            const rows = results.filter((r) => r.group === group);
            if (rows.length === 0) return null;
            return (
              <div key={group} role="group" aria-labelledby={`${uid}-g-${group}`}>
                <div id={`${uid}-g-${group}`} className="palette-group">
                  {group}
                </div>
                {rows.map((item) => {
                  const selected = results[activeIndex]?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      id={optionId(item)}
                      role="option"
                      aria-selected={selected}
                      className={`palette-option${selected ? " palette-option--active" : ""}`}
                      onMouseMove={() => setActiveIndex(results.indexOf(item))}
                      onClick={() => run(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {results.length === 0 && (
          <div className="palette-empty" role="status">
            No results
          </div>
        )}
      </div>
    </div>
  );
}
