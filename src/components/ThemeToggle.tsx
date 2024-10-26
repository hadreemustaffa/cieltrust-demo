import { useEffect, useState } from "react";
import { ButtonSecondary } from "./Button";

const storageKey = "theme-preference";

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState({
    value: getColorPreference() as "light" | "dark",
  });

  // theme toggle
  const html = document.documentElement;
  const themeToggleButton = document.getElementById("theme-toggle");

  const themeHandleClick = () => {
    theme.value = theme.value === "light" ? "dark" : "light";

    setPreference();
    setTheme({ value: theme.value });
  };

  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  };

  const reflectPreference = () => {
    html.setAttribute("style", `color-scheme: ${theme.value}`);
    themeToggleButton?.setAttribute("aria-label", theme.value);
  };

  // set early so no page flashes / CSS is made aware
  reflectPreference();

  window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    themeToggleButton?.addEventListener("click", themeHandleClick);
  };

  const themeHandleChange = ({ matches: isDark }: MediaQueryListEvent) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  };

  useEffect(() => {
    // sync with system changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", themeHandleChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", themeHandleChange);
    };
  }, [theme]);

  return (
    <ButtonSecondary
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      isFullWidth
      onClick={themeHandleClick}
    >
      {theme.value === "light" ? "🌞" : "🌙"}
    </ButtonSecondary>
  );
}
