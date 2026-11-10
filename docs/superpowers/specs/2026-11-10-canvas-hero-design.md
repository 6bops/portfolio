# Canvas hero: design

Date: 2026-11-10
Status: awaiting review
Base: branch `portfolio-canvas-hero` (built on `portfolio-home-tweaks`, PR 8). This rebuilds the hero commit `a46bc8a` on that branch.

## Intent

Make the first screen of the home page memorable and a statement of craft: a
design tool in the browser, with Layor's intro and projects as objects on the
canvas.

- **Readers:** UK hiring managers and recruiters, and potential clients. They
  should read the name, role, "Open to work" line and reach the CV within the
  first screen, and be able to explore the work.
- **Layor's brief (his words, summarised):** the hero spans the whole width with
  no side padding; the nav sits on the hero as a small centered pill (like the
  Fixa reference from Mobbin); the name and description are movable objects the
  "Layor" cursor travels over; the hero has a sidebar and an inspector panel.
- **Desktop first.** Layor accepts trade-offs on mobile and will tweak them
  later. Phones get a simple stacked layout, not the full tool.
- **Success:** at 1280x800 the intro text and the CV button are fully inside the
  first screen; the canvas, layers and inspector all work with mouse and
  keyboard; no regression in load speed.

## Layout

The hero is the first screen: full width (`100vw`), starting at the very top,
height `clamp(640px, 100vh, 880px)`, under the nav pill. Three columns when the
screen is 1100px or wider:

| Region | Width | Content |
|---|---|---|
| Sidebar ("Layers") | 216px | the object list |
| Canvas | the rest (about 800px at 1280) | pan and zoom board |
| Inspector | 264px | details of the selected object |

- Between 861px and 1099px: canvas only (no panels); the intro and status are
  still canvas objects.
- At 860px and below (mobile trade-off): the intro and status sit above, as normal
  page content; the canvas below it is 380px tall, panel-free, and touch scrolls
  the page vertically.
- Panels are docked at the screen edges, blurred and translucent so the board
  reads as continuing behind them.

## Nav pill (site-wide)

The full-width bar becomes a small floating pill, centered, sticky at 12px from
the top, with a blurred translucent background and a hairline border: your name,
Home, Work, About, More, the command-palette hint and the theme toggle. On
phones it shows the name and the menu button; the panel opens as it does now.

- `--nav-h` stays 64px, so every sticky or pinned offset keeps working; only
  the visual changes. The old full-width background and bottom border go.
- On the home page the hero pulls up by `--nav-h` so the pill floats over it; on
  other pages content starts below the nav as now.

## Canvas model

Every item on the board is a **canvas object** with an id, a title, a position and
a size, in board units.

| Object | Kind | Contents |
|---|---|---|
| Intro | text | the name headline, role line and the paragraph (the content the hero card holds today) |
| Status | text | the "Open to work" line and the Download CV menu (`CvMenu`) |
| First Bank, IndigoEMR, Sharply | frame | thumbnail, opens its case study |
| Propty, Kunda Kids, Mumbuddie (three screens), Rabii | frame | thumbnail, no case study (Rabii shows "Preview coming soon") |

- **Selection:** click an object to select it (an accent outline, four corner
  handles and a name tag). Clicking empty board clears the selection. The Intro is
  selected when the page loads.
- **Moving:** drag an object to move it; drag empty board to pan. Interactive
  parts (buttons, links, the CV menu) work normally and do not start a drag. Moved
  positions are kept in memory only; a reload resets them. "Fit" returns to the
  opening view and does not reset positions.
- **Opening a project:** a frame's page opens from "Open project →" (on the
  canvas chip and in the inspector), or by pressing Enter on a focused frame. A
  single click on a frame only selects it.
- **Zoom:** Ctrl/Cmd + scroll or pinch zooms about the cursor (plain scroll still
  scrolls the page); buttons for zoom out, in and Fit; keyboard `+`, `-`, `0` and
  arrows when the canvas is focused.
- **Opening view:** scale about 0.85, with the Intro starting 24px inside the
  canvas's left edge and the Status object below it; the frames sit to the right,
  partly off-board, which invites exploring.

## The roaming "Layor" cursor

A cursor labelled "Layor" travels a closed path across the board in board
coordinates, passing over the Intro, a few frames and the Status object. When it
is over an object, that object shows its hover state (outline, handles, name tag),
so it reads as someone working in the file. It pauses and fades out while the
visitor's own pointer is over the canvas. With reduced motion it is hidden and
no hover is simulated.

## Sidebar: Layers

A list of every object, grouped "Text" and "Frames". Clicking a row selects the
object and pans the board to center it (instant under reduced motion). Hovering a
row shows the hover state on the board; the selected row is highlighted. It is a
list of buttons with `aria-pressed` for the selected one.

## Inspector

Shows the selected object, read-only except where noted:

- **All objects:** the title, and X, Y, width and height (updating live as the
  object is dragged).
- **Frames with a page:** Role, Year, Status and Platform from the project data,
  and an "Open project →" link.
- **Frames without a page:** the same details where the data has them, and a
  "Visit site ↗" link when the project has one.
- **Intro:** Role "Senior Product Designer", Based in "the UK", Experience "9+
  years".
- **Status:** "Open to work: full-time roles in the UK, and 0-to-1 contracts" and
  the CV versions (the same `CvMenu` list).

## Accessibility and robustness

Requirements carried over from the review of the first version, plus the new
panels:

- DOM and tab order: the Intro and Status objects (with the CV button) come first,
  then the layers list, then the canvas frames, then the inspector. Visual
  placement uses grid areas. The canvas region has a short label; the
  instructions are in `aria-describedby`.
- Enter on a focused frame always opens it, even after an earlier drag.
- Focusing a frame never scrolls or shifts the board (`overflow: clip` on the
  viewport); an off-screen frame is panned into view on focus.
- Pointer capture starts only once a drag passes the threshold (a Euclidean 6px),
  so clicks reach links in every browser; only the primary button drags;
  `lostpointercapture` and `pointercancel` clear pointer state.
- Touch: `touch-action: pan-y` by default, so one finger scrolls the page on any
  device; pinch zooms; sideways drag pans.
- The CV menu sits above the sticky bars: the stacking context holding it has a
  z-index above 920 and below the nav (960).
- Wheel zoom normalises `deltaMode` and uses a gentler factor; the roaming cursor
  animates `transform`, not `left/top`; frames below the first view use lazy
  images.
- Colours use theme tokens (no hard-coded near-black on the accent), and the shadow
  is softer in the light theme.
- Reduced motion: no entrance animation, no roaming cursor, instant pans.

## Analytics

`canvas_interact` once per page view (`kind`: pan, zoom, drag); `canvas_select`
`{ id, via: "canvas" | "layers" }`; `canvas_frame_open` `{ frame }`.

## Budget

No new dependencies. Thumbnails stay the 5 to 11 KB ones already added. Re-measure
desktop Lighthouse (three runs, median) against `docs/superpowers/perf/after-case-study-pilot.json`
(LCP 1217 ms, CLS 0): LCP within +150 ms and CLS within +0.01. The hero text is
the likely LCP element and must not wait on images.

## Build order

Each step is its own commit on `portfolio-canvas-hero`:

1. Nav pill, site-wide, with the home hero pulling up under it.
2. Canvas engine and object model: objects, selection, dragging, opening view,
   the robustness fixes above; the Intro and Status objects replace the text card.
3. Layers sidebar and inspector.
4. The roaming cursor and simulated hover.
5. Responsive trade-offs (no panels under 1100px, stacked under 861px).
6. Speed and first-view check.

## Verification

No test runner exists and none is added. Checks, at 1280x800 unless noted:

- `npx tsc --noEmit -p tsconfig.json` exits 0.
- The Intro text, Status line and CV button are fully inside the first screen;
  the hero spans edge to edge with no horizontal scroll; the pill floats over it.
- Click selects, drag moves (inspector X/Y change), empty-board drag pans, Ctrl
  wheel zooms about the cursor, Fit works, arrows/`+`/`-`/`0` work.
- Layers row click selects and centers; hovering a row shows the hover state.
- The roaming cursor passes over the Intro and shows its outline; it pauses when
  the real pointer is over the canvas; hidden under reduced motion.
- Enter on a focused frame opens it after a drag; Tab order is Intro, CV, layers,
  frames, inspector.
- The CV menu paints above the results stage and sticky bars, open up or down.
- 1000px: canvas only; 375px: stacked, touch scrolls the page.
- Events fire once with analytics intercepted (the site's `.env.local` sends to
  the real project).
