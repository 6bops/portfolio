# Portfolio "wow moment" and extras Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "one system, three skins" hero stage plus an end-of-case-study block, count-up stats, page transitions and a ⌘K palette to layorsalami.com without worsening LCP.

**Architecture:** Skin tokens live in typed data (`src/data/skins.ts`); a `SkinProvider` context holds the active skin and fires `skin_select`, so the hero stage and the palette share one source of truth. The stage re-skins via CSS custom properties scoped to `.skin-stage`. The other extras are independent components wired into `Layout`, `Nav`, `ProjectDetailPage` and `StatsBar`.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, framer-motion (already installed), posthog-js via `trackEvent` in `src/lib/analytics.ts`.

**Spec:** `docs/superpowers/specs/2026-11-08-portfolio-wow-moment-design.md`

**Branch:** work on `portfolio-wow-moment` (cut from `portfolio-expressive-redesign`). Commit each task separately.

## Global Constraints

- No new dependencies and no new heavy assets (images, video, fonts beyond what is loaded).
- Skin tokens are read from the case-study content in `src/data/projects.ts` and its images; if a token cannot be read, stop and ask Layor. Never invent values.
- Only the skin stage is re-skinned; the rest of the site keeps its identity.
- Reduced motion (`prefers-reduced-motion: reduce`): skin swaps are instant with no autoplay; count-up shows final values; page transitions are skipped.
- Skin morph about 400ms; auto-cycle runs once, about 6s total, and stops on first hover or touch.
- Page transition is opacity only, enter about 300ms, and resets scroll to top.
- Stats use tabular numerals so layout does not shift.
- The skin stage must not be the LCP element.
- Event names exactly: `skin_select`, `next_project_click`, `command_palette_open`, `command_palette_select`; `contact_click` with `from_path: "case_study_end"` from the end block.
- There is no test runner and none is added. Verification is `npx tsc --noEmit -p tsconfig.json` (exit 0), browser checks at 1280px and 375px against the dev server (`preview_start` name `portfolio`, port 5173), and PostHog event checks.

## Review Focus

1. Rapid pill clicks during the auto-cycle: no double timers, no stuck skin, no events after unmount (Task 2).
2. Direct load of `/work/<slug>` and `/`: content visible immediately, no fade-out of a page that never rendered; `previewOnly` projects never appear as next project or in the palette (Tasks 3, 5, 6).
3. Palette with no matches shows "No results" and Enter does nothing; Esc returns focus to the previously focused element; it closes on route change (Task 6).
4. A stat value with no digits (for example "Digitized") renders as-is and never as NaN (Task 4).
5. 375px width: skin stage and end block do not overflow horizontally; reduced motion emulated gives instant swaps and no transitions (Tasks 2, 3, 5).

## File Structure

| File | Responsibility |
|---|---|
| `src/data/skins.ts` (create) | Typed skin tokens for the three systems |
| `src/hooks/useSkin.tsx` (create) | `SkinProvider` + `useSkin()`; fires `skin_select` |
| `src/hooks/useSkinCycle.ts` (create) | One-time auto-cycle, stoppable |
| `src/components/ui/SkinStage.tsx` (create) | The stage panel, pills, token readout |
| `src/data/featured.ts` (create) | `FEATURED_ORDER`, `featuredRank`, `getNextProject` (moved from `HomePage.tsx`) |
| `src/components/project/NextProjectBlock.tsx` (create) | Next-project card + email button |
| `src/lib/countUp.ts` (create) | Pure `parseStatValue` |
| `src/components/layout/PageTransition.tsx` (create) | Opacity route transition + scroll reset (replaces `ScrollToTop`) |
| `src/components/layout/CommandPalette.tsx` (create) | ⌘K dialog |
| `src/lib/paletteItems.ts` (create) | Pure item building and filtering |
| `src/lib/contact.ts` (create) | `CONTACT_EMAIL` |
| Modify | `Layout.tsx`, `Nav.tsx`, `HomePage.tsx`, `ProjectDetailPage.tsx`, `StatCallout.tsx`, `StatsBar.tsx`, `global.css`, `data/index.ts` |

---

### Task 1: Skin data and perf baseline

**Files:** Create `src/data/skins.ts`, `docs/superpowers/perf/baseline.json`

**Interfaces:**
- Produces:
  ```ts
  export type SkinId = "indigoemr" | "first-bank-nigeria" | "sharply-africa";
  export type Skin = {
    id: SkinId; name: string; caption: string; fontFamily: string; radius: string;
    density: "compact" | "regular" | "comfortable";
    colors: { bg: string; surface: string; ink: string; muted: string; accent: string; onAccent: string; success: string; danger: string };
    readout: [string, string, string];
  };
  export const SKINS: Record<SkinId, Skin>;
  export const SKIN_ORDER: SkinId[]; // ["indigoemr", "first-bank-nigeria", "sharply-africa"]
  ```

- [ ] **Step 1: Record the LCP baseline before any change.** Run `npm run build && npx vite preview --port 4173` in the background, then `npx lighthouse http://localhost:4173/ --only-categories=performance --preset=desktop --output=json --quiet --chrome-flags="--headless"` three times. Save the median LCP (ms), TBT (ms) and CLS as `{ "lcpMs": n, "tbtMs": n, "cls": n }` in `docs/superpowers/perf/baseline.json`. If Lighthouse cannot run, read LCP from the browser pane with a `PerformanceObserver` (`largest-contentful-paint`) over three loads and record the median instead.
- [ ] **Step 2: Read tokens.** For each system, find in `src/data/projects.ts` and `public/images/*` the colours (hex), font family, corner radius and density. Known: FirstBank is navy and gold, Inter, 4px spacing base (radius must be read from screenshots). If any token for any skin cannot be read, stop and ask Layor for it.
- [ ] **Step 3: Implement `src/data/skins.ts`** with the interface above. Captions: "Healthcare · 200K+ patients" (IndigoEMR), "Banking · 4 products" (FirstBank), "Logistics · 3 products" (Sharply). `readout` is three short lines of the real values (for example font, radius, primary colours).
- [ ] **Step 4: Verify.** `npx tsc --noEmit -p tsconfig.json` exits 0; temporarily deleting `colors.danger` from one skin makes it fail (restore it).
- [ ] **Step 5: Commit.** `git add src/data/skins.ts docs/superpowers/perf/baseline.json && git commit -m "feat: add typed skin tokens and LCP baseline"` (end the message with the Co-Authored-By trailer used in this repo).

---

### Task 2: Skin stage in the hero

**Files:** Create `src/hooks/useSkin.tsx`, `src/hooks/useSkinCycle.ts`, `src/components/ui/SkinStage.tsx`; modify `src/components/layout/Layout.tsx`, `src/components/ui/index.ts`, `src/pages/HomePage.tsx`, `src/styles/global.css`

**Interfaces:**
- Consumes: `SKINS`, `SKIN_ORDER`, `SkinId` (Task 1); `trackEvent` from `src/lib/analytics.ts`.
- Produces:
  ```ts
  export type SkinSource = "click" | "autocycle" | "palette";
  export function SkinProvider(props: { children: ReactNode }): JSX.Element;
  export function useSkin(): { active: SkinId; select: (id: SkinId, source: SkinSource) => void }; // select fires trackEvent("skin_select", { skin: id, source })
  export function useSkinCycle(): { stop: () => void }; // cycles SKIN_ORDER once, ~2s per skin (~6s total), no-op under reduced motion; cleans up on unmount
  export function SkinStage(): JSX.Element;
  ```

- [ ] **Step 1: Implement `SkinProvider` / `useSkin`** in `src/hooks/useSkin.tsx`; initial `active` is `"indigoemr"`. Wrap `Layout`'s content in `SkinProvider`.
- [ ] **Step 2: Implement `useSkinCycle`** with `setTimeout` per step (not an interval), a single `stop()` that clears pending timers, and `useReducedMotion()` from framer-motion to skip entirely.
- [ ] **Step 3: Implement `SkinStage`.** Three pill `<button aria-pressed>` elements (name + caption), a stage panel built from five components (summary card, text input, stepper, status chips, primary button) styled only through `--skin-*` custom properties set inline from `SKINS[active]`, and the three-line `readout` under it. `onPointerEnter`/`onTouchStart` on the stage call `stop()`. Pill click calls `select(id, "click")` then `stop()`. Re-creations only: no images or video. Add `.skin-stage` rules to `global.css` with `transition: background-color 400ms, color 400ms, border-radius 400ms, font-family 0s` and a `prefers-reduced-motion: reduce` block setting `transition: none`, placed after the base rules.
- [ ] **Step 4: Place it.** Export from `ui/index.ts`; render `<FadeIn delay={0.8}><SkinStage /></FadeIn>` in `HomePage.tsx` between the `<header>` and the Marquee block, inside a `data-track-section="skin_stage"` wrapper.
- [ ] **Step 5: Verify.** `tsc` exits 0. In the browser at 1280px: on load the skin changes twice within about 6s then stays; clicking a pill changes `getComputedStyle(document.querySelector('.skin-stage')).fontFamily` and background immediately; the LCP element is not inside `.skin-stage` (run `new PerformanceObserver(l => console.log(l.getEntries().at(-1).element?.className)).observe({type:'largest-contentful-paint', buffered:true})` and confirm the class is not within the stage). At 375px: `document.documentElement.scrollWidth === innerWidth`.
- [ ] **Step 6: Review Focus test (rapid clicks).** Click the three pills ten times within 2s during the auto-cycle; confirm the final skin equals the last clicked pill and no further `skin_select` events with `source: "autocycle"` arrive afterwards (check in PostHog or by logging). Navigate away mid-cycle and confirm no console errors.
- [ ] **Step 7: Reduced-motion check.** Emulate `prefers-reduced-motion: reduce` (reload): no auto-cycle, swap on click is instant (`transition-duration` computed as `0s`).
- [ ] **Step 8: Commit.** `feat: add hero skin stage`

---

### Task 3: End-of-case-study block

**Files:** Create `src/data/featured.ts`, `src/lib/contact.ts`, `src/components/project/NextProjectBlock.tsx`; modify `src/data/index.ts`, `src/pages/HomePage.tsx`, `src/pages/ProjectDetailPage.tsx`, `src/components/project/index.ts` (if it re-exports), `src/styles/global.css`

**Interfaces:**
- Produces:
  ```ts
  // src/data/featured.ts
  export const FEATURED_ORDER: string[]; // ["indigoemr", "first-bank-nigeria", "sharply-africa"]
  export const featuredRank: (slug: string) => number;
  export const getNextProject: (slug: string) => Project | undefined; // next in FEATURED_ORDER, wrapping; skips previewOnly; undefined if the slug is unknown
  // src/lib/contact.ts
  export const CONTACT_EMAIL: string; // "salamilayor@gmail.com"
  // NextProjectBlock
  export function NextProjectBlock(props: { slug: string }): JSX.Element | null;
  ```

- [ ] **Step 1: Move `FEATURED_ORDER` and `featuredRank`** out of `HomePage.tsx` into `src/data/featured.ts` and import them there (DRY); add `getNextProject`.
- [ ] **Step 2: Implement `NextProjectBlock`.** A `Link` card to `/work/${next.slug}` showing title, one-line description (first sentence of `description`), and an `<img loading="lazy">` from `heroMedia` when it is an image (else the first image in `media`, else no image); beside it a plain `<a>` (not `PillLink`, which cannot set `from_path`) with classes `pill-link pill-link--solid`, `href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${project.title} case study`)}`}`, text "Email me about this project". Card click fires `trackEvent("next_project_click", { from: slug, to: next.slug })`; email click fires `trackEvent("contact_click", { href, from_path: "case_study_end" })`. Layout stacks vertically under 640px.
- [ ] **Step 3: Render it** after the Outcome block in `ProjectDetailPage.tsx`, passing `slug`.
- [ ] **Step 4: Verify.** `tsc` exits 0. In the browser: `/work/indigoemr` shows next = First Bank; `/work/first-bank-nigeria` shows Sharply; `/work/sharply-africa` wraps to IndigoEMR. No previewOnly project (flavorqueste, kunda-kids, propty) ever appears. At 375px: no horizontal scroll. Click both controls and confirm `next_project_click` and `contact_click` (`from_path: "case_study_end"`) reach PostHog.
- [ ] **Step 5: Commit.** `feat: add next-project block to case studies`

---

### Task 4: Count-up stats

**Files:** Create `src/lib/countUp.ts`; modify `src/components/ui/StatCallout.tsx`, `src/components/ui/StatsBar.tsx`

**Interfaces:**
- Produces:
  ```ts
  export function parseStatValue(value: string): { prefix: string; number: number; suffix: string } | null;
  // "8+" -> { prefix: "", number: 8, suffix: "+" }; "200K+" -> { prefix: "", number: 200, suffix: "K+" }; "3" -> { prefix: "", number: 3, suffix: "" }; "Digitized" -> null
  // StatCallout gains an optional prop: countUp?: boolean
  ```

- [ ] **Step 1: Verify the parser first.** After implementing `parseStatValue` (first digit run, integers only), in the browser console run `await import('/src/lib/countUp.ts')` and confirm the four examples above return exactly those values, and `"281 → 50,000+"` returns `null` (more than one number is not animated).
- [ ] **Step 2: Wire `StatCallout`.** When `countUp` is true and the value parses, animate the number from 0 to `number` over 1.2s once when scrolled into view (framer-motion `animate` + `useInView({ once: true })`), render `prefix + rounded + suffix`; under reduced motion render the final value immediately; when `parseStatValue` is `null` render `value` unchanged. Add `fontVariantNumeric: "tabular-nums"`. `StatsBar` passes `countUp`.
- [ ] **Step 3: Verify.** `tsc` exits 0. Scroll the home stats into view: values count to 8+, 3, 30+, 200K+ and stop; reload with reduced motion emulated: final values immediately. Case-study `StatCallout`s (no `countUp`) are unchanged.
- [ ] **Step 4: Commit.** `feat: count up home stats`

---

### Task 5: Page transitions

**Files:** Create `src/components/layout/PageTransition.tsx`; modify `src/components/layout/Layout.tsx`; delete `src/components/layout/ScrollToTop.tsx` once unused

**Interfaces:**
- Produces: `export function PageTransition(): JSX.Element` — renders the current route (`useOutlet()`) inside `AnimatePresence mode="wait"` (no `initial` prop), keyed by `pathname`.

- [ ] **Step 1: Implement `PageTransition`.** `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3 } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}`; `AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}`. With `useReducedMotion()` true, render the outlet directly and scroll to top in an effect on `pathname`. On the `motion.div` use `initial={firstRender.current ? false : { opacity: 0 }}`, with a `firstRender` ref cleared in an effect, so a direct load shows content immediately. Do NOT put `initial={false}` on `AnimatePresence`: it disables the nested entrance animations (hero, FadeIn, Stagger, RevealText) on the landing page for the whole life of the page.
- [ ] **Step 2: Wire into `Layout`** in place of `<Outlet />` and `<ScrollToTop />`; remove `ScrollToTop.tsx` and its import.
- [ ] **Step 3: Verify.** `tsc` exits 0. Click Work, then About, then a case study in the nav: opacity animates between pages, `scrollY` is 0 after each, one `$pageview` per navigation (PostHog). Direct load of `/work/indigoemr`: `getComputedStyle` opacity of the page wrapper is `1` within 100ms. Pinned carousels on `/` still pin (scroll through one and confirm `position: sticky` still holds). Reduced motion emulated: no opacity animation.
- [ ] **Step 4: Commit.** `feat: fade between routes`

---

### Task 6: Command palette

**Files:** Create `src/lib/paletteItems.ts`, `src/components/layout/CommandPalette.tsx`; modify `src/components/layout/Layout.tsx`, `src/components/layout/Nav.tsx`, `src/styles/global.css`, and the spec line for skin `source`

**Interfaces:**
- Consumes: `useSkin().select`, `SKINS`/`SKIN_ORDER` (Task 2); `PROJECTS` and `featuredRank` (Task 3); `useTheme()` from `src/hooks/useTheme.tsx`; `CONTACT_EMAIL`.
- Produces:
  ```ts
  export type PaletteItem = { id: string; label: string; group: "Pages" | "Projects" | "Actions"; run: () => void };
  export function buildPaletteItems(deps: { navigate: (to: string) => void; toggleTheme: () => void; selectSkin: (id: SkinId) => void }): PaletteItem[];
  export function filterPaletteItems(items: PaletteItem[], query: string): PaletteItem[]; // case-insensitive substring on label; empty query returns all
  export function CommandPalette(props: { open: boolean; onClose: () => void }): JSX.Element | null;
  // Nav gains an optional prop: onOpenPalette?: () => void
  ```

- [ ] **Step 1: Implement `paletteItems.ts`.** Pages (Home, Work, About, More), Projects (non-`previewOnly`, ordered by `featuredRank`), Actions: "Email Layor" (opens `mailto:` and fires `contact_click` with `from_path: "command_palette"`), "Toggle theme", and one "Skin: <name>" per skin (calls `selectSkin(id)`, then `navigate("/")`; wire `selectSkin` to `select(id, "palette")`). Update the spec's skin `source` values to include `palette`.
- [ ] **Step 2: Verify the filter.** In the browser console `await import('/src/lib/paletteItems.ts')` and confirm `filterPaletteItems(items, "fir")` returns First Bank, `filterPaletteItems(items, "zzz")` returns `[]`, and `filterPaletteItems(items, "")` returns all.
- [ ] **Step 3: Implement `CommandPalette`.** `role="dialog" aria-modal="true" aria-label="Command palette"`, a text input, a `role="listbox"` of `role="option"` rows, a "No results" row when empty. ↑/↓ move the active row, Enter runs it (no-op when there are no results) and closes, Esc closes. Focus moves to the input on open and returns to the element focused before opening on close; Tab/Shift+Tab are trapped inside. Closes on `pathname` change. Fires `command_palette_open` on open and `command_palette_select` with `{ item: id }` on run.
- [ ] **Step 4: Wire `Layout` and `Nav`.** `Layout` owns `open` state and a `keydown` listener for ⌘K / Ctrl+K (`preventDefault`, toggle), attached only when `matchMedia("(hover: hover) and (pointer: fine)").matches`. `Nav` renders a small "⌘K" button (shows "Ctrl K" when `navigator.platform` does not include "Mac") before the theme toggle, hidden by CSS under 768px and on coarse pointers.
- [ ] **Step 5: Verify by keyboard only.** Open with ⌘K, type "sharp", Enter navigates to `/work/sharply-africa` and the dialog closes; reopen, type "zzz", confirm "No results" and Enter does nothing; open with focus on the nav "Work" link and press Esc, confirm focus is back on it; open the palette and click a nav link, confirm it closes on route change; "Skin: FirstBank" lands on `/` with the stage on FirstBank; "Toggle theme" flips `data-theme`. Confirm `command_palette_open` and `command_palette_select` events arrive.
- [ ] **Step 6: Commit.** `feat: add command palette`

---

### Task 7: Speed check

**Files:** Create `docs/superpowers/perf/after.json`

- [ ] **Step 1: Re-measure** exactly as in Task 1 Step 1 (build, preview on 4173, three runs, median) and save `after.json` in the same shape.
- [ ] **Step 2: Compare.** Pass when `after.lcpMs <= baseline.lcpMs + 150` (the allowance covers run-to-run noise) and CLS is not worse than baseline by more than 0.01. If it fails, find the cause (stage markup, a new font, transition wrapper) and fix it before merging; do not raise the allowance.
- [ ] **Step 3: Commit.** `docs: record post-change LCP` and push the branch. After deployment, compare p75 LCP for `/` in PostHog web vitals against the 3.1s figure from the spec.
