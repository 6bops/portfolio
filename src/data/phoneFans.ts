import type { PhoneFanMedia } from "../types";

/**
 * Three app screens fanned out as phone mockups (left, centre, right), shared by the home canvas and
 * the project cards. `tint` is the app's brand hue; the backdrop mixes it with the theme's surface, so
 * it stays soft in both themes. `smSrc` is a 240px-wide copy for the small canvas frames.
 */
export const MUMBUDDIE_FAN: PhoneFanMedia = {
  type: "phoneFan",
  label: "Mumbuddie app screens: Vault, Home and Circle",
  tint: "#3f7a5a",
  screens: [
    { src: "/images/mumbuddie/vault.webp", smSrc: "/images/mumbuddie/vault-sm.webp" },
    { src: "/images/mumbuddie/home.webp", smSrc: "/images/mumbuddie/home-sm.webp" },
    { src: "/images/mumbuddie/circle.webp", smSrc: "/images/mumbuddie/circle-sm.webp" },
  ],
};

export const RABII_FAN: PhoneFanMedia = {
  type: "phoneFan",
  label:
    "Rabii app screens: the guided search asking when you are travelling, the search form with London to Manchester filled in, and the trip details for a FlixBus coach from London Victoria to Manchester",
  tint: "#2c3e9e",
  screens: [
    { src: "/images/rabii/rabii-guided.webp", smSrc: "/images/rabii/rabii-guided-sm.webp" },
    { src: "/images/rabii/rabii-search.webp", smSrc: "/images/rabii/rabii-search-sm.webp" },
    { src: "/images/rabii/rabii-detail.webp", smSrc: "/images/rabii/rabii-detail-sm.webp" },
  ],
};
