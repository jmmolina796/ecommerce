const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './app/js/index.js',
	output: {
		path: path.resolve(__dirname, '../server/dist'),
		filename: 'build.js',
		publicPath: '/dist/'
	},
	mode: 'development',
	module: {
		rules: [{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader'
			}, {
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: ['url-loader?limit=100000']
			},
			{
				test: /\.php$/,
				loader: 'html-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.php',
			template: './app/index.php',
		}),
		new CopyPlugin({
			patterns: [{
					from: 'app/assets/mainMessage',
					to: '../dist'
				},
			],
		})
	]
};