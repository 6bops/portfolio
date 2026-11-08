# Results stage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero skin stage with a results stage of four proof cards (£200m+ volume, £20m+ revenue, 3+ VC-funded products, 10+ design systems), reword the design-system copy to match, and re-check speed.

**Architecture:** Task 1 removes the skin feature entirely so the tree builds without it. Task 2 adds typed result data plus a `ResultsStage` that reuses `StatCallout` with `countUp`. Task 3 trims the stats bar to three slots. Task 4 rewords copy only after Layor approves the exact wording. Task 5 re-measures speed.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, framer-motion (installed), posthog-js via `trackEvent` in `src/lib/analytics.ts`.

**Spec:** `docs/superpowers/specs/2026-11-08-portfolio-wow-moment-design.md` (revision 2)

**Branch:** `portfolio-wow-moment` (already checked out). Commit each task separately. Do not push.

## Global Constraints

- No new dependencies and no new heavy assets; no images or video in the stage.
- Claims are worded as what Layor designed or shipped, never "I generated"; every number keeps its "+" floor; no company names on the page unless Layor approves naming them.
- Every result card starts as `{ kind: "ask" }`. A card links to a case study only after Layor confirms the number comes from that project; do not guess a mapping.
- Final copy (card labels and contexts, hero paragraph, Tools row) needs Layor's explicit approval before it ships; Task 4 is blocked until then.
- Reduced motion: count-up shows final values immediately (already handled by `StatCallout`).
- Events exactly: `results_card_click` with `card` and `destination` (`case_study` or `ask`); the "ask" destination also fires `contact_click` with `from_path: "results_stage"` and `card`.
- The track-section id is `results_stage` (was `skin_stage`).
- The stage must not be the LCP element and must not add layout shift; desktop LCP within +150 ms and CLS within +0.01 of `docs/superpowers/perf/baseline.json` (`{ "lcpMs": 1169, "tbtMs": 0, "cls": 0.081 }`: limits 1319 ms and 0.091).
- The two `<link rel="preload">` font tags in `index.html` stay.
- There is no test runner and none is added. Verification is `npx tsc --noEmit -p tsconfig.json` (exit 0), browser checks at 1280px and 375px against the dev server (preview name `portfolio`, port 5173), and event checks with `posthog.capture` intercepted (the site's `.env.local` sends to the real analytics project).

## Review Focus

1. A `case-study` link whose slug does not resolve, or points at a `previewOnly` project, renders as "ask" (Task 2).
2. The "ask" mail subject survives encoding of "£" and "+" (`Ask about: £200m+ Transaction volume in a single year` decodes back exactly) (Task 2).
3. 375px: the 2x2 grid with the longest label does not scroll horizontally or clip text (Task 2).
4. After removal there is no "Skin:" palette item, no Inter/Rubik request, and entrance animations still play on a direct load of `/` (Task 1).
5. The three-slot stats bar keeps its dividers at 1280px and 375px (Task 3).

## File Structure

| File | Responsibility |
|---|---|
| `src/data/results.ts` (create) | `ResultCard` type, `RESULTS`, pure `resolveResultLink` |
| `src/components/ui/ResultsStage.tsx` (create) | The stage: four cards, link line, events |
| Delete | `src/components/ui/SkinStage.tsx`, `src/hooks/useSkin.tsx`, `src/hooks/useSkinCycle.ts`, `src/data/skins.ts` |
| Modify | `Layout.tsx`, `CommandPalette.tsx`, `src/lib/paletteItems.ts`, `src/components/ui/index.ts`, `src/pages/HomePage.tsx`, `src/styles/global.css`, `index.html` (comment only) |

---

### Task 1: Retire the skin stage

**Files:** see File Structure (Delete and Modify rows).

**Interfaces:**
- Produces: a tree with no skin code. `buildPaletteItems(deps: { navigate; toggleTheme })` loses `selectSkin`; `Layout` renders no `SkinProvider`.

- [ ] **Step 1: Delete** the four files above and remove the `SkinStage` export from `src/components/ui/index.ts`.
- [ ] **Step 2: Palette.** In `paletteItems.ts` drop the `SKINS`/`SKIN_ORDER`/`SkinId` import, the `selectSkin` dep and the three "Skin: <name>" actions; in `CommandPalette.tsx` drop `useSkin`, `selectSkin` and its `useMemo` dependency.
- [ ] **Step 3: Layout.** Remove the `SkinProvider` import and wrapper in `Layout.tsx`; keep `MotionConfig`, grain, `CustomCursor`, `Nav`, `PageTransition`, `Footer` and the palette exactly as they are.
- [ ] **Step 4: Home and styles.** In `HomePage.tsx` remove the `SkinStage` import and the whole `<div data-track-section="skin_stage">…</div>` block (Task 2 re-adds a stage in that spot). In `global.css` remove the `/* ── Hero skin stage ── */` block and every other `.skin-*` rule, including those inside the reduced-motion and mobile media blocks. In `index.html` reword the preload comment's "shifts the skin stage" to "shifts the block under the hero"; leave the tags and URLs unchanged.
- [ ] **Step 5: Verify.** `npx tsc --noEmit -p tsconfig.json` exits 0. `grep -rIn -i "skin" src index.html` returns nothing except prose in `src/data/projects.ts`. In the browser: `/` loads with no console errors; ⌘K shows 9 items and none starts "Skin:"; no network request to `fonts.googleapis.com` mentions Inter or Rubik; reload `/` and confirm the hero intro paragraph starts below full opacity (entrance animations still play).
- [ ] **Step 6: Commit.** `refactor: retire the skin stage` (add the Co-Authored-By trailer `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; commit only the files above by path).

---

### Task 2: Results data and stage

**Files:** Create `src/data/results.ts`, `src/components/ui/ResultsStage.tsx`; modify `src/components/ui/index.ts`, `src/pages/HomePage.tsx`, `src/styles/global.css`.

**Interfaces:**
- Consumes: `getProjectBySlug` from `src/data/index.ts`; `StatCallout` (props `value`, `label`, `compact`, `countUp`); `trackEvent`; `CONTACT_EMAIL` from `src/lib/contact.ts`.
- Produces:
  ```ts
  export type ResultLink = { kind: "case-study"; slug: string } | { kind: "ask" };
  export type ResultCard = { id: "volume" | "revenue" | "funding" | "systems"; value: string; label: string; context: string; link: ResultLink };
  export const RESULTS: ResultCard[];
  export function resolveResultLink(link: ResultLink): { kind: "ask" } | { kind: "case-study"; slug: string; to: string };
  export function ResultsStage(): JSX.Element;
  ```

- [ ] **Step 1: Implement `src/data/results.ts`.** `RESULTS` holds the four cards in this order with the spec's proposed copy and all links `{ kind: "ask" }`: `volume` "£200m+" / "Transaction volume in a single year" / "on products I've designed"; `revenue` "£20m+" / "Revenue generated" / "by products I've designed"; `funding` "3+" / "Products that went on to raise VC funding" / "that I shipped"; `systems` "10+" / "Design systems" / "one for every project". `resolveResultLink` returns `{ kind: "case-study", slug, to: "/work/<slug>" }` only when `getProjectBySlug(slug)` exists and is not `previewOnly`; otherwise `{ kind: "ask" }`. No React or DOM imports.
- [ ] **Step 2: Verify the resolver.** In the browser console `const m = await import('/src/data/results.ts')`: `m.resolveResultLink({kind:"case-study",slug:"indigoemr"})` returns `{kind:"case-study",slug:"indigoemr",to:"/work/indigoemr"}`; `m.resolveResultLink({kind:"case-study",slug:"flavorqueste"})` and `m.resolveResultLink({kind:"case-study",slug:"nope"})` both return `{kind:"ask"}`; `m.RESULTS.length === 4`.
- [ ] **Step 3: Implement `ResultsStage`.** A labelled section (`aria-label="Results"`) of four cards: `StatCallout` with `compact` and `countUp` for value and label, a mono context line, then the link line. Case-study: a router `Link` "Read the case study →" firing `trackEvent("results_card_click", { card: id, destination: "case_study" })`. Ask: a plain `<a>` (not `PillLink`, which cannot set `from_path`; `NextProjectBlock.tsx` documents why) with `href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Ask about: ${value} ${label}`)}`}`, text "Not on the site: ask me", firing `results_card_click` with `destination: "ask"` and `contact_click` with `{ href, from_path: "results_stage", card: id }`. Styles in `global.css` as `.results-stage`: 4 columns, 2x2 at ≤700px, equal-height cards, hairline borders from existing tokens, a `min-height` so counting or font loading cannot shift layout.
- [ ] **Step 4: Place it.** Export from `ui/index.ts`; in `HomePage.tsx` render `<div data-track-section="results_stage"><FadeIn delay={0.65}><ResultsStage /></FadeIn></div>` where the skin block was (after the header, before the marquee).
- [ ] **Step 5: Verify.** `tsc` exits 0. At 1280px: four columns, values count to 200/20/3/10 with their prefixes and suffixes, then hold. At 375px: 2x2, `document.documentElement.scrollWidth === innerWidth`, no clipped text. The LCP element is not inside `.results-stage` (`new PerformanceObserver(l => console.log(l.getEntries().at(-1).element?.tagName)).observe({type:'largest-contentful-paint', buffered:true})`). With `posthog.capture` intercepted, clicking each "ask" link logs `results_card_click` then `contact_click` with the right `card`, and the first card's `href` decodes (`decodeURIComponent`) to `mailto:salamilayor@gmail.com?subject=Ask about: £200m+ Transaction volume in a single year`. Reduced motion (temporary uncommitted `matchMedia` override, reverted): final values immediately.
- [ ] **Step 6: Commit.** `feat: add hero results stage`

---

### Task 3: Stats bar to three slots

**Files:** Modify `src/pages/HomePage.tsx`, `src/styles/global.css`.

- [ ] **Step 1: Data.** Remove `{ value: "3", label: "Design systems built from scratch" }` from `HOME_STATS`, leaving 8+, 30+ and 200K+.
- [ ] **Step 2: CSS.** In the `.stats-bar` rules set `grid-template-columns: repeat(3, 1fr)`; at ≤700px use one column, with a bottom hairline between rows and no left border (replace the two-column `nth-child` rules).
- [ ] **Step 3: Verify.** `tsc` exits 0. At 1280px three columns with dividers between; at 375px one column, dividers between rows, no horizontal scroll; the three values still count up.
- [ ] **Step 4: Commit.** `feat: trim the stats bar to three slots`

---

### Task 4: Reword design-system copy (blocked until Layor approves the wording)

**Files:** Modify `src/pages/HomePage.tsx`.

- [ ] **Step 1: Get approval.** Do not start until Layor has approved exact wording. Proposed text:
  - Hero paragraph: "Based in the UK, I've spent 8+ years designing and shipping digital products across healthcare, banking, and logistics. I've built 10+ design systems, one for every project; three of them, IndigoEMR, FirstBank, and Sharply, now run across dozens of product surfaces."
  - Tools row (Figma): "Interface design, prototyping, and the component libraries behind 10+ design systems."
  Use only the wording Layor approves, verbatim.
- [ ] **Step 2: Apply** the approved text to the hero paragraph and the Tools row in `HomePage.tsx`; no other copy changes.
- [ ] **Step 3: Verify.** `tsc` exits 0; `grep -n "three design systems" src/pages/HomePage.tsx` returns nothing; the hero paragraph still wraps cleanly at 375px.
- [ ] **Step 4: Commit.** `copy: update design-system claims to 10+`

---

### Task 5: Speed check

**Files:** Create/replace `docs/superpowers/perf/after.json`, `docs/superpowers/perf/after-mobile.json`.

- [ ] **Step 1: Re-measure** exactly as before (procedure and flags are in `.superpowers/sdd/2026-11-08-portfolio-wow-moment/task-7-report.md` if present, else: `npm run build`, `npx vite preview --port 4173` in the background, `npx lighthouse http://localhost:4173/ --only-categories=performance --preset=desktop --output=json --quiet --chrome-flags="--headless"` three times, median LCP/TBT/CLS). Save `{ "lcpMs": n, "tbtMs": n, "cls": n }` to `after.json`. Run one mobile-preset run and save the same shape to `after-mobile.json` (informational). Stop the preview server.
- [ ] **Step 2: Compare.** Pass when `lcpMs <= 1319` and `cls <= 0.091`. If it fails, find the cause by evidence (LCP element, shift culprits) and fix only if it is clearly inside this plan's changes and small; otherwise stop and report with the raw numbers. Do not loosen the limits.
- [ ] **Step 3: Commit** `docs: record post-change LCP and CLS`. Do not push.
