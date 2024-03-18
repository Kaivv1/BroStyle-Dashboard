/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
