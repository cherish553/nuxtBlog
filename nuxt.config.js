require('dotenv').config()
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: '李可凡 个人笔记',
        name: '李可凡 个人笔记',
        content: process.env.npm_package_description || '李可凡 个人笔记'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  server: {
    port: 4000 // default: 3000
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/filter',
    { src: '~/plugins/mavon-editor', ssr: false },
    { src: '~/plugins/route', ssr: true }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/dotenv',
      { path: './env', filename: `.env.${process.env.NODE_ENV}` }
    ]
  ],
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:7001/',
  //     changeOrigin: true, // 表示是否跨域
  //     pathRewrite: {
  //       '/api': '' // 把 /api 替换成 /
  //     }
  //   }
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   proxy: true // 表示开启代理
  //   // prefix: '/api', // 表示给请求url加个前缀 /api
  //   // credentials: true // 表示跨域请求时是否需要使用凭证
  // },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
