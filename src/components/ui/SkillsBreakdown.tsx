import { StaggerGroup, StaggerItem } from "./Stagger";
import { color, font } from "../../styles/theme";

export type SkillRow = { title: string; body: string };
export type SkillGroup = { heading: string; rows: SkillRow[] };

/** Two columns of hairline-divided rows — tools vs. methods, cascading in independently. */
export function SkillsBreakdown({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="skills-columns">
      {groups.map((group) => (
        <div key={group.heading}>
          <p
            style={{
              fontFamily: font.mono,
              fontSize: "13px",
              color: color.dim,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {group.heading}
          </p>
          <StaggerGroup className="skills-list" stagger={0.06}>
            {group.rows.map((row) => (
              <StaggerItem key={row.title} className="skills-row">
                <span className="skills-row-title">{row.title}</span>
                <p className="skills-row-body">{row.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      ))}
    </div>
  );
}
