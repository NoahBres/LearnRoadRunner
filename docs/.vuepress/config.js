module.exports = {
  title: "Learn Road Runner",
  description: "Learn the ins-and-outs of the Road Runner Library",
  themeConfig: {
    sidebar: [
      ["/", "Introduction"],
      "/before-you-start",
      "/installing",
      "/quickstart-overview",
      "/drive-constants",
    ],
    displayAllHeaders: true,
    smoothScroll: true,
    lastUpdated: "Last Updated",
    searchPlaceholder: "Search...",

    repo: "NoahBres/LearnRoadRunner",
    repoLabel: "GitHub",
    editLinks: true,
    editLinkText: "Edit this page on Github!",
  },
  plugins: [
    [
      "vuepress-plugin-container",
      {
        type: "vue",
        before: '<pre class="vue-container"><code>',
        after: "</code></pre>",
      },
    ],
    [
      "vuepress-plugin-typescript",
      {
        tsLoaderOptions: {
          compilerOptions: {
            target: "es6",
          },
        },
      },
    ],
  ],
  postcss: {
    plugins: [
      require("tailwindcss")("./tailwind.config.js"),
      require("autoprefixer"),
    ],
  },
};
