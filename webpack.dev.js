const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	mode:'development',
	output: {
		filename: 'bundle.js',
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
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            }
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader'
                
            //   }
             , {
                test: /\.html$/i,
                loader: 'html-loader'

              },
              { 
                test: /\.(jpg|png)$/,
                use: {
                  loader: 'file-loader',
                 
                  options: {
                    esModule: false,
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
		})
		,
	//everything under <PROJECT_DIR>/dist/ will be removed.
	new CleanWebpackPlugin({
		    // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
	})
	]
};

