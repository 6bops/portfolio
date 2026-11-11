import { useBoard } from "./BoardContext";

const GROUPS = ["Text", "Frames"] as const;

/** The board's objects as a list, like a design tool's layers panel: click one to select it and bring it into view. */
export function LayersPanel() {
  const { objects, selectedId, select, setHover, canvasApi } = useBoard();

  return (
    <nav className="hero-panel hero-layers" aria-label="Layers">
      {GROUPS.map((group) => {
        const rows = objects.filter((o) => o.group === group);
        if (rows.length === 0) return null;
        return (
          <div key={group} className="hero-layers-group">
            <h2 className="hero-panel-head">{group}</h2>
            <ul>
              {rows.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    className="hero-layer"
                    aria-pressed={selectedId === o.id}
                    onClick={() => {
                      select(o.id, "layers");
                      canvasApi.current?.centerOn(o.id);
                    }}
                    onMouseEnter={() => setHover(o.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(o.id)}
                    onBlur={() => setHover(null)}
                  >
                    {o.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
