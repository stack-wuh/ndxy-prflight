const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')


module.exports = {
  lintOnSave: false,
  outputDir:'static',
  assetsDir: 'static',
  baseUrl:'/',
  devServer:{
    open: true,
    host:'0.0.0.0',
    port:'10050',
    https: false,
    proxy:{
      '/admin/':{
        target:'http://192.168.10.119/ndxy1/api.php/',
        changeOrigin:true,
        pathRewrite:{
          '^/admin' : ''
        },
      }
    }
  },
  productionSourceMap: false,

  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html|\.css$/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  }
}
