import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: './public/index.js',
	output: { path:'./build', filename:'index.js' },
	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.less'],
		modulesDirectories: [
			path.resolve(__dirname, "build"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "public/components"),		// used for tests
			style: path.resolve(__dirname, "public/style"),
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
		contentBase: './public'
	}
};