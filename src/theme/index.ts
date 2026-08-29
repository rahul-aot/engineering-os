import { createTheme } from "@mui/material/styles";

// A restrained, developer-focused palette. Typography, spacing, and
// borders carry most of the visual hierarchy — not color or shadow.
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#2563eb",
        },
        background: {
          default: "#fafafa",
          paper: "#ffffff",
        },
        text: {
          primary: "#1a1a1a",
          secondary: "#5f6368",
        },
        divider: "#e5e7eb",
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#60a5fa",
        },
        background: {
          default: "#0f1115",
          paper: "#171a21",
        },
        text: {
          primary: "#eef0f2",
          secondary: "#9aa2af",
        },
        divider: "#2a2e37",
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.25 },
    h2: { fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.35 },
    h3: { fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.9rem", lineHeight: 1.65 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 4, fontWeight: 500 },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": { display: "none" },
        },
      },
    },
  },
});

export default theme;
