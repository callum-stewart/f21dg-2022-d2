 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/main.js',
   },
   devtool: 'inline-source-map',

  devServer: {

    static: [
	{directory: path.join(__dirname, './dist')}, 
      {
	directory: path.join(__dirname, './public'),
	publicPath: '/public'	
      }],
    historyApiFallback: {
      index: '/index.html'
    },

  },
   devtool: 'inline-source-map',
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
     publicPath: '/public/'
   },
 };
