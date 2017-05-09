
const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const postcssConfig = require('./postcss.config.js')

module.exports = {
	entry: path.resolve(__dirname, 'src', 'main.js'),
    
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js',
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
				include: [
					path.resolve(__dirname, "src"),
				],
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'stage-0', 'react']
				}
			},
			{
				test: /\.pcss$/,
				use: ExtractTextPlugin.extract({
					fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
	                            localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        }, {
                            loader: 'postcss-loader',
                        }
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
				loader: "file-loader"
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
        new ExtractTextPlugin('bundle.css'),
		new WebpackNotifierPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.pcss$/,
            options: {
                postcss: postcssConfig
            }
        })
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
    devServer: {
        compress: true,
        port: 8888,
        historyApiFallback: true
    },
    devtool: process.env.NODE_ENV !== 'production' && '#eval-source-map',
}


