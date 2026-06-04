export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/seo",
  ],
  css: ["~/assets/css/main.css"],
  devtools: {
    enabled: true,
  },
  routeRules: {
    "/api/professionals": { cache: false },
    "/api/professionals/**": { cache: false },
    "/api/professionals/facets": { cache: { maxAge: 3600 } },
  },
  experimental: {
    payloadExtraction: false,
  },

  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: ["/", "/professionals"],
    },
    routeRules: {
      "/_ipx/**": { headers: { "cache-control": "max-age=604800, public" } },
    },
  },
  colorMode: {
    preference: "light",
    fallback: "light",
    storageKey: "techpeople-color-mode",
  },

  ssr: true,

  image: {
    domains: ["i.pravatar.cc"],
  },

  ogImage: {
    enabled: true,
    defaults: {
      width: 1200,
      height: 630,
      component: "OgSiteImage",
      renderer: "satori",
    },
  },

  ui: {
    colorMode: true,
  },
  app: {
    head: {
      titleTemplate: "%s — TechPeople",
      htmlAttrs: { lang: "pt-BR" },
      meta: [
        { name: "theme-color", content: "#06ad5e" },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Larissa Santos" },
        {
          name: "keywords",
          content:
            "profissionais de tecnologia, desenvolvedores, frontend, backend, fullstack, UI/UX, DevOps, catálogo de profissionais, tech, freelancers",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },
});
