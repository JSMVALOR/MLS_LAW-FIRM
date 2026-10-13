import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const ThemeContext = createContext();

const THEME_COLORS = { dark: "#0C0D11", light: "#FAF9F5" };

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = useCallback(() => setIsDarkTheme((prev) => !prev), []);

  // Apply theme class + keep the browser chrome matched (mobile-native §10:
  // class-switched themes must update theme-color from JS).
  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
    let tag = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "theme-color");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", isDarkTheme ? THEME_COLORS.dark : THEME_COLORS.light);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
