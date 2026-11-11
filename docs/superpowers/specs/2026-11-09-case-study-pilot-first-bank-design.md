# Case-study pilot: First Bank

Date: 2026-11-09
Status: awaiting review
Base: branch `portfolio-sync-content` (PR 6, not yet merged)

## Intent

Make a case-study page readable in a one-to-two-minute skim and strong when read
in depth, starting with First Bank as the pilot. IndigoEMR and Sharply follow
with the same template after Layor reviews this one.

- **Readers:** UK hiring managers and recruiters (a full-time London or UK role),
  and potential clients looking for 0-to-1 help.
- **Success:** on a 1280x800 screen the first view shows the problem, Layor's
  role and the result without scrolling; every figure on the page comes from
  Layor's Master Achievement Bank; load speed does not regress.
- **Source of truth for claims:** the Master Achievement Bank (v6) and Master CV
  (v7) Google Docs (ids in the project memory). **Layor's instruction:** use
  everything, including items the bank marks OPEN or VERIFY. Those are worded the
  way the bank words them (hedged where the bank hedges) and listed in section 3
  so Layor can confirm each one before merge.

## What is wrong today

- The result line (added in PR 4) sits under a full-width hero image, so on a
  1280x800 screen it is about a screen down.
- The four First Bank workstreams are collapsed, and each card shows a hook, tags
  and one stat but not the problem or Layor's role in it, so a skimmer cannot tell
  what was solved or who did it.
- The client background is a long paragraph before any evidence.
- Digital account maintenance, confirmed shipped in the bank, is missing.

## Scope

- Template changes live in `ProjectDetailPage`, `WorkstreamAccordion` and the
  types, so they apply to all three case-study pages. Content (the figures row,
  workstream role and problem lines, the fifth card) is added for **First Bank
  only** now; IndigoEMR and Sharply keep their current content in the new order
  until their own pass.
- Out of scope: the other two pages' content, the CV download and Work-with-me
  page, and the section menu on workstream pages.

## 1. The opening

New order on every case-study page: back link, title, one mono line (role,
timeline, platform, status), the result line (`outcomeLine`), the figures row (only
when the project has one), the buttons, then the hero image, then the body. The
four-column role strip is replaced by the single mono line.

**Figures row.** `ProjectDetail` gains optional `glance?: Stat[]` (up to four).
Rendered as a row of figure plus label with the existing `StatCallout` look, no
count-up (the numbers are the first thing read, so they should not animate while
being read). Stacks to two columns under 700px.

First Bank values (the first two and the last are CONFIRMED in the bank; the 281
to 50,000+ line also carries the OPEN "across 9+ account types" from the CV):

| Figure | Label | Bank basis |
|---|---|---|
| 281 → 50,000+ | web and web-banking account openings across 9+ account types, 2023 to 2025 | "Website and web-banking account openings", figure kept as written at Layor's instruction |
| Under 1% → 7% | of all account openings were online, in the launch year | "Online account opening share (CONFIRMED)" |
| 10+ | workshops I facilitated, including a 100+ stakeholder co-design session | "CONFIRMED 27 October: Layor facilitated every one" |
| Sole designer | FirstDirect 2.0 corporate app, iOS and Android, phone and tablet | "CONFIRMED sole designer" |

**Role line.** `detail.role` for First Bank becomes "Senior Product Designer, design
contract" (the bank allows "Product Consultant" for the contract; the site uses the
level that matches the roles Layor is targeting).

**Result line.** Unchanged from PR 4 (First Bank wording already corrected there).

## 2. The body

- **Workstream cards.** `Workstream` gains optional `role?: string`. A collapsed
  card shows, in order: label, hook, a one-line `problem` (the existing field,
  clamped to two lines), the `role` line, the stat chip, tags, thumbnails. Existing
  expanded content is unchanged.

| Card | Problem line (existing `problem`, trimmed in data if needed) | `role` |
|---|---|---|
| Design foundation | Three vendor-built products, each with its own answer to basic interface questions | Self-directed, no brief: led visual direction |
| Account Opening SDK | Customers could not start on one channel and finish on another | Designed the SDK and facilitated 10+ workshops |
| FirstDirect 2.0 | A legacy corporate app, with web-only capabilities missing on mobile | Sole designer, phone and tablet |
| Diaspora banking | A reported 70% drop-off at identity verification among overseas applicants | Traced the cause and redesigned the journey |
| Account maintenance (new) | Customers had to visit a branch to update account details | Designed the self-service flow |

- **Fifth card, account maintenance.** Short, qualitative: stat value "Shipped",
  label "self-service account updates without a branch visit". No reduction figure
  (the bank records none). It has no showcase sections.
- **Client background.** `platformIntro.body` shrinks to a few sentences plus one
  line pointing at the workstreams: "First Bank has operated since 1894 and serves
  42M+ individual customers and 10M+ corporate accounts across nine countries. For
  most of them the branch, not the app, was still the real bank. I worked on it as
  a design contract alongside my IndigoEMR role. The work split into four
  independent products, plus one smaller shipped feature; open whichever is closest
  to what you're hiring for." (The institutional counts are context, not product
  usage, and are worded that way.)
- **Added from the OPEN items.**
  - **SDK card, expanded outcome:** a context sentence that USSD, a separate channel,
    was recalled at nearly 30% of openings and branch walk-ins were the largest
    channel, so the 7% online share is read against the right baseline. It is never
    added to or merged with another share.
  - **SDK card, source note:** "The 50,000+ figure was supplied by the bank's CTO."
  - **FirstDirect 2.0 card, outcome:** the 7% mobile adoption increase among
    corporate customers, attributed to the tablet solution reaching more user types
    (as Layor linked it on 27 October), not to the diaspora redesign where
    `experience.ts` currently puts it. The same fix is made on About/experience.
  - **FirstDirect 2.0 card:** the multi-user batch of up to 50 transactions stays as
    "up to 50 transactions reviewable in a single approval batch".
  - **Diaspora card:** the 70% drop-off stays "reported", with no after figure.

## 3. Rules for the copy, and what is included while unverified

- Every number comes from the bank. Use "designed", "led" and "facilitated" only as
  the bank allows; "contributed to" where results depended on others. Do not imply
  every corporate customer uses FirstDirect 2.0. No figure is invented, and where
  the bank has no detail (the names of the three products behind the design
  foundation, which tasks account maintenance supports, whether it used a separate
  SDK) the page says less, not more.
- Included at Layor's instruction although the bank marks them OPEN or VERIFY. Layor
  confirms each before merge or says how to reword it:

| Item | Bank status | Where it appears | Open question |
|---|---|---|---|
| 9+ account types | OPEN | figures row, SDK card | what exactly counts as a type |
| 50,000+ counts completed openings | OPEN | figures row, SDK card | completed or started |
| 50,000+ supplied by the CTO | context | SDK card source note | fine to name the role publicly (NDA) |
| 42M+ individual and 10M+ corporate accounts | OPEN | client background | source and date |
| USSD nearly 30%, branch largest | OPEN | SDK card outcome | period and denominator |
| 7% increase in mobile adoption | OPEN | FirstDirect card outcome | relative or points, which period, and that the tablet solution drove it |
| Up to 50 transactions per batch | OPEN | FirstDirect card | whether it is a per-batch limit |
| A reported 70% drop-off | OPEN | diaspora card | what it measured |

- Layor approves the exact strings in this spec before merge.

## Build order

Each step is its own commit on a branch off `portfolio-sync-content`:

1. New opening order and the mono role line on all case-study pages.
2. `glance` field, the figures row component, and the First Bank figures.
3. `Workstream.role`, the card changes, the five cards' role and problem copy, and
   the account-maintenance card.
4. Shorter client background.
5. Speed check.

## Budget

No new dependencies or assets. Re-measure desktop Lighthouse (three runs, median)
against `docs/superpowers/perf/after-work-tiers.json`: LCP within +150 ms of 1174
and CLS within +0.01. The figures row reserves its height so nothing shifts.

## Verification

No test runner exists and none is added. Checks:

- `npx tsc --noEmit -p tsconfig.json` exits 0.
- Browser at 1280x800: on `/work/first-bank-nigeria` the result line, the figures
  row and both buttons are fully inside the first viewport without scrolling.
- Browser at 375px: no horizontal scroll; the figures row is two columns.
- A page without `glance` (IndigoEMR, Sharply) shows no figures row and no gap.
- Collapsed cards show the role and problem lines; the expanded content, the
  sticky header and deep links (`#diaspora-banking`) still work; the new card
  expands and collapses.
- `contact_click` events (`case_study_top`, `case_study_end`) still fire once with
  analytics intercepted (the site's `.env.local` sends to the real project).
