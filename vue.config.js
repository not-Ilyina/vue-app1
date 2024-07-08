// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'http://localhost:8086',

  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "app",
        filename: 'remoteEntry.js',
        remotes: { // 导入
          'home': 'home@http://localhost:8085/remoteEntry.js',
        },
      })
    ],
    target: 'web',
  },

  devServer: {
    port: 8086,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    }
  }
});
