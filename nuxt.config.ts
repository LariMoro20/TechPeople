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
});
