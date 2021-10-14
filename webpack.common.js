const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '.tsx'],
  },
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [path.resolve(__dirname, 'src/')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src/')],
        exclude: [path.resolve(__dirname, 'src/styles/')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            // options: {
            //   postcssOptions: {
            //     ...getPostCssConfig(),
            //     config: false,
            //   },
            // },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src/styles/')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            // options: {
            //   postcssOptions: {
            //     ...getPostCssConfig(),
            //     config: false,
            //   },
            // },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 100000,
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
