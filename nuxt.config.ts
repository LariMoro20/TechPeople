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
    "/api/**": { cache: false },
  },
  experimental: {
    payloadExtraction: false,
  },
});
