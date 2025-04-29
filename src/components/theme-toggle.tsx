import { useCallback, useEffect, useState } from 'react';

import { ButtonSecondary } from '@/components/button';
import Icon from '@/components/icon';
import MoonIcon from '@/images/icons/moon.svg?react';
import SunIcon from '@/images/icons/sun.svg?react';

const storageKey = 'theme-preference';

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState({
    value: getColorPreference() as 'light' | 'dark',
  });

  // theme toggle
  const html = document.documentElement;
  const themeToggleButton = document.getElementById('theme-toggle');

  const themeHandleClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';

    setPreference();
    setTheme({ value: theme.value });
  };

  const reflectPreference = useCallback(() => {
    html.setAttribute('style', `color-scheme: ${theme.value}`);
    themeToggleButton?.setAttribute('aria-label', theme.value);
  }, [html, themeToggleButton, theme.value]);

  const setPreference = useCallback(() => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  }, [theme.value, reflectPreference]);

  // set early so no page flashes / CSS is made aware
  reflectPreference();

  window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    themeToggleButton?.addEventListener('click', themeHandleClick);
  };

  useEffect(() => {
    const themeHandleChange = ({ matches: isDark }: MediaQueryListEvent) => {
      theme.value = isDark ? 'dark' : 'light';
      setPreference();
    };

    // sync with system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeHandleChange);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeHandleChange);
    };
  }, [theme, setPreference]);

  return (
    <ButtonSecondary
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      className="w-full"
      onClick={themeHandleClick}
    >
      <span>
        {theme.value === 'light' ? <Icon SvgIcon={SunIcon} isBorderless /> : <Icon SvgIcon={MoonIcon} isBorderless />}
      </span>
    </ButtonSecondary>
  );
}
