const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // compress: true,
    // historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
  },
});
