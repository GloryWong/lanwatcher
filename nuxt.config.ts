// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  modules: ['nuxt-electron', '@vueuse/nuxt', 'vuetify-nuxt-module'],

  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
    ],
    // Note: setting app.basrURL still causes the HMR error,
    // https://github.com/nuxt/nuxt/issues/26396,
    // so disable the default options
    disableDefaultOptions: true,
  },

  typescript: {
    strict: true,
    shim: false,
  },

  ssr: false,

  router: {
    options: {
      hashMode: true,
    },
  },

  vite: {
    server: {
      middlewareMode: false,
    },
  },

  debug: true,
  compatibilityDate: '2024-07-31',
})
