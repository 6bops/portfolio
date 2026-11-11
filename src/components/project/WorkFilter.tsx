import type { ProjectTier } from "../../types";

export type WorkFilterId = "all" | ProjectTier;

export type WorkFilterOption = { id: WorkFilterId; label: string; count: number };

type WorkFilterProps = {
  options: WorkFilterOption[];
  value: WorkFilterId;
  onChange: (id: WorkFilterId) => void;
};

/** Chip row that narrows the Work listing by tier. */
export function WorkFilter({ options, value, onChange }: WorkFilterProps) {
  return (
    <div className="work-filter" role="group" aria-label="Filter work">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="work-filter-chip"
          aria-pressed={option.id === value}
          onClick={() => onChange(option.id)}
        >
          {option.label}
          <span className="work-filter-count">{option.count}</span>
        </button>
      ))}
    </div>
  );
}
