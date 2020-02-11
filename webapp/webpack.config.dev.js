const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, 'source/index.tsx'),

  output: {
    path: outputPath,
    filename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              removeComments: true,
              collapseWhitespace: false,
              attrs: [
                'img:src',
                'link:href',
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'source'),
    },
    extensions: [
      '.js', '.jsx', '.ts', '.tsx', '.json'
    ],
  },

  devtool: 'source-map',

  devServer: {
    contentBase: outputPath,
    hot: true,
    open: true,
    port: 8080,
    quiet: true,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'source/index.html'),
      filename: 'index.html',
      cache: true,
      hash: true,
    }),
  ],
}