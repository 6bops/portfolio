export type SkinId = "indigoemr" | "first-bank-nigeria" | "sharply-africa";

export type Skin = {
  id: SkinId;
  name: string;
  caption: string;
  fontFamily: string;
  radius: string;
  density: "compact" | "regular" | "comfortable";
  colors: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    onAccent: string;
    success: string;
    danger: string;
  };
  readout: [string, string, string];
};

// Tokens are read from the case-study content in projects.ts and the
// screenshots under public/images. FirstBank hexes are the values printed on its
// colour palette board; IndigoEMR and Sharply hexes are sampled from screenshots.
export const SKINS: Record<SkinId, Skin> = {
  indigoemr: {
    id: "indigoemr",
    name: "IndigoEMR",
    caption: "Healthcare · 200K+ patients",
    fontFamily: "'Inter', system-ui, sans-serif",
    radius: "4px",
    density: "compact",
    colors: {
      bg: "#f3f5f7",
      surface: "#ffffff",
      ink: "#000000",
      muted: "#8c8e92",
      accent: "#6b69e7",
      onAccent: "#ffffff",
      success: "#0d6a41",
      danger: "#da2f4b",
    },
    readout: ["Inter · 4px radius", "Indigo #6B69E7 · Danger #DA2F4B", "Compact · 4px spacing base"],
  },
  "first-bank-nigeria": {
    id: "first-bank-nigeria",
    name: "FirstBank",
    caption: "Banking · 4 products",
    fontFamily: "'Inter', system-ui, sans-serif",
    radius: "4px",
    density: "regular",
    colors: {
      bg: "#f5f5f5",
      surface: "#ffffff",
      ink: "#162d4c",
      muted: "#4f4f4f",
      accent: "#dcaa10",
      onAccent: "#ffffff",
      success: "#27ae60",
      danger: "#eb5757",
    },
    readout: ["Inter · 4px radius", "Navy #162D4C · Gold #DCAA10", "Regular · 4px spacing base"],
  },
  "sharply-africa": {
    id: "sharply-africa",
    name: "Sharply",
    caption: "Logistics · 3 products",
    fontFamily: "'Rubik', system-ui, sans-serif",
    radius: "5px",
    density: "comfortable",
    colors: {
      bg: "#f0faf9",
      surface: "#ffffff",
      ink: "#171415",
      muted: "#6c7373",
      accent: "#5f41df",
      onAccent: "#ffffff",
      success: "#2dc540",
      danger: "#f7625e",
    },
    readout: ["Rubik · 5px radius", "Purple #5F41DF · Green #2DC540", "Comfortable density"],
  },
};

export const SKIN_ORDER: SkinId[] = ["indigoemr", "first-bank-nigeria", "sharply-africa"];
