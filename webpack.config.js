import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { phenomicLoader } from "phenomic"
import PhenomicLoaderFeedWebpackPlugin
	from "phenomic/lib/loader-feed-webpack-plugin"
import PhenomicLoaderSitemapWebpackPlugin
	from "phenomic/lib/loader-sitemap-webpack-plugin"

import pkg from "./package.json"

export default (config = {}) => {
	const postcssPluginFile = require.resolve("./postcss.config.js")
	const postcssPlugins = (webpackInstance) => {
		webpackInstance.addDependency(postcssPluginFile)
		delete require.cache[postcssPluginFile]
		return require(postcssPluginFile)
	}
	return {
		...config.dev && {
			devtool: "#cheap-module-eval-source-map",
		},
		module: {
			noParse: /\.min\.js/,
			rules: [
				{
					test: /\.json$/,
					loader: "json-loader",
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					enforce: 'pre',
					use: [{
						loader: 'eslint-loader',
						options: {
							configFile: './.eslintrc.js',
							failOnError: false
						}
					}]
				},
				{
					test: /\.jsx?$/,
					include: [
						path.resolve(__dirname, "scripts"),
						path.resolve(__dirname, "src"),
					],
					loader: 'babel-loader',
					query: {
						presets: ['es2015', 'stage-0', 'react']
					}
				},
				{
					test: /\.pcss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
							'postcss-loader'
						]
					})
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				},
				{
					test: /\.(html|ico|jpe?g|png|gif|webp)$/,
					loader: "file-loader",
					query: {
						name: "[path][name].[hash].[ext]",
						context: path.join(__dirname, config.source),
					},
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: "url-loader?limit=10000&mimetype=application/font-woff"
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: "file-loader"
				}
			],
		},
		
		plugins: [
			new webpack.LoaderOptionsPlugin({
				test: /\.pcss$/,
				options: {
					postcss: postcssPlugins,
					context: __dirname,
				}
			}),
			
			new PhenomicLoaderFeedWebpackPlugin({
				// here you define generic metadata for your feed
				feedsOptions: {
					title: pkg.name,
					site_url: pkg.homepage,
				},
				feeds: {
					"feed.xml": {
						collectionOptions: {
							filter: {layout: "Post"},
							sort: "date",
							reverse: true,
							limit: 20,
						}
					}
				}
			}),
			
			new PhenomicLoaderSitemapWebpackPlugin({
				site_url: pkg.homepage,
			}),
			
			new ExtractTextPlugin({
				filename: "[name].[hash].css",
				disable: config.dev,
			}),
			
			...config.production && [
				new webpack.optimize.UglifyJsPlugin(
					{compress: {warnings: false}}
				),
			],
		],
		
		output: {
			path: path.join(__dirname, config.destination),
			publicPath: config.baseUrl.pathname,
			filename: "[name].[hash].js",
		},
		
		resolve: {
			extensions: [".js", ".jsx", ".json"]
		},
		
	}
}


