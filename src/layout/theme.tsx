type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#BB2736" },
          // secondary: { main: "#FFD9CE" },
          secondary: { main: "#8894AA" },

          action: { active: "#2F4858" },
          // action: { active: "#395c9d" },
        }
      : {
          primary: { main: "#BB2736" },
          secondary: { main: "#2F4858" },
          action: { active: "#DA5260" },
        }),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "#dd858c"
        },
      },
    },
  },
});
export default generateTheme;
