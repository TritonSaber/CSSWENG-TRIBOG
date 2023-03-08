export default {
  ssr: false,
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Srixon Client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['@assets/scss/app.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
  ],
  /*
   ** Build configuration
   */
  build: {},
}
