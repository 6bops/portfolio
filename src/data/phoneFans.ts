import type { PhoneFanMedia } from "../types";

/**
 * Three app screens fanned out as phone mockups (left, centre, right), shared by the home canvas and
 * the project cards. `tint` is the app's brand hue; the backdrop mixes it with the theme's surface, so
 * it stays soft in both themes.
 */
export const MUMBUDDIE_FAN: PhoneFanMedia = {
  type: "phoneFan",
  label: "Mumbuddie app screens: Vault, Home and Circle",
  tint: "#3f7a5a",
  screens: [
    { src: "/images/mumbuddie/vault.webp", alt: "Mumbuddie Vault screen" },
    { src: "/images/mumbuddie/home.webp", alt: "Mumbuddie Home screen" },
    { src: "/images/mumbuddie/circle.webp", alt: "Mumbuddie Circle screen" },
  ],
};

export const RABII_FAN: PhoneFanMedia = {
  type: "phoneFan",
  label: "Rabii app screens: the filter sheet, a London to Manchester search and a FlixBus trip's details",
  tint: "#2c3e9e",
  screens: [
    { src: "/images/rabii/rabii-filters.webp", alt: "Rabii filter sheet for a London to Manchester search" },
    { src: "/images/rabii/rabii-search.webp", alt: "Rabii search home with London to Manchester filled in" },
    { src: "/images/rabii/rabii-detail.webp", alt: "Rabii trip details for a FlixBus coach from London Victoria to Manchester" },
  ],
};
