import { resolve } from 'path'
import { createClient } from 'newt-client-js'

const config = {
  projectUid: process.env.PROJECT_UID,
  appUid: process.env.APP_UID,
  token: process.env.API_TOKEN,
  apiType: 'cdn',
  pageModelUid: 'landing-page',
}

export default {
  publicRuntimeConfig: {
    ...config,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Landing page',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  alias: {
    utils: resolve(__dirname, './utils'),
  },

  router: {
    async extendRoutes(routes, resolve) {
      const client = createClient({
        projectUid: config.projectUid,
        token: config.token,
        apiType: config.apiType,
      })
      const { items } = await client.getContents({
        appUid: config.appUid,
        modelUid: config.pageModelUid,
        query: {
          depth: 2,
          select: ['pageName', 'slug'],
          limit: 1000,
        },
      })
      items.forEach((item) =>
        routes.push({ name: item.pageName, path: `/${item.slug}` })
      )
    },
  },
}
