module.exports = context => ({
  plugins: {
    'postcss-preset-env': {},
    'cssnano': { preset: 'default' },
    'autoprefixer': {},
  },
  minimize: true,
});