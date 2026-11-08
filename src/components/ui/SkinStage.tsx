import { useEffect, type CSSProperties } from "react";
import { color, font, sectionLabel } from "../../styles/theme";
import { SKINS, SKIN_ORDER, type Skin } from "../../data/skins";
import { useSkin } from "../../hooks/useSkin";
import { useSkinCycle } from "../../hooks/useSkinCycle";

const FONT_LINK_ID = "skin-stage-fonts";
// Inter and Rubik aren't loaded by the site; fetch them only when the stage mounts.
// css2 serves unicode-range slices, so a latin-only page downloads just the latin files.
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Rubik:wght@400;600&display=swap";

const GAP: Record<Skin["density"], string> = { compact: "10px", regular: "14px", comfortable: "18px" };

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Text colour for a filled accent: the skin's own onAccent unless ink reads better (FirstBank gold). */
function labelOn(skin: Skin): string {
  const { accent, onAccent, ink } = skin.colors;
  return contrast(accent, onAccent) >= contrast(accent, ink) ? onAccent : ink;
}

const STEPS = ["Details", "Review", "Done"];
const CHIPS: { label: string; tone: "success" | "accent" | "danger" }[] = [
  { label: "Active", tone: "success" },
  { label: "Pending", tone: "accent" },
  { label: "Overdue", tone: "danger" },
];

/**
 * Hero demo of "one system, three skins": the same five components re-skinned through
 * `--skin-*` custom properties. Small text always uses `ink`: `muted` (IndigoEMR) and
 * `onAccent` on a gold fill (FirstBank) both fall under 4.5:1, so they only colour
 * borders, fills and the large value. The panel is a picture of controls, not controls,
 * so it is aria-hidden and built from divs (no dead clicks, no focus stops).
 */
export function SkinStage() {
  const { active, select } = useSkin();
  const { stop } = useSkinCycle();
  const skin = SKINS[active];
  const c = skin.colors;

  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  const vars = {
    "--skin-bg": c.bg,
    "--skin-surface": c.surface,
    "--skin-ink": c.ink,
    "--skin-muted": c.muted,
    "--skin-accent": c.accent,
    "--skin-on-accent": labelOn(skin),
    "--skin-success": c.success,
    "--skin-danger": c.danger,
    "--skin-line": `color-mix(in srgb, ${c.ink} 16%, ${c.surface})`,
    "--skin-radius": skin.radius,
    "--skin-gap": GAP[skin.density],
    fontFamily: skin.fontFamily,
  } as CSSProperties;

  return (
    <div style={{ marginBottom: "56px" }}>
      <p style={{ ...sectionLabel, marginBottom: "16px" }}>One system, three skins</p>

      <div className="skin-pills" role="group" aria-label="Choose a design system">
        {SKIN_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className="skin-pill"
            aria-pressed={id === active}
            onClick={() => {
              select(id, "click");
              stop();
            }}
          >
            <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: "15px" }}>{SKINS[id].name}</span>
            <span style={{ fontFamily: font.mono, fontSize: "11px", color: color.soft }}>{SKINS[id].caption}</span>
          </button>
        ))}
      </div>

      <div className="skin-stage" style={vars} onPointerEnter={stop} onTouchStart={stop}>
        <div className="skin-stage__grid" aria-hidden="true">
          <div className="skin-stage__col">
            <div className="skin-card">
              <div className="skin-text">Weekly summary</div>
              <div className="skin-value">12,480</div>
              <div className="skin-text skin-row">
                <span className="skin-dot" style={{ background: "var(--skin-success)" }} />
                12.4% vs last week
              </div>
            </div>
            <div className="skin-field">
              <div className="skin-text skin-field__label">Search records</div>
              <div className="skin-input skin-text">Ada Okafor</div>
            </div>
          </div>

          <div className="skin-stage__col">
            <div className="skin-stepper">
              {STEPS.map((label, i) => (
                <div key={label} className="skin-step">
                  <span
                    className="skin-step__dot skin-text"
                    style={{ borderColor: i === 0 ? "var(--skin-success)" : i === 1 ? "var(--skin-accent)" : "var(--skin-muted)" }}
                  >
                    {i + 1}
                  </span>
                  <span className="skin-text">{label}</span>
                </div>
              ))}
            </div>
            <div className="skin-chips">
              {CHIPS.map((chip) => (
                <span key={chip.label} className="skin-chip skin-text">
                  <span className="skin-dot" style={{ background: `var(--skin-${chip.tone})` }} />
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="skin-button">Save changes</div>
          </div>
        </div>
      </div>

      <div className="skin-readout">
        {skin.readout.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}
