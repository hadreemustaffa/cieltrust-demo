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
        copy: "hsla(var(--copy))",
        "copy-secondary": "hsla(var(--copy-secondary))",
        link: "hsla(var(--link))",
        "link-secondary": "hsla(var(--link-secondary))",
      },
      fontFamily: {
        lexend: ["Lexend", " sans-serif"],
      },
      gridTemplateColumns: {
        base: "1rem auto 1rem",
      },
      gridTemplateRows: {
        base: "auto auto auto",
      },
    },
  },
};
