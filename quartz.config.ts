import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Le reflet🪴",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "votaquangnhat.github.io",
    ignorePatterns: ["private", "_templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: true,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Montserrat",
        body: "EB Garamond",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf6f0", // Warm off-white background
          lightgray: "#e3cbb2", // Soft beige for borders
          gray: "#c89f84", // Warm gray for graph links, heavier borders
          darkgray: "#7d4f40", // Rich brown for body text
          dark: "#4a2f27", // Deep brown for header text and icons
          secondary: "#b65d3a", // Warm terracotta for links and current graph node
          tertiary: "#e09664", // Soft warm orange for hover states and visited graph nodes
          highlight: "rgba(255, 163, 102, 0.2)", // Light warm orange for highlights
          textHighlight: "#ffcc8888", // Warm yellow-orange for markdown highlighted text background
        },
        darkMode: {
          light: "#2b1b14", // Dark warm brown background
          lightgray: "#5a3e2b", // Deep warm taupe for borders
          gray: "#9a6b54", // Muted warm brown for graph links, heavier borders
          darkgray: "#e3c4a8", // Soft warm beige for body text
          dark: "#f2e1ce", // Light cream for header text and icons
          secondary: "#d98566", // Warm reddish-orange for links and current graph node
          tertiary: "#e5a06b", // Light peachy orange for hover states and visited graph nodes
          highlight: "rgba(224, 140, 90, 0.2)", // Warm peach for internal link background, highlighted text, highlighted code
          textHighlight: "#f4b86088", // Warm golden tone for markdown highlighted text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "mathjax" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
