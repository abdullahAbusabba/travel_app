const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
	entry: './src/client/index.js',
	mode:'production',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname,'dist')
	},
	module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
              test: /\.html$/,
              loader: 'html-loader'
            },
           {
             test: /\.(jpg|png)$/,
             use: {
               loader: 'file-loader',
               options: {
                 name: '[name].[ext]',
                 outputPath: 'images/',
                 publicPath: 'images/'
               }
             }
           }
          
            
              
        ]
    },
	plugins: [
		new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new WorkboxPlugin.GenerateSW()
	]
};

