// Load the default @wordpress/scripts config object
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Use the defaultConfig but replace the entry and output properties
module.exports = {
	...defaultConfig,
	entry: {
		'dashboard-app': path.resolve(
			__dirname,
			'src/index.js'
		),
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@DashboardApp': path.resolve( __dirname, 'src/pages/' ),
			'@Admin': path.resolve( __dirname, 'src/' ),
		},
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'build' ),
	},
	plugins: [
		// ...defaultConfig.plugins,
		...defaultConfig.plugins.filter( function ( plugin ) {
			if ( plugin.constructor.name === 'LiveReloadPlugin' ) {
				return false;
			}
			return true;
		} ),
	],
};