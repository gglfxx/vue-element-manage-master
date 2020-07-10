const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: '../node_modules/.cache/hard-source/[confighash]',
      configHash: function (webpackConfig) {
        return require('node-object-hash')({ sort: false }).hash(webpackConfig);
      },
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', 'yarn.lock'],
      },
      cachePrune: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sizeThreshold: 150 * 1024 * 1024
      },
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            data: `@import "./src/assets/styles/variable.scss";@import "./src/assets/styles/mixin.scss";`
          }
        }]
    }]
  }
})
