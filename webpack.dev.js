const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const common = require('./webpack.common');

const commonWebpackConstants = require('./webpackConstants/common');
const developmentWebpackConstants = require('./webpackConstants/development');

const finalWebpackConstants = {
  ...commonWebpackConstants,
  ...developmentWebpackConstants,
};

Object.keys(finalWebpackConstants).forEach((key) => {
  finalWebpackConstants[key] = JSON.stringify(finalWebpackConstants[key]);
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new DefinePlugin({
      ...finalWebpackConstants,
    }),
    // new HotModuleReplacementPlugin(),
  ],
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  devServer: {
    client: {
      progress: true,
    },
    host: '0.0.0.0',
    port: 7000,
    hot: true,
    historyApiFallback: true,
    compress: true,
  },
});
