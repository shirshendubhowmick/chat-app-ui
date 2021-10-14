const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');

const commonWebpackConstants = require('./webpackConstants/common');
const developmentWebpackConstants = require('./webpackConstants/development');

const finalWebpackConstants = {
  ...commonWebpackConstants,
  ...developmentWebpackConstants,
};

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    DefinePlugin({
      ...finalWebpackConstants,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        extractComments: 'all',
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});
