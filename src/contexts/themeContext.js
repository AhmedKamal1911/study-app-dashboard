import { ThemeProvider, createTheme } from "@mui/material";

import { createContext, useContext, useState } from "react";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    dark: "rgba(50,71,92,0.87)",
    lightDark: "rgba(143 ,155, 177,0.9)",
    body: "#6b7385",
    primary: {
      main: "rgb(105, 108, 255)",
      light: "rgba(105, 108, 255, 0.16)",
    },
    background: {
      default: "rgb(245,245,249)",
    },
  },
});
console.log(lightTheme);
const darkTheme = createTheme({
  palette: {
    dark: "rgba(255,255,255,0.9)",
    lightDark: "rgba(143 ,155, 177,0.9)",
    mode: "dark",
    body: "#6b7385",
    primary: {
      main: "rgb(105, 108, 255)",
      dark: "rgb(35,35,51)",
    },
    background: {
      paper: "rgb(43,44,64)",
      default: "rgb(35,35,51)",
    },
  },
});
const ThemeContext = createContext({
  toggleDarkMode: () => {},
  colorMode: "",
});
const ColorModeProvider = ({ children }) => {
  // const storagedTheme = localStorage.getItem("theme") ?? "light";
  const [colorMode, setColorMode] = useState(
    () => localStorage.getItem("theme") ?? "light"
  );
  const toggleDarkMode = () => {
    const newTheme = colorMode === "light" ? "dark" : "light";
    setColorMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const theme = colorMode === "light" ? lightTheme : darkTheme;
  // create toggle dark mode function
  console.log(theme);
  return (
    <ThemeContext.Provider value={{ toggleDarkMode, colorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
const useToggleDarkMode = () => useContext(ThemeContext);

export { ColorModeProvider, useToggleDarkMode };
