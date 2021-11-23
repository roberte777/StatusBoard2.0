import { grey, lightBlue } from "@mui/material/colors";
type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          // primary: { main: "#ddaa85" },
          // secondary: { main: "#84b7dc" },
          // error: {
          //   main: "rgb(180,30,30)",
          // },
          // success: { main: "rgb(22,179,40)" },
          // action: { active: "#B7DC84" },
          primary: { main: "#DB5461" },
          secondary: { main: "#FFD9CE" },
          action: { active: "#2FD3C2" },
        }
      : {
          // palette values for dark mode
          // primary: { main: lightBlue[600] },
          // secondary: { main: "#E24E03" },
          // error: { main: "rgb(180,30,30)" },
          // success: { main: "rgb(22,179,40)" },
          // action: { active: lightBlue[600] },
          // background: { paper: "#141414", default: "#202020" },
          // text: {
          //   primary: "#fff",
          //   secondary: grey[500],
          // },
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
