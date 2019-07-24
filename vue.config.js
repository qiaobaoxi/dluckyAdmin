const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? './': '/',
    css: {
      loaderOptions: {
        css: {
          minimize:false
        }
      }
    },
    configureWebpack: config => {
      if (isProduction) {
        config.plugins.push(new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }))
        config.optimization.splitChunks.chunks='all'
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001/',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''   //需要rewrite的,
          } 
        },
      }
    }
  }