// mobile menu toggle
const drawer = document.getElementById('navDrawer');
const toggleButton = document.getElementById('toggleBtn');

const tablist = document.querySelectorAll("[role='tablist']");

toggleButton.addEventListener('click', () => {
  const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

  if (!isExpanded) {
    toggleButton.ariaExpanded = 'true';
    drawer.style.right = '0';
  } else {
    toggleButton.ariaExpanded = 'false';
    drawer.removeAttribute('style');
  }
});

// theme toggle
const storageKey = 'theme-preference';

const themeHandleClick = () => {
  // flip current value
  theme.value = theme.value === 'light' ? 'dark' : 'light';

  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute(
    'style',
    `color-scheme: ${theme.value}`
  );

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value);
};

const theme = {
  value: getColorPreference(),
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', themeHandleClick);
};

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });
