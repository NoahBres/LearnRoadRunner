module.exports = {
  purge: [
    "./docs/*.md",
    "./docs/**/*.md",
    "./docs/.vuepress/**/*.vue",
    "./docs/.vuepress/**/**/*.vue",
  ],
  theme: {
    extend: {
      opacity: {
        "85": "0.85",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1285px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  variants: {},
  plugins: [],
};
