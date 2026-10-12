// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/color-mode'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ssr: true,
  css: ['~~/assets/css/fonts.css', '~~/assets/css/main.css'],
  typescript: {
    strict: true,
  },
})