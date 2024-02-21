module.exports = {
  title: "Learn Road Runner",
  description: "Learn the ins-and-outs of the Road Runner library",
  head: [
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    ["meta", { charset: "utf-8" }],

    ["link", { rel: "icon", href: "/assets/baby/baby-rr.svg" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "1a56db" },
    ],

    // App icons
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/assets/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/assets/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/favicons/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/assets/favicons/safari-pinned-tab.svg",
        color: "#1a56db",
      },
    ],
    ["link", { rel: "shortcut icon", href: "/assets/favicons/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#1a56db" }],
    [
      "meta",
      {
        name: "msapplication-config",
        content: "/assets/favicons/browserconfig.xml",
      },
    ],
    ["meta", { name: "theme-color", content: "#1a56db" }],

    // Open Graph tags
    ["meta", { property: "og:type", content: "article" }],
    ["meta", { property: "og:title", content: "Learn Road Runner" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Level up your auto.\nRoad Runner made easy.",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://www.learnroadrunner.com/assets/baby/baby-rr-150ppi.png",
      },
    ],

    // Twitter card
    ["meta", { property: "twitter:card", content: "summary" }],
    ["meta", { property: "twitter:title", content: "Vue.js" }],
    [
      "meta",
      {
        property: "twitter:description",
        content: "FTC's Road Runner library made easy",
      },
    ],
    [
      "meta",
      {
        property: "twitter:image",
        content:
          "https://www.learnroadrunner.com/assets/baby/baby-rr-150ppi.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/assets/baby/baby-rr.svg",
    sidebar: [
      ["/", "Migration"],
      "/introduction",
      "/before-you-start",
      "/installing",
      "/quickstart-overview",
      "/drive-constants",
      "/dead-wheels",
      "/feedforward-tuning",
      "/straight-test",
      "/trackwidth-tuning",
      "/turn-test",
      "/localization-test-2",
      "/follower-pid-tuning",
      "/spline-test",
      "/trajectories",
      "/trajectorybuilder-functions",
      "/markers",
      "/trajectory-sequence",
      "/advanced",
      "/tools",
      "/resources",
      ["/drive-velocity-pid-tuning", "Archived"]
    ],
    displayAllHeaders: true,
    smoothScroll: true,
    lastUpdated: "Last Updated",
    searchPlaceholder: "Search...",

    repo: "NoahBres/LearnRoadRunner",
    docsDir: "docs",
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
