module.exports = {
  lintOnSave: false,
  outputDir:'static',
  baseUrl:'/',
  devServer:{
    open: true,
    host:'0.0.0.0',
    port:'10050',
    https: false,
    proxy:{
      '/admin/':{
        target:'http://192.168.10.119/ndxy/api.php/',
        changeOrigin:true,
        pathRewrite:{
          '^/admin' : ''
        },
      }
    }
  }
}