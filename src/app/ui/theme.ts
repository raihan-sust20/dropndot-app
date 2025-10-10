"use client";

// src/theme.ts
import { createTheme, Theme } from "@mui/material/styles";

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#86937F",
      dark: "#4D5746",
      light: "#828282",
    },
    text: {
      primary: "#000000",
      secondary: "#FCFCFC",
    },
    background: {
      default: "#F5F5F5",
      paper: "#F6F6F6",
    }    
  },
  typography: {
    fontFamily: 'var(--font-poppins)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam: Theme) => ({
        body: {
          backgroundColor: themeParam.palette.background.default,
        },
      }),
    },
  },
});

export default theme;
