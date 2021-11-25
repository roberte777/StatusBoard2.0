import { grey, lightBlue } from "@mui/material/colors";
type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#DB5461" },
          secondary: { main: "#FFD9CE" },
          action: { active: "#2FD3C2" },
        }
      : {
          primary: { main: "#22A093" },
          secondary: { main: "#593C8F" },
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
