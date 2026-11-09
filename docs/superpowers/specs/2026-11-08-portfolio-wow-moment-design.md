# Portfolio "wow moment" and extras: design

Date: 2026-11-08 (revised the same day, see Change log)
Status: awaiting review (revision 2)
Base: branch `portfolio-expressive-redesign` (PR 2, not yet merged)

## Change log

- Revision 2: the headline moment changed from a "one system, three skins"
  stage to a **results stage**. Reason: Layor's selling point is measurable
  results, not design-system craft, and Layor has far stronger results than the
  site shows (10+ design systems, products behind £20m+ revenue and £200m+
  transaction volume in a year, 3+ shipped products that went on to raise VC
  funding). Much of that work is not on the portfolio, so the stage cannot link
  every number to a case study. Sections 2 to 5 are unchanged in intent and
  already implemented; only the skin items in the palette change.

- Revision 3: after reviewing the live page, Layor asked for **one row** and
  no "ask me" links. The results stage is now five cards in a single row
  (£200m+, £20m+, 3+ funded, 30+ products shipped, 10+ design systems), and
  the separate home stats bar (8+ years, 30+ products, 200K+ patients) is gone:
  8+ years already sits in the hero. Cards have no links and no card events.
  Sections 1 below describe the original four-card version; this note wins.

## Intent

Give layorsalami.com a memorable headline moment plus a small set of polish
features, without hurting load speed.

- **Audience:** mainly hiring managers and design leaders at product companies
  (open a case study, then email); also peers who might share it.
- **Selling point (confirmed by Layor):** measurable results.
- **Evidence (PostHog, 30 days before the redesign, 635 visitors):** 94% of
  traffic is direct, 92% desktop. About 77% of home-page visitors leave from the
  home page. The home hero email button is the top converter (18 of 34 contact
  clicks). IndigoEMR and Sharply case studies produced zero contact clicks.
  The First Bank "case study request" link got 8 clicks from 89 visitors.
  Readers drop off most between 75% scroll and the end of First Bank and
  IndigoEMR.
- **Success:** more visitors open a case study or email; the wow moment does
  not worsen LCP or CLS; every claim on the page is one Layor will stand behind.

## Chosen direction

A results stage as the headline, plus four small extras. Rejected: "one system,
three skins" (proves design-system craft, not the selling point), a cinematic
scroll story (common, heaviest on video and JS) and a playable product demo
(most work, and a half-working demo hurts).

## 1. Hero results stage

A stage under the existing animated hero headline shows four proof cards:

| id | value | label (proposed copy) | context (proposed copy) |
|---|---|---|---|
| `volume` | £200m+ | Transaction volume in a single year | on products I've designed |
| `revenue` | £20m+ | Revenue generated | by products I've designed |
| `funding` | 3+ | Products that went on to raise VC funding | that I shipped |
| `systems` | 10+ | Design systems | one for every project |

The copy above is **proposed**; Layor approves or edits the final wording at
spec review, and nothing ships with unapproved wording.

- Values count up once when scrolled into view (reuse `StatCallout` with
  `countUp`; `parseStatValue("£200m+")` gives prefix "£", number 200, suffix
  "m+"). Reduced motion shows final values immediately.
- Each card has a link line under it:
  - If the numbers come from a project with a case study on the site, the card
    links to `/work/<slug>` ("Read the case study").
  - Otherwise it shows "Not on the site: ask me", which opens an email with the
    subject `Ask about: <value> <label>`.
- **Attribution default:** every card starts as "ask". A card links to a case
  study only if Layor confirms the number comes from that project. No company
  names appear unless Layor approves naming them.
- **Honesty rules:** each claim is worded as what Layor designed or shipped,
  never "I generated"; each number keeps its "+" floor; the page never implies
  sole credit.
- Layout: four columns on desktop, a 2x2 grid at 375px, no horizontal scroll.
- No images or video. The stage must not be the LCP element and must not add
  layout shift (fixed or min height).

**Data shape.** A typed `ResultCard` in `src/data/results.ts`:
`{ id; value; label; context; link: { kind: "case-study"; slug: string } | { kind: "ask" } }`.
A `case-study` link whose slug does not resolve through `getProjectBySlug`, or
points at a `previewOnly` project, renders as "ask" instead.

**Events.** `results_card_click` with `card` (the id) and `destination`
(`case_study` or `ask`). The "ask" destination also fires `contact_click` with
`from_path: "results_stage"` and the `card` id.

**Copy changes this forces** (final wording approved by Layor):

- The hero paragraph's "personally led visual direction on three design systems
  built from scratch, IndigoEMR, FirstBank, and Sharply" becomes a 10+ claim that
  still names the three covered here.
- The Tools row's "the component libraries behind three design systems" is
  reworded to match.
- The home stats bar drops its "3 design systems" slot, since "10+ design
  systems" now lives in the results stage. It keeps 8+ years, 30+ products
  shipped and 200K+ patients, and its grid adapts to three slots (one column
  under 640px).

## 2. End-of-case-study block (implemented)

At the end of every case study page: a large "Next project" card (title, one
line, preview image) beside an "Email me about this project" button that
pre-fills the email subject with the project name.

- Events: `next_project_click` (with `from` and `to` slugs) and `contact_click`
  with `from_path: "case_study_end"`.
- Next project order follows the home featured order, wrapping around.

## 3. Page transitions (implemented)

Route changes cross-fade in about 300ms and reset scroll to the top.

- Opacity only, so pinned carousels and sticky headers keep working.
- Skipped with reduced motion.
- A transition error must never block navigation.
- The wrapper must not disable the nested entrance animations on a direct load
  (see plan Task 5).

## 4. Command palette (⌘K, desktop) (implemented, skin items to remove)

A dialog opened by ⌘K / Ctrl+K and by a small "⌘K" hint in the nav. It lists
pages, the three projects, "Email Layor" and the theme toggle. The three skin
items are removed with the skin stage.

- Plain component, no new dependency. Focus is trapped while open; Esc closes
  and returns focus to the previous element; it closes on route change.
- Typing filters the list; Enter selects.
- Events: `command_palette_open`, `command_palette_select` (with `item`).

## 5. Count-up stats (implemented)

The home stats count up once when scrolled into view, using tabular numerals so
layout does not shift. Reduced motion shows final values immediately. The
results stage reuses this.

## Retired work

The skin stage is removed: `src/components/ui/SkinStage.tsx`,
`src/hooks/useSkin.tsx`, `src/hooks/useSkinCycle.ts`, `src/data/skins.ts`, the
`.skin-stage` CSS, the lazily appended Inter/Rubik font link, the `SkinProvider`
in `Layout`, the palette's skin items, the `skin_select` event and the
`skin_stage` track section (renamed `results_stage`). The index.html font
preloads for Syne and Source Serif 4 stay: the layout shift they fix is above
whatever block sits under the hero.

## Budget

- No new dependencies and no new heavy assets; removing the stage drops the
  Inter and Rubik requests.
- Re-measure with Lighthouse (desktop, three runs, median) against the baseline
  in `docs/superpowers/perf/baseline.json`: LCP within +150 ms and CLS within
  +0.01. One mobile run is recorded for information. After deployment, compare
  PostHog web vitals.
- Out of scope here: the Sharply page's LCP, and the hero paragraph's fade-in
  delay that drives mobile LCP (a design lever, not changed).

## Build order

Each step is its own commit on `portfolio-wow-moment`:

1. Retire the skin stage and everything listed under Retired work, with the
   remaining pages still building and typechecking.
2. Results data (`src/data/results.ts`) and the results stage in the hero.
3. Copy changes: hero paragraph, Tools row, stats bar to three slots.
4. Speed check against the baseline.

Steps 3 depends on Layor approving the final wording; steps 1 and 2 do not.

## Verification

The repo has no test runner and none is added. Checks:

- Typecheck (`tsc --noEmit`); `ResultCard` typing keeps every card complete.
- Browser check at 1280px and 375px with reduced motion emulated: counts,
  2x2 grid, no horizontal scroll, no layout shift.
- A card with an unresolvable slug renders as "ask"; a `previewOnly` slug too.
- "Ask" opens a mail link with the right subject; each event is confirmed to
  arrive (with analytics intercepted, then once against real analytics).
- Nothing in the palette, Layout or hero still references skins.
- Entrance animations still play on a direct load of `/`.
