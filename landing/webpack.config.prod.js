const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const files = fs.readdirSync(path.resolve(__dirname, 'source'));
const htmlFiles = files.filter(fileName => /^[^_].+\.(html|ejs)$/.test(fileName));

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'source/javascripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      // Webpack detects html files from HtmlWebpackPlugin.
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
              ],
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
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
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/,
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
    extensions: ['.js', '.jsx', '.ejs'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CleanWebpackPlugin(),
    ...htmlFiles.map(fileName => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `source/${fileName}`),
        filename: fileName.replace(/(ejs)/, 'html'),
        hash: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        cache: true,
      });
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ],
  },
}