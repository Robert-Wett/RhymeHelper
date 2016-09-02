import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

module.exports = {
	entry: './app/index.js',
	output: { path: path.join(__dirname, 'dist'), filename:'bundle.js' },
	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.less'],
		modulesDirectories: [
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "app/components"),		// used for tests
			style: path.resolve(__dirname, "app/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('style.css', { allChunks: true }),
	],
	devtool: 'source-map',
	devServer: {
		port: process.env.PORT || 8080,
		contentBase: './app'
	}
};