import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { color, font } from "../../styles/theme";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { CustomCursor } from "./CustomCursor";
import { CommandPalette } from "./CommandPalette";
import { SkinProvider } from "../../hooks/useSkin";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * App shell: dark background, animated film grain, centred content column, nav + footer.
 * `MotionConfig reducedMotion="user"` makes every framer-motion component in the tree
 * respect the OS-level prefers-reduced-motion setting automatically, with no per-component
 * checks needed.
 */
export function Layout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);

  // Desktop-only shortcut: touch devices have no hardware keyboard to trigger it.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SkinProvider>
        <div style={{ background: color.bg, color: color.white, minHeight: "100vh", fontFamily: font.serif }}>
          <div
            className="film-grain"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 1000,
              opacity: 0.03,
              backgroundImage: GRAIN_URL,
              backgroundSize: "128px 128px",
            }}
          />
          <CustomCursor />
          <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 40px" }}>
            <Nav onOpenPalette={openPalette} />
            <PageTransition />
            <Footer />
          </div>
          <CommandPalette open={paletteOpen} onClose={closePalette} />
        </div>
      </SkinProvider>
    </MotionConfig>
  );
}
