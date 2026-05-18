import { useState, useEffect } from "react";

export const useTheme = () => {
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("educore-theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    dark ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("educore-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return { dark, toggleTheme };
};