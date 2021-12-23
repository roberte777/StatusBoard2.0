type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
  typography: {
    fontSize: 16,
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#406882" },
          secondary: { main: "#6998AB" },
          action: { active: "#2F4858" },
        }
      : {
          primary: { main: "#404B69" },
          secondary: { main: "#00818A" },
          action: { active: "#DBEDF3" },
        }),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          ...(mode === "light" ? { backgroundColor: "#EEF2FF" } : null),
          // { backgroundColor: "#3F3351" }
        },
      },
    },
  },
});
export default generateTheme;
