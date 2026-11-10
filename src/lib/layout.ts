/**
 * Height of the pinned site menu, in px.
 *
 * MUST stay in sync with `--nav-h` on `:root` in src/styles/global.css. CSS uses the
 * variable (sticky offsets, pinned stage height, scroll-margin); JS uses this
 * constant where a number is needed (framer-motion scroll offsets, manual scrolling).
 */
export const NAV_HEIGHT = 64;
