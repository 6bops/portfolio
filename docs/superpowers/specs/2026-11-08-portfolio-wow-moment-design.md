# Portfolio "wow moment" and extras: design

Date: 2026-11-08
Status: awaiting review
Base: branch `portfolio-expressive-redesign` (PR 2, not yet merged)

## Intent

Give layorsalami.com a memorable headline moment plus a small set of polish
features, without hurting load speed.

- **Audience:** mainly hiring managers and design leaders at product companies
  (open a case study, then email); also peers who might share it.
- **Evidence (PostHog, 30 days before the redesign, 635 visitors):** 94% of
  traffic is direct, 92% desktop. About 77% of home-page visitors leave from the
  home page. The home hero email button is the top converter (18 of 34 contact
  clicks). IndigoEMR and Sharply case studies produced zero contact clicks.
  Readers drop off most between 75% scroll and the end of First Bank and
  IndigoEMR. Home LCP is about 3.1s at p75 and Sharply is 4.2s.
- **Success:** more visitors open a case study and email; the wow moment does
  not worsen LCP; nothing reduces credibility for a systems-minded designer.

## Chosen direction

"One system, three skins" as the headline, plus four small extras. Rejected:
a cinematic scroll story (common, heaviest on video and JS) and a playable
product demo (most work, and a half-working demo hurts).

## 1. Hero skin stage

A stage panel under the existing animated hero headline shows one compact
product screen built from five components: summary/balance card, text input,
stepper, status chips, primary button. Three pills (IndigoEMR, FirstBank,
Sharply) each carry a one-line caption (for example "Healthcare · 200K+
patients").

- Selecting a pill re-skins the stage in about 400ms (colour, type family,
  corner radius, density) through CSS custom properties scoped to the stage.
- On load it cycles through the three skins once (about 6s). The cycle stops on
  the first hover or touch.
- With `prefers-reduced-motion`, swaps are instant and there is no autoplay.
- A three-line token readout under the stage shows the active skin's real
  values (for example radius, font, colours).
- Only the stage is re-skinned; the rest of the site keeps its own identity.
- No images or video. The stage must not be the LCP element.
- Components are re-creations of what the case studies show, not screenshots.

**Token sourcing.** Tokens come from the case-study content in
`src/data/projects.ts` and its images (FirstBank documents navy and gold, Inter,
and a 4px spacing base unit; its corner radius still has to be read from the
screenshots). If a skin's tokens cannot be read from that content, stop
and ask Layor for them before building the stage; do not invent values.

**Data shape.** A typed `Skin` interface (colours, font family, radius,
density, caption) with one entry per project in `src/data/skins.ts`. Typing
makes a skin missing any token a compile error.

**Events.** `skin_select` with `skin` and `source` (`click`, `autocycle` or `palette`).

## 2. End-of-case-study block

At the end of every case study page: a large "Next project" card (title, one
line, preview image) beside an "Email me about this project" button that
pre-fills the email subject with the project name.

- Events: `next_project_click` (with `from` and `to` slugs) and `contact_click`
  with `from_path: "case_study_end"`.
- Next project order follows the home featured order, wrapping around.

## 3. Page transitions

Route changes cross-fade in about 300ms and reset scroll to the top.

- Opacity only, so pinned carousels and sticky headers keep working.
- Skipped with reduced motion.
- A transition error must never block navigation.

## 4. Command palette (⌘K, desktop)

A dialog opened by ⌘K / Ctrl+K and by a small "⌘K" hint in the nav. It lists
pages, the three projects, "Email Layor", the theme toggle and the three skins.

- Plain component, no new dependency. Focus is trapped while open; Esc closes
  and returns focus to the previous element; it closes on route change.
- Typing filters the list; Enter selects.
- Events: `command_palette_open`, `command_palette_select` (with `item`).

## 5. Count-up stats

The four home stats (8+, 3, 30+, 200K+) count up once when scrolled into view,
using tabular numerals so layout does not shift. Reduced motion shows final
values immediately.

## Budget

- No new dependencies and no new heavy assets.
- Compare LCP before and after with a local Lighthouse run, then PostHog web
  vitals once deployed.
- Out of scope here: the Sharply page's 4.2s LCP (poster images and video
  compression), tracked as a separate item.

## Build order

Each step is its own commit on a new branch cut from
`portfolio-expressive-redesign`:

1. Skin data (`src/data/skins.ts`)
2. Skin stage and hero integration
3. End-of-case-study block
4. Count-up stats
5. Page transitions
6. Command palette
7. Speed check

Steps 3 to 6 are independent and can be reordered or dropped without affecting
steps 1 and 2.

## Verification

The repo has no test runner and none is added. Checks:

- Typecheck (`tsc --noEmit`); the `Skin` interface keeps all skins complete.
- Browser check at 1280px and 375px for each step, with reduced motion
  emulated.
- Palette driven by keyboard only: open, filter, select, Esc, focus returns.
- Each new PostHog event confirmed to arrive.
- Failure handling: the auto-cycle timer is cleaned up on unmount and on first
  interaction; the palette closes on route change; the transition never blocks
  navigation.
