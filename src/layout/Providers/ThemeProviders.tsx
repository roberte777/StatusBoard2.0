import { ThemeProvider } from "@emotion/react";
import React, { createContext, useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import generateTheme from "../theme";
type PaletteMode = "dark" | "light";

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: "test"
});
export default function Providers({ children }: any) {
    const [mode, setMode] = useState<PaletteMode>("light");
    useEffect(() => {
        const temp = window.localStorage.getItem("theme");
        setMode(temp ? (temp as PaletteMode) : "light");
    }, []);
    const colorMode = {
        // The dark mode switch would invoke this method
        toggleColorMode: () => {
            setMode((prevMode: PaletteMode) => {
                if (prevMode === "light") {
                    window.localStorage.setItem("theme", "dark");
                    return "dark";
                } else {
                    window.localStorage.setItem("theme", "light");
                    return "light";
                }
            });
        },
        mode: mode
    };

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(generateTheme(mode)), [mode]);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}
