const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

const CopyPlugin = require('copy-webpack-plugin');

const InlineChunkHtmlPlugin = require('./InlineChunkHtmlPlugin');

module.exports = {
	entry: './app/js/index.js',
	output: {
		path: path.resolve(__dirname, '../server/dist'),
		filename: 'build.js',
		publicPath: '/dist/'
	},
	mode: 'production',
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
			{
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.php',
			inject: true,
			template: './app/index.php',
			minify: {
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				removeComments: true
			}
		}),
		new HTMLInlineCSSWebpackPlugin(),
		new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/build/]),
		new CopyPlugin({
			patterns: [{
					from: 'app/assets/mainMessage',
					to: '../dist'
				},
			],
		})
	]
};