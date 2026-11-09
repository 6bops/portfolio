# Work tiers, project pages and device mockups: design

Date: 2026-11-09
Status: awaiting review
Base: branch `portfolio-wow-moment` (PR 3, not yet merged)

## Intent

Make the Work section show everything Layor has built without every project
needing a full case study, and make each project read better at a glance.

- **Goals of the site (confirmed by Layor):** a full-time product design role in
  London / the UK, plus inbound contract and 0-to-1 build work.
- **Why:** a review of seven peer portfolios (Omar Hasiya, Samuel Shaibu, Wendy
  Enyinnaya, Agunwa, Oyin, Bami Ogunfemi, Aratoluwada) and hiring-manager
  articles found the same things working: honest tiers of work ("Real project" /
  "Exploration"), a compact list that covers every project, case studies with
  the result near the top, and well-framed previews. Not all of Layor's work is
  on the site and not every project will become a full case study, so the site
  needs a lighter tier that still looks intentional.
- **Success:** a visitor can tell in seconds which work is a deep case study and
  which is a lighter project; every listed project has a preview; the three
  case-study pages state problem, role and result before the detail; load speed
  does not regress.

## Out of scope

- The CV download, "open to work" label and a Work-with-me page. These are a
  sibling piece of work and wait on Layor's CV file and wording.
- The decision on the pinned home carousel (plain swipe row, or keep the pin and
  fix it). It is unresolved; the device frames below work with either.
- The write-ups index (`portfolio-writeups` branch spec). It can later attach to
  the project page built here, but is not part of this change.
- New case-study content, a CMS, new dependencies, and any generated imagery.

## 1. Tiers on the Work page

Three tiers, with a chip filter at the top (All / Case studies / Projects /
Explorations; Explorations is hidden while it has no entries).

| Tier | Meaning | Presentation |
|---|---|---|
| `case-study` | Full page on the site | Large card: framed preview, one-line result, tags |
| `project` | Real work, no full page | Card grid: framed preview, domain, company, platform, status |
| `exploration` | Self-initiated or concept | Same card as `project` with an "Exploration" badge |

Below the cards sits **Everything else**: a compact list for work that needs no
preview card. Each row is title, company, role, years, a one-line "I built…",
chips for domain or stack, and a link only when a live site exists. It is a
plain semantic list (no scripts), the way Bami Ogunfemi's Works page reads.

**Data.**
- `Project` gains `tier: "case-study" | "project" | "exploration"`. Migration:
  IndigoEMR, First Bank, Sharply are `case-study`; FlavorQueste, Kunda Kids and
  Propty are `project`. `previewOnly` is unchanged: it still means "no case-study
  page", so `project` cards show a preview and no link, as today.
- New `WorkEntry` in `src/data/workList.ts` for the compact list:
  `{ id; title; company; role; years; summary; tags: string[]; href?: string }`.
  It has no `detail` or `media`, so adding a line is one object.
- The list section renders only when `WORK_LIST` is non-empty.

**Labels are Layor's to set.** The tier of each project, and whether something is
real client work or an exploration, comes from Layor. Nothing is labelled by
guess.

**Events.** `work_filter` with `tier`; `work_entry_click` with `id` and
`destination` (`live_site` or `case_study`).

## 2. Project page

Applies to the three `case-study` pages.

- **Outcome line.** Two sentences under the title: the problem, Layor's role and
  the result, built only from numbers already in the project data (for First
  Bank, the 281 to 50,000+ website account openings and the 100,000+ users).
  Layor approves the exact wording before it ships.
- **Contact next to the story.** An "Email me about this project" button beside
  the existing buttons (reuses the pattern in `NextProjectBlock` and
  `src/lib/contact.ts`). Event: `contact_click` with `from_path: "case_study_top"`.
- **Honest external links.** Buttons that leave the site say where they go
  ("Open the Figma deck ↗", "Open the Notion write-up ↗") instead of "Read case
  study". First Bank's NDA request button keeps its meaning. Wording approved by
  Layor.
- **Section menu.** On pages with four or more in-page sections, a sticky menu
  (Overview, Why it mattered, the workstreams, Next) that highlights the active
  section and scrolls to it. Pages with fewer sections do not get one.
  Reduced motion uses instant scroll.
- **Screens strip.** Each project ends its screens with an "All screens" strip
  of framed previews, then the existing next-project block.

## 3. Device mockups

A `DeviceFrame` component wraps an image or video in a laptop, phone or tablet
frame on a tinted backdrop, drawn in CSS.

- `Media` gains an optional `frame?: "laptop" | "phone" | "tablet"`. Default is
  unframed, so nothing changes until a project opts in.
- Backdrop colour per project is a CSS custom property, set in the project data.
- Existing aspect-ratio handling (`naturalAspect`, `MediaFrame`) is reused so a
  framed item keeps the same layout box and causes no shift.
- No new image files. Richer composed scenes (as on some peer sites) are a design
  task in Figma and come in as ordinary images if Layor makes them.

## Input needed from Layor

- The list of projects to show, with company, role, years, a one-line summary,
  and for each whether it is a `project`, an `exploration` or a compact entry.
- Which existing screens to use for framed previews.
- Approval of the outcome lines and the external-button wording.

Without this input the change ships with the current six projects in their tiers
above, an empty compact list (hidden) and no exploration tier.

## Build order

Each step is its own commit on a branch off `portfolio-wow-moment`:

1. `tier` on `Project`, tier labels and chip filter on the Work page.
2. `WorkEntry` data and the compact list.
3. `DeviceFrame` and the `frame` field, applied to the existing previews.
4. Project page: outcome line, email button, relabelled external buttons.
5. Section menu on long pages.
6. Speed check.

## Budget

No new dependencies and no new heavy assets. Re-measure desktop Lighthouse
(three runs, median) against `docs/superpowers/perf/after.json`: LCP within
+150 ms of 1242 and CLS within +0.01. The Work page keeps reserving each card's
height so the filter does not shift the layout.

## Verification

No test runner exists and none is added. Checks:

- `npx tsc --noEmit -p tsconfig.json` exits 0; a `Project` without a `tier` fails
  to type-check.
- Browser at 1280px and 375px: filter chips work; an entry with no `href`
  renders no link; framed previews keep their aspect; no horizontal scroll.
- A `project`-tier card shows no link and no dead route; `/work/<slug>` for a
  `previewOnly` project still redirects to `/work`.
- Events arrive with analytics intercepted (the site's `.env.local` sends to the
  real analytics project).
- Section menu: the active item follows scroll, and keyboard focus can reach it.
