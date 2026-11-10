# Canvas Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home hero as a full-width design-tool canvas: floating nav pill, intro and status as movable canvas objects, a Layers sidebar, an inspector and a roaming "Layor" cursor.

**Architecture:** A `BoardProvider` holds object positions, sizes, selection and hover. `DesignCanvas` renders objects on a pan/zoom world and talks to the board; `LayersPanel` and `Inspector` read the same board. `CanvasHero` lays the three out in a grid and receives the intro and status content from `HomePage`. The nav becomes a centered pill; the home hero pulls up under it.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, framer-motion, posthog-js via `trackEvent` in `src/lib/analytics.ts`.

**Spec:** `docs/superpowers/specs/2026-11-10-canvas-hero-design.md`

**Branch:** `portfolio-canvas-hero` (already checked out). It currently holds commit `a46bc8a` (the first canvas hero: a text card over a pan/zoom board) which this plan replaces. One commit per task. Do not push.

## Global Constraints

- No new dependencies. Reuse the existing thumbnails (the 640px ones in `public/images/canvas/`); add only the web-sized Rabii and Mumbuddie app screens used by the phone fans.
- Layor's brief: desktop first (full tool at 1100px and wider), mobile trade-offs accepted. The hero spans the full viewport width with no side padding; the nav is a small centered pill floating over it.
- Exact strings (Layor approves wording later): Status line "Open to work: full-time roles in the UK, and 0-to-1 contracts"; Intro inspector rows Role "Senior Product Designer", Based in "the UK", Experience "9+ years"; roaming cursor label "Layor"; layers groups "Text" and "Frames".
- Events exactly: `canvas_interact` `{ kind: "pan" | "zoom" | "drag" }` once per page view; `canvas_select` `{ id, via: "canvas" | "layers" }`; `canvas_frame_open` `{ frame }`. The site's `.env.local` sends analytics to the real project: intercept `posthog.capture` (import `/src/lib/analytics.ts` in the page and patch `posthog.capture`) when checking events.
- Budget: desktop Lighthouse LCP within +150 ms of `docs/superpowers/perf/after-case-study-pilot.json` (1217, limit 1367) and CLS within +0.01.
- No test runner and none is added. Verification is `npx tsc --noEmit -p tsconfig.json` (exit 0) and browser checks at 1280x800 (and the other widths named) against the dev server (preview name `portfolio`, port 5173). After editing CSS, hard-reload the tab (change the query string) because the browser can serve a stale stylesheet. Reduced motion cannot be emulated by the browser tools: verify those code paths by reading and say so.
- Commit trailer on every commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; add only the files a task lists, by path.

## Review Focus

1. Dragging an object moves only that object (the inspector's X and Y follow); dragging empty board pans; a click that does not move selects and never moves (Task 2).
2. Enter on a focused frame opens its page even after earlier drags; focusing a frame never scrolls or shifts the board (Task 2).
3. At 1280x800 the Intro text, the Status line and the Download CV button are fully inside the first screen, and the CV menu paints above the results stage and sticky bars whether it opens up or down (Tasks 2 and 6).
4. The nav pill never blocks canvas pointer events outside the pill; on the home page it floats over the hero, and every other page still starts below the nav as before (Task 1).
5. The roaming cursor stops when the real pointer is over the canvas, never simulates hover under reduced motion, and cancels its animation frame on unmount (Task 4).

## File Structure

| File | Responsibility |
|---|---|
| `src/components/layout/Nav.tsx` (modify) | Markup stays; classes drive the pill |
| `src/components/hero/canvasObjects.ts` (create, replaces `canvasFrames.ts`) | Object types, the object list, `objectSize`, `projectDetails` |
| `src/components/hero/BoardContext.tsx` (create) | `BoardProvider`, `useBoard` |
| `src/components/hero/DesignCanvas.tsx` (rewrite) | The pan/zoom world, object rendering, drag, keyboard |
| `src/components/hero/LayersPanel.tsx` (create) | Left sidebar |
| `src/components/hero/Inspector.tsx` (create) | Right inspector |
| `src/components/hero/LayorCursor.tsx` (create) | Roaming cursor and simulated hover |
| `src/components/hero/CanvasHero.tsx` (rewrite) | Grid layout of the three regions; takes `intro` and `status` content |
| `src/pages/HomePage.tsx` (modify) | Splits the hero content into `intro` and `status` and passes them in |
| `src/styles/global.css` (modify) | `.site-nav*` pill rules; replaces the `.canvas-hero*` and `.dc-*` block; adds `.lp-*` and `.insp-*` |

## Rulings

- Intro and Status are real DOM inside the scaled board, so the text scales with zoom. The Intro's opening scale (0.85) keeps it near body size.
- Object sizes for text objects come from a `ResizeObserver` on the object's element and are reported to the board; frame sizes come from the image's real proportions.

---

### Task 1: Nav pill

**Files:** modify `src/styles/global.css` (and `src/components/layout/Nav.tsx` only if a class is needed).

**Interfaces:** none new. `--nav-h` stays 64px; sticky and pinned offsets elsewhere are unchanged.

- [ ] **Step 1: Pill styling.** Rework the existing `.site-nav`, `.site-nav::before`, `.site-nav-row` and mobile panel rules: remove the full-width `::before` background and bottom border. `.site-nav` keeps `position: sticky; top: 0; z-index: 960; height: var(--nav-h); margin-bottom: 72px` and gains `pointer-events: none`. `.site-nav-row` becomes the pill: `width: max-content; max-width: calc(100% - 32px); margin: 12px auto 0; height: 44px; padding: 0 20px; gap: 32px; border-radius: 999px; border: 1px solid var(--color-border); background: color-mix(in srgb, var(--color-bg) 78%, transparent); backdrop-filter: blur(14px); pointer-events: auto`. `.nav-links` gap 20px. At 700px and below the row is `width: calc(100% - 32px)` with `justify-content: space-between`. The mobile panel becomes a pill-shaped dropdown under the bar (`top: calc(100% + 8px)`, same background, border, radius 20px, padding 16px 20px, `pointer-events: auto`); drop its full-width `::before`.
- [ ] **Step 2: Verify.** Hard-reload. On `/work`, `/about`, `/work/first-bank-nigeria` at 1280px: the pill is centered, stays at the top after scrolling, links, theme toggle and the ⌘K hint work, content starts where it did before, no horizontal scroll. At 375px: the pill spans the width, the menu opens as a dropdown and closes on navigation. In the light theme the pill is readable. `tsc` exits 0.
- [ ] **Step 3: Commit** `feat: make the menu a floating pill`.

---

### Task 2: Canvas engine and object model

**Files:** create `src/components/hero/canvasObjects.ts`, `src/components/hero/BoardContext.tsx`; rewrite `src/components/hero/DesignCanvas.tsx` and `src/components/hero/CanvasHero.tsx`; delete `src/components/hero/canvasFrames.ts`; modify `src/pages/HomePage.tsx`, `src/styles/global.css`.

**Interfaces:**
- Produces in `canvasObjects.ts`: `type CanvasObject = { id: string; kind: "text" | "frame"; group: "Text" | "Frames"; title: string; x: number; y: number; w: number; slug?: string; to?: string; src?: string; phone?: boolean; aspect?: number }`; `CANVAS_OBJECTS: CanvasObject[]` (below); `objectSize(o: CanvasObject): { w: number; h: number }` for frames (image proportions via `naturalAspect`, else `w / aspect`); `projectDetails(o: CanvasObject): { rows: { label: string; value: string }[]; open?: { to: string } | { href: string } }` using `getProjectBySlug` (rows Role, Year, Status, Platform when the project exists).
- Produces in `BoardContext.tsx`: `BoardProvider({ children })` and `useBoard(): Board` where `Board = { objects: CanvasObject[]; positions: Record<string, { x: number; y: number }>; sizes: Record<string, { w: number; h: number }>; selectedId: string | null; hoverId: string | null; select(id: string | null, via: "canvas" | "layers"): void; setHover(id: string | null): void; moveTo(id: string, x: number, y: number): void; reportSize(id: string, w: number, h: number): void; canvasApi: React.MutableRefObject<{ centerOn(id: string): void; fitAll(): void } | null> }`. `select` fires `canvas_select`. The initial `selectedId` is `"intro"`.
- `CanvasHero({ intro, status }: { intro: ReactNode; status: ReactNode })`.

Board objects (id, group, title, x, y, w, notes), board units:

| id | title | x | y | w | notes |
|---|---|---|---|---|---|
| intro | Intro | 60 | 90 | 500 | text |
| status | Status | 60 | 470 | 500 | text |
| first-bank | First Bank | 660 | 100 | 460 | `to: /work/first-bank-nigeria`, `/images/canvas/first-bank.webp`, slug `first-bank-nigeria` |
| indigoemr | IndigoEMR | 1180 | 60 | 460 | `to: /work/indigoemr`, `/images/canvas/indigoemr.webp`, slug `indigoemr` |
| propty | Propty | 1700 | 120 | 340 | `/images/canvas/propty.webp`, slug `propty` |
| sharply | Sharply | 700 | 480 | 400 | `to: /work/sharply-africa`, `/images/canvas/sharply.webp`, slug `sharply-africa` |
| kunda-kids | Kunda Kids | 1160 | 440 | 300 | `/images/canvas/kunda-kids.webp`, slug `kunda-kids` |
| mumbuddie | Mumbuddie | 1530 | 420 | 450 | aspect 1.2, phone fan (`MUMBUDDIE_FAN`), slug `mumbuddie` |
| rabii | Rabii | 1160 | 690 | 320 | aspect 1.2, phone fan (`RABII_FAN`), slug `rabii` |

- [ ] **Step 1: Data and board.** Create `canvasObjects.ts` and `BoardContext.tsx` as specified. World size is derived: width 2100, height 960 (constants exported).
- [ ] **Step 2: Rewrite `DesignCanvas`** (the viewport only; panels come in Task 3). It reads `useBoard()` and renders every object absolutely at `positions[id]` inside the scaled world. The Intro and Status objects render the `intro` and `status` nodes passed down from `CanvasHero` inside a wrapper (`.dc-obj dc-obj--text`, width = the object's `w`); a `ResizeObserver` on each text object calls `reportSize`. Frames render as before (`.dc-art`, thumbnail, name tag) and report their known size once. Selection: the selected object has `.dc-obj--selected` (accent outline, four corner handles, name tag); a hovered object (`hoverId`, or the real pointer) has `.dc-obj--hover` (outline and tag, no handles). Keep the pan, zoom (Ctrl/Cmd wheel with `deltaMode` normalised and factor `Math.exp(-deltaY * 0.0025)`, pinch, buttons, Fit, keyboard `+`/`-`/`0`/arrows) and the opening view from `a46bc8a`, but: the opening scale is 0.85 and `x` places the Intro's left edge 24px inside the canvas's left edge, `y` places its top 24px from the canvas top; export `centerOn(id)` and `fitAll()` through `canvasApi`.
- [ ] **Step 3: Interaction rules.**
  - A pointer down on an object (not on a button, link or input inside it) arms an object drag; elsewhere it arms a board pan. Primary button only.
  - Nothing is captured until the pointer has moved 6px (Euclidean); then call `setPointerCapture` and start dragging or panning. A drag of an object calls `moveTo(id, ...)` with deltas divided by the current scale. Before that threshold nothing moves, so a plain click reaches links and buttons in every browser.
  - A release without a drag selects the object (`select(id, "canvas")`); a release on empty board with no drag selects nothing (`select(null, "canvas")`).
  - `lostpointercapture` and `pointercancel` clear all pointer state. Two pointers pinch-zoom; one pointer pans or drags.
  - `canvas_interact` fires once per page view with `kind` `pan`, `zoom` or `drag`.
  - The viewport uses `overflow: clip`; focusing a frame pans it into view with `centerOn`. Frames are links (`to`) or divs; Enter on a focused frame opens it (`canvas_frame_open`), always, regardless of earlier drags; a frame's "Open project →" chip appears on hover or selection and opens it by click.
  - `touch-action: pan-y` on the viewport for every device (not only coarse pointers).
  - The canvas region has `role="region"`, a short `aria-label` ("Design canvas") and `aria-describedby` pointing at a visually hidden instructions line (drag to pan, Ctrl or Cmd plus scroll to zoom, arrows to move, Enter opens a project). Frame images use `loading="lazy"` and `decoding="async"`; the first-view text never waits on them.
  - `centerOn` and `fitAll` animate the pan over about 300ms and jump instantly under reduced motion (`useReducedMotion`).
- [ ] **Step 4: `CanvasHero` and `HomePage`.** `CanvasHero` wraps its children in `BoardProvider` and renders a `<section className="canvas-hero">` that is full width (`100vw` breakout as before, no side padding), starts at the very top of the page (`margin-top: calc(-1 * (var(--nav-h) + 72px))`) with `height: clamp(640px, 100vh, 880px)`, and holds only the canvas for now. DOM order puts the intro and status objects before the zoom buttons. In `HomePage`, split the current hero content: `intro` is the `h1` (name words, with the existing animation), the `RevealText` role line and the paragraph; `status` is the "Open to work" line and `<CvMenu />`. Remove the old text card. Under 861px keep the stacked fallback from `a46bc8a` (intro and status above the canvas as page content, canvas 380px tall).
- [ ] **Step 5: CSS.** Replace the `.canvas-hero*` and `.dc-*` block. The CV menu must paint above the results stage and the sticky bars (`.ws-sticky`, `.section-nav`, both 900): the stacking context that contains `CvMenu` (the canvas world or the hero) must have a z-index of 921 or more and less than 960, and the hero must not be `overflow: hidden` around the menu except through `overflow: clip` on `.dc-viewport` (the CV list opens inside a text object, so check it is not clipped when open near the canvas edge). Use theme tokens for colours (no hard-coded near-black on the accent; use `var(--color-bg)`), and a softer `box-shadow` in the light theme (`:root[data-theme="light"] .dc-art`).
- [ ] **Step 6: Verify (1280x800, `/`).** `tsc` exits 0. The Intro text, Status line and Download CV button are fully inside the first screen (report the bottoms); the hero is edge to edge; no horizontal scroll. Click selects (outline, handles), dragging the Intro moves only it, dragging empty board pans, Ctrl+wheel zooms about the cursor, Fit works, arrows/`+`/`-`/`0` work. After dragging a frame, Tab to a frame and press Enter: its page opens. Tabbing to an off-screen frame does not shift the board. With `posthog.capture` intercepted: one `canvas_interact`, `canvas_select` per selection, `canvas_frame_open` on open. The CV menu opens over the first-screen content without being clipped and above the results stage. Other pages are unaffected.
- [ ] **Step 7: Commit** `feat: rebuild the hero canvas with movable objects`.

---

### Task 3: Layers sidebar and inspector

**Files:** create `src/components/hero/LayersPanel.tsx`, `src/components/hero/Inspector.tsx`; modify `src/components/hero/CanvasHero.tsx`, `src/styles/global.css`.

**Interfaces:**
- Consumes: `useBoard()` and `projectDetails` from Task 2.
- Produces: `LayersPanel()` and `Inspector()` (no props).

- [ ] **Step 1: `LayersPanel`.** A `<nav aria-label="Layers">` with two groups headed "Text" and "Frames", each a list of `<button type="button" aria-pressed={selectedId === id}>` rows (the object's title). Click calls `select(id, "layers")` then `canvasApi.current?.centerOn(id)`. `onMouseEnter`/`onFocus` call `setHover(id)` and `onMouseLeave`/`onBlur` call `setHover(null)`. The selected row is highlighted (accent tint).
- [ ] **Step 2: `Inspector`.** An `<aside aria-label="Inspector">` for the selected object (nothing selected: a quiet "Nothing selected" line). Header: the title. A "Position" block: X, Y, W, H, from `positions` and `sizes`, rounded, updating live while dragging. Frames: the `projectDetails` rows (Role, Year, Status, Platform) and an "Open project →" link when `open.to` exists, or "Visit site ↗" (new tab, `rel="noopener noreferrer"`) when it has `open.href`; Rabii shows the details it has. Intro: rows Role "Senior Product Designer", Based in "the UK", Experience "9+ years". Status: the line "Open to work: full-time roles in the UK, and 0-to-1 contracts" and the CV versions as plain download links from `CV_VARIANTS` (`src/data/cvs.ts`) with the `cv_download` event (`{ variant, from_path: "homepage_inspector" }`).
- [ ] **Step 3: Layout.** In `CanvasHero`, at 1100px and wider render a grid `216px minmax(0, 1fr) 264px` with areas `layers canvas inspector`; the panels are docked to the screen edges, blurred and translucent (`color-mix(in srgb, var(--color-bg) 80%, transparent)`, `backdrop-filter: blur(14px)`, hairline borders on the side facing the canvas), full hero height, scrolling internally if needed. DOM order: canvas section first (so the Intro, Status and CV come first), then the layers nav, then the inspector (grid areas place them visually). The panels' top padding clears the nav pill (`var(--nav-h)` plus 8px).
- [ ] **Step 4: Verify (1280x800).** `tsc` exits 0. Selecting on the canvas highlights the layers row and fills the inspector; selecting a layers row selects and centers the object; hovering a row shows the hover state on the board; dragging an object updates X and Y live; the Open project link navigates and fires `canvas_frame_open`; Tab order is Intro and CV, then layers, then frames, then inspector.
- [ ] **Step 5: Commit** `feat: add the layers sidebar and inspector to the hero`.

---

### Task 4: The roaming Layor cursor

**Files:** create `src/components/hero/LayorCursor.tsx`; modify `src/components/hero/DesignCanvas.tsx`, `src/styles/global.css`.

**Interfaces:**
- Consumes: `useBoard()` (`positions`, `sizes`, `setHover`), the world's scale.
- Produces: `LayorCursor({ paused }: { paused: boolean })`, rendered inside the world so it moves and scales with the board.

- [ ] **Step 1: Component.** Renders the existing cursor glyph and "Layor" label at board coordinates. A `requestAnimationFrame` loop moves it along a closed path through the centers of, in order: `intro`, `first-bank`, `status`, `sharply`, `mumbuddie`, `indigoemr`, back to `intro`, at about 110 board units per second, easing between waypoints (centers read from `positions` and `sizes`, so it follows objects the visitor has moved). Each frame, hit-test the cursor point against every object's rectangle and call `setHover(id)` only when the hit object changes (and `setHover(null)` when over empty board). When `paused` is true the loop stops, the cursor fades out and the hover it set is cleared. Cancel the animation frame on unmount.
- [ ] **Step 2: Wiring.** `DesignCanvas` passes `paused` = the real pointer is over the viewport (`pointerenter`/`pointerleave`) or the board is being dragged. Under reduced motion (`useReducedMotion`) the component renders nothing and never calls `setHover`.
- [ ] **Step 3: Verify (1280x800).** The cursor travels over the Intro and its outline, handles and tag appear while it is over it; over a frame the frame shows the hover state; moving the real mouse over the canvas stops it and clears its hover; leaving resumes it; the Layers rows still drive hover while it is paused; after navigating away and back there is no console error and no second loop (check with one `requestAnimationFrame` counter or by reading the code). Reduced motion verified by reading. `tsc` exits 0.
- [ ] **Step 4: Commit** `feat: add the roaming Layor cursor to the hero canvas`.

---

### Task 5: Responsive trade-offs

**Files:** modify `src/components/hero/CanvasHero.tsx`, `src/components/hero/DesignCanvas.tsx` (only as needed), `src/styles/global.css`.

- [ ] **Step 1: Breakpoints.** 1100px and wider: the full grid. 861px to 1099px: canvas only (panels hidden; the layers and inspector are not rendered, so they leave the tab order). 860px and below: the stacked fallback (intro and status as page content above, a 380px canvas below, no roaming cursor hover on touch, `touch-action: pan-y`, the zoom hint hidden). The opening view and `Fit` use the canvas's own size at every breakpoint.
- [ ] **Step 2: Verify.** At 1280, 1000 and 375px (and 861 and 1100): no horizontal scroll; panels appear and disappear at the thresholds; the stacked layout shows the name, role, paragraph, Open to work line and the CV menu above the canvas; on 375px a vertical touch drag scrolls the page (checked by the `touch-action` computed style). `tsc` exits 0.
- [ ] **Step 3: Commit** `feat: simplify the canvas hero below 1100px`.

---

### Task 6: Speed and first-view check

**Files:** create `docs/superpowers/perf/after-canvas-hero.json`.

- [ ] **Step 1: First view.** At 1280x800 on `/`, measure with `getBoundingClientRect` that the Intro's last line, the Status line and the Download CV button end at or above y = 800 without scrolling; also check 1440x900 and 1920x1080 if the browser tools allow, and report the bottoms. Take a screenshot to include in the report.
- [ ] **Step 2: Measure.** `npm run build`; `npx vite preview --port 4173` in the background; `npx lighthouse http://localhost:4173/ --only-categories=performance --preset=desktop --output=json --output-path=<file outside the repo> --quiet --chrome-flags="--headless"` three times; take the median LCP, TBT and CLS; save `{ "lcpMs": n, "tbtMs": n, "cls": n }`. Stop the preview server and leave no process running.
- [ ] **Step 3: Compare.** Pass when `lcpMs <= 1367` and `cls <= 0.01`. On failure find the cause by evidence (the LCP element, shift culprits) and fix only if clearly inside this plan's changes and small; otherwise stop and report the numbers. Do not loosen the limits.
- [ ] **Step 4: Commit** `docs: record canvas hero LCP and CLS` (the JSON file only; put the first-view numbers in the commit body). Do not push.
