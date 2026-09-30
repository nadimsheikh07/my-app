export type ThemeName = "light" | "dark";
export type BootstrapTheme = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
}

export interface Theme {
  name: ThemeName;
  bootstrap: BootstrapTheme;
  colors: ThemeColors;
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    bootstrap: "light",
    colors: {
      primary: "#0d6efd",
      secondary: "#6c757d",
      success: "#198754",
      danger: "#dc3545",
    },
  },
  dark: {
    name: "dark",
    bootstrap: "dark",
    colors: {
      primary: "#3d8bfd",
      secondary: "#85888c",
      success: "#26b779",
      danger: "#e35d6a",
    },
  },
};
