const path = require("path");

module.exports = {
    outputDir: path.resolve(__dirname, "../src/main/resources/static"),

    transpileDependencies: [
      'vuetify'
    ],

    devServer: {
      port: 3000,
      //proxy: 'http://localhost:8080'
      proxy: {
        '^/api': {
          target: 'http://localhost:8080',
          ws: true,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/api': '/api' }
        }
      }
    },

    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {

      } else {

      }
    }
}
