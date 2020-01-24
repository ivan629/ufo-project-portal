const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s(c|a)ss$/,
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
          fiber: require('fibers')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
