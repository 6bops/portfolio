import { StaggerGroup, StaggerItem } from "./Stagger";

/** Not `ProcessStep`: that name is already the case-study type in src/types.ts, with a different shape. */
export type TimelineStep = { title: string; body: string };

/** A connected line of steps — horizontal on desktop, a vertical rail on mobile (see .process-timeline in global.css). */
export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <StaggerGroup className="process-timeline" stagger={0.1}>
      {steps.map((step, i) => (
        <StaggerItem key={step.title} className="process-step">
          <span className="process-step-index">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="process-step-title">{step.title}</h3>
          <p className="process-step-body">{step.body}</p>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
