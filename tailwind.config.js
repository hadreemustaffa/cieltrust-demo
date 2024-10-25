export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsla(var(--bg))',
        brand: 'hsla(var(--brand))',
        'brand-hover': 'hsla(var(--brand-hover))',
        'brand-secondary': 'hsla(var(--brand-secondary))',
        'brand-tertiary': 'hsla(var(--brand-tertiary))',
        card: 'hsla(var(--card))',
        'card-secondary': 'hsla(var(--card-secondary))',
        surface: 'hsla(var(--surface))',
        accent: 'hsla(var(--accent))',
        copy: 'hsla(var(--copy))',
        'copy-secondary': 'hsla(var(--copy-secondary))',
        link: 'hsla(var(--link))',
        'link-secondary': 'hsla(var(--link-secondary))',
      },
      fontFamily: {
        lexend: ['Lexend', ' sans-serif'],
      },
    },
  },
};
