// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  googleFonts: {
    families: {
      "Noto Sans": [300, 400, 600, 700],
    },
  },
  modules: ["@nuxtjs/google-fonts", "@nuxt/test-utils/module"],
});
