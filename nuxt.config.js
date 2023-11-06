const pkg = require('./package');
const axios = require('axios');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Vue :)",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Vue :)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-deda2-default-rtdb.firebaseio.com',
    credentials: false
    // proxy: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-deda2-default-rtdb.firebaseio.com',
    Api_Key: 'AIzaSyB4cwW5pPsLLG1rOYM5tMjAiU7fClsvL64'
  },
  transition: {
      name: 'fade',
      mode: 'out-in'
  },
  generate: {
    routes: function() {
      return axios.get('https://nuxt-blog-deda2-default-rtdb.firebaseio.com/posts.json')
      .then(res => {
        const routes = [];
        for (const key in res.data) {
          routes.push({route: '/posts/' + key, payload: {postData: res.data[key]}});
        }
        return routes;
      });
    }
  }
}
