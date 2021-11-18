import { grey, lightBlue } from "@mui/material/colors";
type PaletteMode = "light" | "dark";

const generateTheme = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: { main: "#007A93" },
                  secondary: { main: grey[800] },
                  error: {
                      main: "rgb(180,30,30)"
                  },
                  success: { main: "rgb(22,179,40)" },
                  action: { active: "#007A93" }
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
    }
});
export default generateTheme;
