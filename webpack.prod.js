const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
   './src/main.js',
  ],
  plugins: [
   new CopyWebpackPlugin({
     patterns: [
       { from: 'public', to: 'pubilc' },
     ],
   }),
   new HtmlWebpackPlugin({
     template: 'src/index.html'
   })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
