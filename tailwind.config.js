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
    },
  },
  variants: {},
  plugins: [],
};
