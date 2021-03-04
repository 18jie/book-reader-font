module.exports = {
  baseUrl: './',
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/book-reader': {
        target: 'http://localhost:8081/',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      // '/content': {
      //   target: 'http://chapter2.zhuishushenqi.com',
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/content': ''
      //   }
      }
    }
  }

