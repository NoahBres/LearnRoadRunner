module.exports = {
  purge: [
    "./docs/*.md",
    "./docs/**/*.md",
    "./docs/.vuepress/**/*.vue",
    "./docs/.vuepress/**/**/*.vue",
  ],
  experimental: {
    uniformColorPalette: true,
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      opacity: {
        "85": "0.85",
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1285px',
      }
    },
  },
  variants: {},
  plugins: [],
};
