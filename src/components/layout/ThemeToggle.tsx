import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "../../hooks/useTheme";
import { color, font } from "../../styles/theme";

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀" },
  { value: "dark", label: "Dark", icon: "☾" },
  { value: "system", label: "System", icon: "◐" },
];

/** Nav-bar Light/Dark/System control. Icon button opens a small popover of the three options. */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentIcon = OPTIONS.find((o) => o.value === theme)?.icon ?? "◐";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        aria-label={`Theme: ${theme}. Currently showing ${resolvedTheme}.`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: `1px solid ${color.border}`,
          background: "transparent",
          color: color.soft,
          fontSize: "13px",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color.faint;
          e.currentTarget.style.color = color.white;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = color.border;
          e.currentTarget.style.color = color.soft;
        }}
      >
        {currentIcon}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: color.surface,
            border: `1px solid ${color.border}`,
            borderRadius: "10px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            minWidth: "110px",
            zIndex: 10,
          }}
        >
          {OPTIONS.map((opt) => {
            const active = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 10px",
                  borderRadius: "6px",
                  border: "none",
                  background: active ? "var(--hover-tint)" : "transparent",
                  color: active ? color.white : color.soft,
                  fontFamily: font.mono,
                  fontSize: "13px",
                  textAlign: "left",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "var(--hover-tint-soft)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ width: "14px", textAlign: "center" }}>{opt.icon}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
