module.exports = context => ({
  plugins: {
    'postcss-preset-env': {},
    'autoprefixer': {},
    'cssnano': { preset: 'default' },
  },
  minimize: true,
});