# Work Tiers, Project Pages and Device Mockups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show every project in a tiered Work page, give the three case-study pages a result-first opening, and frame previews in device mockups.

**Architecture:** `Project` gains a `tier`; a filter and two card types render the tiers, and a data-only `WORK_LIST` feeds a compact "Everything else" list. A CSS-only `DeviceFrame` wraps media inside its existing layout box, so nothing shifts. The project page gains an outcome line, an email button and, for single-narrative pages, a sticky section menu.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, framer-motion, posthog-js via `trackEvent` in `src/lib/analytics.ts`.

**Spec:** `docs/superpowers/specs/2026-11-09-work-tiers-design.md`

**Branch:** `portfolio-work-tiers` (already checked out, built on `portfolio-wow-moment`). One commit per task. Do not push.

## Global Constraints

- No new dependencies, no new image or video files, no generated imagery.
- Copy that Layor must approve before the branch merges: the three outcome lines and the two relabelled buttons in Task 5. The strings in this plan are drafts and every one is built only from numbers already in `src/data/projects.ts`. Do not invent figures.
- Tier labels, `domain` and `company` values and the device-frame opt-ins are Layor-editable data. Use the values given here and do not add others.
- `previewOnly` keeps its meaning: no case-study page, no link, and `/work/<slug>` redirects to `/work`.
- A `Project` without a `tier` must fail `tsc`.
- Events exactly: `work_filter` `{ tier }` (`all`, `case-study`, `project` or `exploration`); `work_entry_click` `{ id, destination }` with destination `live_site` or `case_study`; `contact_click` `{ href, from_path: "case_study_top" }`.
- The site's `.env.local` sends analytics to the real project: when checking events, intercept `posthog.capture`.
- Speed budget: desktop Lighthouse LCP within +150 ms of `docs/superpowers/perf/after.json` (limit 1392 ms) and CLS within +0.01.
- There is no test runner and none is added. Verification is `npx tsc --noEmit -p tsconfig.json` (exit 0) and browser checks at 1280px and 375px against the dev server (preview name `portfolio`, port 5173).
- Commit trailer on every commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; add only the files a task lists, by path.

## Review Focus

1. A tier with no projects shows no chip (Explorations today); picking a tier shows only its cards and "All" restores everything (Task 1).
2. A `WorkEntry` without `href` renders no anchor; an empty `WORK_LIST` renders no "Everything else" heading (Task 3).
3. A framed item keeps exactly the layout box it had unframed, and framed screens are not cropped (Task 4).
4. A `project`-tier card never links, and `/work/kunda-kids` still redirects to `/work` (Task 2).
5. The section menu does not render with fewer than four sections, does not cover content on a phone, and follows scroll (Task 6).

## File Structure

| File | Responsibility |
|---|---|
| `src/types.ts` (modify) | `ProjectTier`, `Project.tier/domain/company/tint`, `Media.frame`, `ProjectDetail.outcomeLine`, `WorkEntry` |
| `src/data/projects.ts` (modify) | Tier, domain, company, tint, frame opt-ins, outcome lines, relabelled `cta` |
| `src/data/workList.ts` (create) | `WORK_LIST: WorkEntry[]`, shipped empty |
| `src/components/project/WorkFilter.tsx` (create) | Chip filter |
| `src/components/project/WorkCard.tsx` (create) | Card for `project` and `exploration` tiers |
| `src/components/project/WorkList.tsx` (create) | Compact "Everything else" list |
| `src/components/project/SectionNav.tsx` (create) | Sticky in-page menu |
| `src/components/ui/DeviceFrame.tsx` (create) | CSS device frame |
| `src/components/ui/MediaFrame.tsx` (modify) | Wraps media in `DeviceFrame` when `item.frame` is set |
| `src/pages/WorkPage.tsx`, `src/pages/ProjectDetailPage.tsx` (modify) | Compose the above |
| `src/lib/contact.ts` (modify) | `caseStudyMailto(title)` shared helper |
| `src/components/project/NextProjectBlock.tsx` (modify) | Use `caseStudyMailto` |
| `src/styles/global.css` (modify) | `.work-*`, `.device*`, `.section-nav*` rules |

## Rulings

- The spec's section menu is for single-narrative pages only (Sharply today). First Bank and IndigoEMR already have the accordion's sticky header, which orients the reader across workstreams, so adding a second menu there would duplicate it. Cost if wrong: a follow-up task extends `SectionNav` to workstream pages.
- Case-study cards keep the existing `ProjectCard` (description already carries the results and the carousel shows the previews); they gain framing through `MediaFrame`. Only `project` and `exploration` get the new `WorkCard`.

---

### Task 1: Tier data and Work page filter

**Files:** modify `src/types.ts`, `src/data/projects.ts`, `src/pages/WorkPage.tsx`, `src/components/project/index.ts`, `src/styles/global.css`; create `src/components/project/WorkFilter.tsx`.

**Interfaces:**
- Produces: `type ProjectTier = "case-study" | "project" | "exploration"`; `Project` gains required `tier: ProjectTier` and optional `domain?: string`, `company?: string`; `WorkFilter(props: { options: { id: "all" | ProjectTier; label: string; count: number }[]; value: "all" | ProjectTier; onChange: (id: "all" | ProjectTier) => void })`.

- [ ] **Step 1: Types and data.** Add the type and fields in `src/types.ts`. In `projects.ts` set `tier` and these values: IndigoEMR `case-study`, domain "Healthtech", company "IndigoEMR"; First Bank `case-study`, "Banking", "First Bank"; Sharply `case-study`, "Logistics", "Sharply"; FlavorQueste `project`, "Restaurant discovery", "FlavorQueste"; Kunda Kids `project`, "Edtech", "Kunda Kids"; Propty `project`, "Proptech", "Propty". Run `npx tsc --noEmit -p tsconfig.json` and confirm it fails until every project has a `tier`, then passes.
- [ ] **Step 2: `WorkFilter`.** A `role="group"` with `aria-label="Filter work"` and one `<button type="button" aria-pressed>` per option, styled as chips (`.work-filter`, `.work-filter-chip`, `.work-filter-chip[aria-pressed="true"]`) with a visible `:focus-visible` outline. Export it from `components/project/index.ts`.
- [ ] **Step 3: `WorkPage`.** Local state `tier: "all" | ProjectTier`. Options: All plus Case studies, Projects, Explorations, with counts from `PROJECTS`; omit any non-All option whose count is 0. Selecting calls `trackEvent("work_filter", { tier })`. Render projects grouped in the order case-study, project, exploration, each group under a small mono heading when `tier === "all"`; when a tier is selected render only that group. For now render every project with the existing `ProjectCard` (Task 2 replaces the non-case-study ones). Update the page intro to: "Three case studies in depth, plus the other work I've shipped."
- [ ] **Step 4: Verify.** Browser at 1280px and 375px: no Explorations chip; "Case studies" shows 3 cards, "Projects" shows 3, "All" shows 6 with group headings; chips do not overflow at 375px; `posthog.capture` intercepted shows `work_filter`.
- [ ] **Step 5: Commit** `feat: tier projects and filter the work page` (files above plus none else).

---

### Task 2: Cards for project and exploration tiers

**Files:** create `src/components/project/WorkCard.tsx`; modify `src/pages/WorkPage.tsx`, `src/components/project/index.ts`, `src/styles/global.css`.

**Interfaces:**
- Consumes: `Project` with `tier`, `domain`, `company` (Task 1).
- Produces: `WorkCard(props: { project: Project; index: number })`.

- [ ] **Step 1: `WorkCard`.** Preview: `project.heroMedia` if present, else the first item of `project.media`, rendered with `MediaFrame` inside a box with a fixed `aspect-ratio: 4 / 3` and the same border and radius as `.media-scroll-item`; if neither exists render `ImagePlaceholder`. Below it: title, a mono meta line `domain · company`, a second mono line `detail.platform · detail.status · year`, and for `tier === "exploration"` an "Exploration" badge. Link only when `!project.previewOnly`: wrap the card in a router `Link` to `/work/<slug>` and fire `trackEvent("work_entry_click", { id: project.slug, destination: "case_study" })`. A card without a link has no `Link`, no pointer cursor and no hover lift.
- [ ] **Step 2: Grid.** `.work-grid`: 2 columns at 701px and wider, 1 column below, 24px gap. In `WorkPage` render `case-study` projects with `ProjectCard` and the other tiers with `WorkCard` inside `.work-grid`.
- [ ] **Step 3: Verify.** Kunda Kids, Propty and FlavorQueste render as cards with no link; clicking one does nothing and `/work/kunda-kids` redirects to `/work`; no layout shift as previews load (the 4:3 box is reserved); 375px shows one column with no horizontal scroll.
- [ ] **Step 4: Commit** `feat: add cards for project and exploration work`.

---

### Task 3: Compact "Everything else" list

**Files:** create `src/data/workList.ts`, `src/components/project/WorkList.tsx`; modify `src/types.ts`, `src/data/index.ts`, `src/pages/WorkPage.tsx`, `src/components/project/index.ts`, `src/styles/global.css`.

**Interfaces:**
- Produces: `type WorkEntry = { id: string; title: string; company: string; role: string; years: string; summary: string; tags: string[]; href?: string }`; `export const WORK_LIST: WorkEntry[] = []`; `WorkList(props: { entries: WorkEntry[] })`.

- [ ] **Step 1: Data.** Add `WorkEntry` to `types.ts`, create `workList.ts` exporting an empty typed array with a one-line comment that Layor supplies the entries, and re-export `WORK_LIST` from `src/data/index.ts`.
- [ ] **Step 2: `WorkList`.** Returns `null` for an empty array. Otherwise a `<section aria-labelledby>` with a mono heading "Everything else" and a `<ul>`; each `<li>` shows title, `company · role · years`, `summary`, and tag chips. The title is an `<a href target="_blank" rel="noopener noreferrer">` only when `href` is set and fires `trackEvent("work_entry_click", { id, destination: "live_site" })`; otherwise it is plain text.
- [ ] **Step 3: `WorkPage`.** Render `<WorkList entries={WORK_LIST} />` below the cards, only when `tier === "all"`.
- [ ] **Step 4: Verify.** With the shipped empty list the page shows no "Everything else" heading. Temporarily add two entries (one with `href`, one without), confirm the first renders an anchor and the second does not, no horizontal scroll at 375px; then remove the two entries.
- [ ] **Step 5: Commit** `feat: add the compact everything-else list`.

---

### Task 4: Device mockups

**Files:** create `src/components/ui/DeviceFrame.tsx`; modify `src/types.ts`, `src/components/ui/MediaFrame.tsx`, `src/components/ui/index.ts`, `src/data/projects.ts`, `src/components/project/ProjectCard.tsx`, `src/components/project/WorkCard.tsx`, `src/pages/ProjectDetailPage.tsx`, `src/styles/global.css`.

**Interfaces:**
- Produces: `Media` gains `frame?: "laptop" | "phone" | "tablet"`; `Project` gains `tint?: string`; `DeviceFrame(props: { variant: "laptop" | "phone" | "tablet"; children: ReactNode })`; a helper `tintStyle(project: Project): CSSProperties` returning `{ "--device-tint": project.tint ?? "var(--color-hairline)" } as CSSProperties` (the cast is needed because custom properties are not in the type).

- [ ] **Step 1: `DeviceFrame`.** Renders `div.device.device--<variant>` containing `div.device-screen` for `children`. CSS only: the frame is drawn **inside** the box it is given, so the outer layout box is unchanged. The backdrop is `var(--device-tint)`; the screen is inset by a fixed percentage with rounded corners and a 2px dark bezel; laptop adds a thin base lip along the bottom, phone has larger radius, tablet a medium radius. Decorative only: no extra text, no `alt`.
- [ ] **Step 2: `MediaFrame`.** When `item.frame` is set, render the existing `MediaItem` inside `DeviceFrame` with `objectFit: "contain"` so no UI is cropped; the outer element keeps its current `aspect-ratio` and class. Unframed items render exactly as before.
- [ ] **Step 3: Data.** Add `tint` and opt-ins (flagged for Layor's visual review): IndigoEMR tint `#2a2350`, `indigo-web-preview-2.mp4` laptop; First Bank tint `#10243f`, `firstbank-web-preview.mp4` laptop, `firstbank-mobile-preview.mp4` phone, `fb-tab-view.mp4` tablet; Sharply tint `#1f2a24`, `sharply-web-preview.mp4` laptop, `sharply-rider-mobile.mp4` phone. All other media stay unframed.
- [ ] **Step 4: Apply the tint.** Spread `tintStyle(project)` into the style of the `ProjectCard` wrapper, the `WorkCard` wrapper and the element wrapping the media carousel in `ProjectDetailPage`.
- [ ] **Step 5: Verify.** Home, Work and each case study: framed items occupy the same box as before (compare `getBoundingClientRect` heights with the frame disabled via the data), screens are not cropped, videos still autoplay, no console errors, 375px has no horizontal scroll.
- [ ] **Step 6: Commit** `feat: frame project previews in device mockups`.

---

### Task 5: Project page opening

**Files:** modify `src/types.ts`, `src/data/projects.ts`, `src/lib/contact.ts`, `src/components/project/NextProjectBlock.tsx`, `src/pages/ProjectDetailPage.tsx`, `src/styles/global.css`.

**Interfaces:**
- Produces: `ProjectDetail.outcomeLine?: string`; `caseStudyMailto(title: string): string` returning `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${title} case study`)}`.

- [ ] **Step 1: Mail helper.** Add `caseStudyMailto` to `contact.ts` and make `NextProjectBlock` use it (same subject as today).
- [ ] **Step 2: Outcome lines** (drafts for Layor's approval; set `detail.outcomeLine`):
  - First Bank: "Only 281 of the bank's 1.13 million new accounts were opened on its website. I led the redesign and built a reusable account-opening system that took website openings to 50,000+, and was sole designer on a corporate banking app used by 100,000+."
  - IndigoEMR: "Every hospital got a custom-built record system. I led the move to a multi-tenant SaaS platform, built its design system from scratch, and shipped a patient app now used by 20,000+ active patients."
  - Sharply: "Riders, businesses and delivery partners used three products with no shared foundation. As founder I led design and built one component library for low-bandwidth cities, and the platform sustains a 96% on-time, in-full delivery rate."
- [ ] **Step 3: Buttons.** Set `cta` for IndigoEMR to "Open the Figma deck" and for Sharply to "Open the Notion write-up" (First Bank unchanged). In the metadata strip's `.project-meta-actions` add, after the existing buttons, a plain anchor `className="pill-link pill-link--solid"` with `href={caseStudyMailto(project.title)}`, text "Email me about this project", and `onClick` firing `trackEvent("contact_click", { href, from_path: "case_study_top" })` (plain anchor, as in `NextProjectBlock`, because `PillLink` forces a new tab on `mailto`).
- [ ] **Step 4: Render the outcome line.** In `ProjectDetailPage`, directly under the `<h1>` render `d.outcomeLine` when present in the serif body style, max width 640px, replacing the 48px bottom margin of the heading with 24px and giving the line a 48px bottom margin so the page rhythm is unchanged.
- [ ] **Step 5: "All screens" label.** In `ProjectDetailPage`, put a mono section label "All screens" (the `sectionLabel` style) above the existing end-of-page `<MediaCarousel>`; that carousel is the spec's screens strip, now framed by Task 4.
- [ ] **Step 6: Verify.** All three pages show the line under the title and the "All screens" label above the media; the email button opens a mail link with the subject "<Title> case study"; `contact_click` with `from_path: "case_study_top"` arrives; the existing end-of-page block still works; `tsc` exits 0.
- [ ] **Step 7: Commit** `feat: lead case studies with an outcome line and email button`.

---

### Task 6: Section menu for single-narrative pages

**Files:** create `src/components/project/SectionNav.tsx`; modify `src/pages/ProjectDetailPage.tsx`, `src/components/project/index.ts`, `src/styles/global.css`.

**Interfaces:**
- Produces: `SectionNav(props: { items: { id: string; label: string }[] })`, returning `null` when `items.length < 4`.

- [ ] **Step 1: Component.** A `<nav aria-label="On this page">` with one anchor chip per item, `position: sticky; top: 0` on a solid background, horizontally scrollable on narrow screens with no wrapping. An `IntersectionObserver` with `rootMargin: "-30% 0px -60% 0px"` sets the active item (`aria-current="true"`). Clicking calls `scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })` on the target and does not change the URL hash. Sections carry `scroll-margin-top` so the sticky bar does not cover headings.
- [ ] **Step 2: Wire into `SingleNarrative`.** Add ids `problem`, `constraint`, `decisions`, `honest` (only when `d.honest`), `outcome` to the matching blocks and render `<SectionNav>` above the problem block with labels "The problem", "Constraint", "Key decisions", "What didn't work", "Outcome" for the sections that exist. Workstream pages and the `showcase` path are untouched.
- [ ] **Step 3: Verify.** Sharply shows the menu; First Bank and IndigoEMR do not; the active chip follows scrolling; at 375px it scrolls sideways and covers no heading; with reduced motion emulated the jump is instant; keyboard Tab reaches every chip.
- [ ] **Step 4: Commit** `feat: add a section menu to single-narrative case studies`.

---

### Task 7: Speed check

**Files:** create `docs/superpowers/perf/after-work-tiers.json`.

- [ ] **Step 1: Measure.** `npm run build`; `npx vite preview --port 4173` in the background; `npx lighthouse http://localhost:4173/ --only-categories=performance --preset=desktop --output=json --quiet --chrome-flags="--headless"` three times; take the median LCP, TBT and CLS. Save `{ "lcpMs": n, "tbtMs": n, "cls": n }`. Run the same once against `/work` and once against `/work/sharply-africa` for information and note the results in the commit body. Stop the preview server.
- [ ] **Step 2: Compare.** Pass when the home `lcpMs <= 1392` and `cls <= 0.01`. On failure find the cause by evidence (LCP element, shift culprits); fix only if it is clearly inside this plan's changes and small, otherwise stop and report the raw numbers. Do not loosen the limits.
- [ ] **Step 3: Commit** `docs: record work-tiers LCP and CLS`. Do not push.
