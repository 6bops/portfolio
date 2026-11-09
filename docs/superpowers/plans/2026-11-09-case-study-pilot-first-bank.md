# Case-Study Pilot: First Bank Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the case-study pages result-first, and rebuild First Bank's content from the master achievement bank as the pilot.

**Architecture:** The page template in `ProjectDetailPage` gets a new opening order and a figures row (shared by all three case-study pages, content only where a project supplies it). First Bank's data gains figures, per-card role and problem lines, a fifth card and a shorter intro. IndigoEMR and Sharply keep their content.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, framer-motion, posthog-js via `trackEvent` in `src/lib/analytics.ts`.

**Spec:** `docs/superpowers/specs/2026-11-09-case-study-pilot-first-bank-design.md`

**Branch:** `portfolio-case-study-pilot` (already checked out, built on `portfolio-sync-content`). One commit per task. Do not push.

## Global Constraints

- No new dependencies, no new image or video files.
- Every string marked "exact" below is used verbatim. They are drafts Layor approves before merge; do not reword or add figures. No number is invented; where the bank has no detail, say less.
- Layor's instruction: items the bank marks OPEN or VERIFY are included, worded as given here. They are listed in the spec's section 3 table.
- `previewOnly` and the `/work/<slug>` redirect behave as before. `contact_click` events stay exactly: top button `from_path: "case_study_top"`, end block `from_path: "case_study_end"`, each firing once per click.
- Speed budget: desktop Lighthouse LCP within +150 ms of `docs/superpowers/perf/after-work-tiers.json` (1174, limit 1324) and CLS within +0.01.
- No test runner and none is added. Verification is `npx tsc --noEmit -p tsconfig.json` (exit 0) and browser checks at 1280x800 and 375px against the dev server (preview name `portfolio`, port 5173). The site's `.env.local` sends analytics to the real project: intercept `posthog.capture` (import `/src/lib/analytics.ts` in the page and patch `posthog.capture`) when checking events. After editing CSS, hard-reload the tab (the browser can serve a stale stylesheet).
- Commit trailer on every commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; add only the files a task lists, by path.

## Review Focus

1. At 1280x800 on `/work/first-bank-nigeria` the result line, the figures row and both top buttons are fully inside the first viewport without scrolling (Task 2, re-checked in Task 5).
2. A page with no `glance` (IndigoEMR, Sharply) shows no figures row, no empty gap and no layout change below the result line (Task 2).
3. The one-line role/timeline/platform/status text wraps cleanly at 375px with the longest values and causes no horizontal scroll (Task 1).
4. A long `cardProblem` or `role` does not break the card layout; expanding any workstream, the sticky header and the `#diaspora-banking` deep link still work (Task 3).
5. The new account-maintenance card expands and collapses without errors even though it has no showcase, highlights or images (Task 4).

## File Structure

| File | Responsibility |
|---|---|
| `src/pages/ProjectDetailPage.tsx` (modify) | New opening order, mono role line, mounts `GlanceRow` |
| `src/components/project/GlanceRow.tsx` (create) | The figures row |
| `src/components/project/WorkstreamAccordion.tsx` (modify) | Collapsed card shows problem and role lines |
| `src/types.ts` (modify) | `ProjectDetail.glance`, `Workstream.role`, `Workstream.cardProblem` |
| `src/data/projects.ts` (modify) | First Bank figures, card lines, outcome additions, fifth card, shorter intro |
| `src/data/experience.ts` (modify) | Move the 7% mobile adoption claim to the corporate app |
| `src/styles/global.css` (modify) | `.project-meta-line`, `.project-actions`, `.glance-*`, `.ws-card-problem`, `.ws-card-role` |
| `src/components/project/index.ts` (modify) | Export `GlanceRow` |

## Rulings

- The spec says the card's problem line is the existing `problem` field "trimmed in data if needed". `problem` is a long paragraph, so this plan adds a separate optional `cardProblem` string for the card and leaves `problem` untouched. Cost if wrong: remove one field.
- Task 1 changes the page opening for all three case-study pages (they share `ProjectDetailPage`); only First Bank gets new content now, as the spec says.

---

### Task 1: New opening order and the mono role line

**Files:** modify `src/pages/ProjectDetailPage.tsx`, `src/styles/global.css`.

**Interfaces:**
- Produces: the page renders, in order: back link, `<h1>` title, `.project-meta-line`, the `outcomeLine` paragraph, a slot for `GlanceRow` (Task 2 mounts it here, between the result line and the buttons), `.project-actions` (the existing buttons), the hero image, then the body unchanged.

- [ ] **Step 1: Reorder.** In `ProjectDetailPage`, move the title block (`<h1>` and the `outcomeLine` paragraph) above the metadata block and above the hero. Replace the four-column `.project-meta` strip with one line of text: `role · timeline · platform · status` (the four `d.*` values joined by " · ", mono 13px, `color.soft`), class `project-meta-line`, margin 0 0 24px, wrapping allowed. Keep the buttons (`ctaLink`, `websiteLink`, and the plain "Email me about this project" anchor with its `contact_click` `case_study_top` handler) exactly as they are, but in a `.project-actions` row (flex, wrap, gap 12px, margin-bottom 40px). The hero image keeps its 48px bottom margin and now follows the buttons.
- [ ] **Step 2: Spacing.** The `<h1>` keeps `clamp(32px, 5.5vw, 56px)`; its bottom margin becomes 16px; the `outcomeLine` paragraph keeps `maxWidth: 640px` with bottom margin 32px (so the figures row or buttons follow at a steady rhythm). Remove the now-unused `.project-meta`, `.project-meta-grid` and `.project-meta-actions` rules, including the 700px override, and add `.project-meta-line` and `.project-actions`.
- [ ] **Step 3: Verify.** `npx tsc --noEmit -p tsconfig.json` exits 0. On `/work/indigoemr`, `/work/first-bank-nigeria` and `/work/sharply-africa` at 1280x800 and 375px: the order is title, mono line, result line, buttons, hero; no horizontal scroll; the mono line wraps cleanly at 375px. With `posthog.capture` intercepted, clicking the top email button fires `contact_click` `case_study_top` once and the end block button still fires `case_study_end` once.
- [ ] **Step 4: Commit** `feat: lead case studies with the title, role line and result` (files above only).

---

### Task 2: The figures row

**Files:** create `src/components/project/GlanceRow.tsx`; modify `src/types.ts`, `src/components/project/index.ts`, `src/pages/ProjectDetailPage.tsx`, `src/data/projects.ts`, `src/styles/global.css`.

**Interfaces:**
- Produces: `ProjectDetail.glance?: Stat[]` (`Stat` is `{ value: string; label: string }`, already in `src/types.ts`); `GlanceRow(props: { stats?: Stat[] }): JSX.Element | null`, returning `null` when `stats` is absent or empty.

- [ ] **Step 1: Types and component.** Add `glance?: Stat[]` to `ProjectDetail` with a one-line doc comment. `GlanceRow` renders `<section className="glance-row" aria-label="Key figures">` containing one `<div className="glance-item">` per stat: the value (Syne 800, `clamp(20px, 2.4vw, 28px)`, `font-variant-numeric: tabular-nums`, allowed to wrap, `overflow-wrap: anywhere`) and the label (mono, 12px, `color.soft`, line-height 1.5). No count-up and no animation. CSS: `.glance-row` is a grid with `repeat(auto-fit, minmax(200px, 1fr))`, hairline borders top and bottom, margin-bottom 32px; items have a hairline left border (none on the first) and 16px padding; two columns at 700px and below. It reserves no extra height beyond its content.
- [ ] **Step 2: Mount.** Render `<GlanceRow stats={d.glance} />` in `ProjectDetailPage` between the result line and `.project-actions`. Export from `components/project/index.ts`.
- [ ] **Step 3: First Bank data.** In `src/data/projects.ts` set the First Bank `detail.role` to "Senior Product Designer, design contract" and add `glance` with these exact four items, in order:
  - `{ value: "281 → 50,000+", label: "Web and web-banking account openings across 9+ account types, 2023 to 2025" }`
  - `{ value: "Under 1% → 7%", label: "Of all account openings were online, in the launch year" }`
  - `{ value: "10+", label: "Workshops I facilitated, including a 100+ stakeholder co-design session" }`
  - `{ value: "Sole designer", label: "FirstDirect 2.0 corporate banking app, iOS and Android, phone and tablet" }`
- [ ] **Step 4: Verify.** `tsc` exits 0. At 1280x800 on `/work/first-bank-nigeria`, measure with `getBoundingClientRect`: the result line, the figures row and both top buttons all have `bottom <= 800` with no scrolling. No value or label overflows its item at 1280px or 375px (two columns at 375px). `/work/indigoemr` and `/work/sharply-africa` show no figures row and the result line is followed directly by the buttons with the normal gap.
- [ ] **Step 5: Commit** `feat: add a figures row to case studies and fill it for First Bank`.

---

### Task 3: Workstream card lines and the First Bank copy

**Files:** modify `src/types.ts`, `src/components/project/WorkstreamAccordion.tsx`, `src/data/projects.ts`, `src/data/experience.ts`, `src/styles/global.css`.

**Interfaces:**
- Produces: `Workstream.role?: string` and `Workstream.cardProblem?: string`. The collapsed card (`CollapsedCard`) renders, between the hook and the tags: `cardProblem` as `<p className="ws-card-problem">` (clamped to 2 lines) and `role` as `<p className="ws-card-role">` (mono 12px, `color.soft`), each only when present.

- [ ] **Step 1: Types and card.** Add the two optional fields to `Workstream` with one-line doc comments. Render them in `CollapsedCard` as described. Style `.ws-card-problem` (serif 15px, `color.muted`, `-webkit-line-clamp: 2`) and `.ws-card-role` in `global.css`, matching the neighbouring `.ws-card-*` spacing.
- [ ] **Step 2: Card data.** In the First Bank workstreams set (exact strings):
  - `design-system`: `role: "Self-directed, no brief: I led visual direction"`; `cardProblem: "Three vendor-built products, each with its own answer to basic interface questions"`
  - `account-opening-sdk`: `role: "I designed the SDK and facilitated 10+ workshops"`; `cardProblem: "Customers could not start on one channel and finish on another, so almost nobody opened an account online"`
  - `approval-workflows`: `role: "Sole designer, phone and tablet"`; `cardProblem: "A legacy corporate banking app, with web-only capabilities missing on mobile"`
  - `diaspora-banking`: `role: "I traced the cause and redesigned the journey"`; `cardProblem: "A reported 70% drop-off at identity verification among overseas applicants"`
- [ ] **Step 3: Outcome additions (OPEN items, per Layor).** Append to the `outcome` string (rendered by `WorkstreamShowcase`), keeping the existing text:
  - `account-opening-sdk`: " Context: USSD, a separate channel, was recalled at nearly 30% of openings and branch walk-ins were the largest channel, so the online share is read against that baseline. The 50,000+ figure was supplied by the bank's CTO."
  - `approval-workflows`: " Mobile adoption among corporate customers rose 7% as the tablet solution reached more types of user."
- [ ] **Step 4: Fix the 7% on About.** In `src/data/experience.ts` (First Bank entry) remove "driving a 7% increase in mobile adoption" from the diaspora sentence and attach it to the corporate-app sentence instead: after "built for the bank's corporate customers" add ", with mobile adoption among corporate customers up 7% as the tablet solution reached more types of user". Keep the rest of the entry unchanged.
- [ ] **Step 5: Verify.** `tsc` exits 0. On `/work/first-bank-nigeria`: each of the four cards shows the problem line (two lines at most) and the role line; the grid is not broken at 1280px or 375px; expanding each workstream shows the appended outcome sentences where specified; the sticky header, "Collapse" and the `#diaspora-banking` deep link still work. On `/about`, the First Bank entry attributes the 7% to the corporate app and the diaspora sentence has no 7%.
- [ ] **Step 6: Commit** `feat: show problem and role on First Bank workstream cards`.

---

### Task 4: The account-maintenance card and the shorter intro

**Files:** modify `src/data/projects.ts` only.

- [ ] **Step 1: Fifth workstream.** Append to the First Bank `workstreams` array, after `diaspora-banking`, a workstream with exactly: `id: "account-maintenance"`, `navLabel: "Account Maintenance"`, `heading: "Letting customers update their account without a branch visit"`, `problem: "Customers who needed to update their account details had to visit a branch and queue."`, `scope: "I designed digital account maintenance as self-service through the bank's website and digital channels, so customers update supported account details themselves."`, `stat: { value: "Shipped", label: "Self-service account updates, no branch visit" }`, `outcome: "Shipped and promoted through banners and marketing."`, `tags: ["self-service", "account servicing", "shipped"]`, `role: "I designed the self-service flow"`, `cardProblem: "Customers had to visit a branch and queue to update account details"`, and `images: []`. No showcase and no highlights. Do not add any reduction figure.
- [ ] **Step 2: Shorter intro.** Set First Bank `detail.platformIntro.body` to exactly: "First Bank has operated since 1894 and serves 42M+ individual customers and 10M+ corporate accounts across nine countries. For most of them the branch, not the app, was still the real bank. I worked on it as a design contract alongside my IndigoEMR role. The work split into four independent products, plus one smaller shipped feature; open whichever is closest to what you're hiring for." Leave the heading and stat unchanged.
- [ ] **Step 3: Verify.** `tsc` exits 0. The new card appears last, collapsed, with its role and problem lines and no thumbnails; clicking it opens a body with the heading, problem, "What I designed", stat and outcome and no errors in the console; collapsing returns to the card; the sticky header works for it. If the non-showcase expanded view needs `images` to be non-empty or throws, make the smallest change that fixes it in `ProjectDetailPage` or `ImageGroup` and report it.
- [ ] **Step 4: Commit** `feat: add the account-maintenance card and shorten the First Bank intro`.

---

### Task 5: Speed and first-view check

**Files:** create `docs/superpowers/perf/after-case-study-pilot.json`.

- [ ] **Step 1: First view.** In the dev server at 1280x800, on `/work/first-bank-nigeria`, confirm with `getBoundingClientRect` that the result line, figures row and both buttons end at or above y = 800 without scrolling, and take a screenshot to include in the report.
- [ ] **Step 2: Measure.** `npm run build`; `npx vite preview --port 4173` in the background; `npx lighthouse http://localhost:4173/ --only-categories=performance --preset=desktop --output=json --output-path=<scratch file outside the repo> --quiet --chrome-flags="--headless"` three times and take median LCP, TBT and CLS for the home page; save `{ "lcpMs": n, "tbtMs": n, "cls": n }`. Run the same once against `/work/first-bank-nigeria` and `/work/indigoemr` for information. Stop the preview server and leave no process running.
- [ ] **Step 3: Compare.** Pass when home `lcpMs <= 1324` and `cls <= 0.01`. On failure find the cause by evidence and fix only if clearly inside this plan's changes and small; otherwise stop and report the numbers. Do not loosen the limits.
- [ ] **Step 4: Commit** `docs: record case-study pilot LCP and CLS` (the JSON file only; put the case-study page numbers in the commit body). Do not push.
