export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1248px",
        "2xl": "1440px",
      },
      colors: {
        background: "hsla(var(--background))",
        brand: "hsla(var(--brand))",
        "brand-hover": "hsla(var(--brand-hover))",
        "brand-secondary": "hsla(var(--brand-secondary))",
        "brand-tertiary": "hsla(var(--brand-tertiary))",
        card: "hsla(var(--card))",
        "card-secondary": "hsla(var(--card-secondary))",
        surface: "hsla(var(--surface))",
        accent: "hsla(var(--accent))",
        "accent-hover": "hsla(var(--accent-hover))",
        copy: "hsla(var(--copy))",
        "copy-secondary": "hsla(var(--copy-secondary))",
        link: "hsla(var(--link))",
        "link-hover": "hsla(var(--link-hover))",
        "link-secondary": "hsla(var(--link-secondary))",
      },
      fontFamily: {
        lexend: ["Lexend", " sans-serif"],
      },
      gridTemplateColumns: {
        base: "1rem auto 1rem",
        sm: "1.875rem auto 1.875rem",
        md: "3.125rem auto 3.125rem",
        lg: "4.375rem auto 4.375rem",
        xl: "5.625rem auto 5.625rem",
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
      },
      gridTemplateRows: {
        base: "auto auto auto",
      },
    },
  },
};
