const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const files = fs.readdirSync(path.resolve(__dirname, 'source'));
const htmlFiles = files.filter(fileName => /\.(html|ejs)$/.test(fileName));

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'source/assets/javascripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              removeComments: true,
              collapseWhitespace: false,
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-loader',
      },
      // Webpack detects html files from HtmlWebpackPlugin.
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          root: path.resolve(__dirname, 'assets'),
          name: '[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    open: true,
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlFiles.map(fileName => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `source/${fileName}`),
        filename: fileName.replace(/(ejs)/, 'html'),
        hash: true,
        minify: true,
        cache: true,
        removeScriptTypeAttributes: true,
      });
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
}