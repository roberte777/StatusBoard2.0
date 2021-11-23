import { grey, lightBlue } from "@mui/material/colors";
type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          // primary: { main: "#007A93" },
          primary: { main: "#ddaa85" },
          // secondary: { main: "#a2220c" },
          secondary: { main: "#aa85dd" },
          error: {
            main: "rgb(180,30,30)"
          },
          success: { main: "rgb(22,179,40)" },
          action: { active: "#00c372" }
        }
      : {
          // palette values for dark mode
          primary: { main: lightBlue[600] },
          secondary: { main: grey[100] },
          error: { main: "rgb(180,30,30)" },
          success: { main: "rgb(22,179,40)" },
          action: { active: lightBlue[600] },
          background: { paper: "#141414", default: "#202020" },
          text: {
            primary: "#fff",
            secondary: grey[500]
          }
        })
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "#dd858c"
        }
      }
    }
  }
});
export default generateTheme;
