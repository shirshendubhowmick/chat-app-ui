const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
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
