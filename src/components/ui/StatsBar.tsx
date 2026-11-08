import { StaggerGroup, StaggerItem } from "./Stagger";
import { StatCallout } from "./StatCallout";
import type { Stat } from "../../types";

/** A row of hard numbers, cascading in together. Divided by hairlines rather than cards — credibility, not decoration. */
export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <StaggerGroup className="stats-bar" stagger={0.07}>
      {stats.map((stat) => (
        <StaggerItem key={stat.label}>
          <StatCallout value={stat.value} label={stat.label} compact countUp />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
