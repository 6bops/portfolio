import { Link } from "react-router-dom";
import { CV_VARIANTS } from "../../data/cvs";
import { trackEvent } from "../../lib/analytics";
import { useBoard } from "./BoardContext";
import { projectDetails } from "./canvasObjects";

const INTRO_ROWS = [
  { label: "Focus", value: "Strategy, product design and code" },
  { label: "Based in", value: "the UK" },
  { label: "Experience", value: "9+ years" },
];

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="hero-rows">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Facts about whatever is selected on the board: its position and size, then its project details or text. */
export function Inspector() {
  const { objects, positions, sizes, selectedId } = useBoard();
  const o = objects.find((x) => x.id === selectedId);

  if (!o) {
    return (
      <aside className="hero-panel hero-inspector" aria-label="Inspector">
        <p className="hero-quiet">Nothing selected</p>
      </aside>
    );
  }

  const pos = positions[o.id];
  const size = sizes[o.id];
  const details = o.kind === "frame" ? projectDetails(o) : null;
  const open = details?.open;

  return (
    <aside className="hero-panel hero-inspector" aria-label="Inspector">
      <h2 className="hero-inspector-title">{o.title}</h2>

      <h3 className="hero-panel-head">Position</h3>
      <dl className="hero-pos">
        {[
          ["X", pos ? Math.round(pos.x) : "-"],
          ["Y", pos ? Math.round(pos.y) : "-"],
          ["W", size ? Math.round(size.w) : "-"],
          ["H", size ? Math.round(size.h) : "-"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      {o.id === "intro" && (
        <>
          <h3 className="hero-panel-head">Details</h3>
          <Rows rows={INTRO_ROWS} />
        </>
      )}

      {o.id === "status" && (
        <>
          <p className="hero-status-line">Based in the UK · Open to work: full-time roles, and 0-to-1 contracts</p>
          <h3 className="hero-panel-head">CV</h3>
          <ul className="hero-cvs">
            {CV_VARIANTS.map((cv) => (
              <li key={cv.id}>
                <a
                  href={cv.file}
                  download
                  onClick={() => trackEvent("cv_download", { variant: cv.id, from_path: "homepage_inspector" })}
                >
                  {cv.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {details && (
        <>
          {details.rows.length > 0 && (
            <>
              <h3 className="hero-panel-head">Project</h3>
              <Rows rows={details.rows} />
            </>
          )}
          {open && "to" in open && (
            <Link className="hero-open" to={open.to} onClick={() => trackEvent("canvas_frame_open", { frame: o.id })}>
              Open project →
            </Link>
          )}
          {open && "href" in open && (
            <a
              className="hero-open"
              href={open.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit site ↗<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
        </>
      )}
    </aside>
  );
}
