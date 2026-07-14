import { Outlet } from "react-router-dom";
import { color, font } from "../../styles/theme";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** App shell: dark background, animated film grain, centred content column, nav + footer. */
export function Layout() {
  return (
    <div style={{ background: color.bg, color: color.white, minHeight: "100vh", fontFamily: font.serif }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1000,
          opacity: 0.03,
          backgroundImage: GRAIN_URL,
          backgroundSize: "128px 128px",
          animation: "grain 4s steps(6) infinite",
        }}
      />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <ScrollToTop />
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
