module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'Chat';
			return args;
		});
	},
	pwa: {
		name: 'Chat',
		themeColor: '#a52422',
		msTileColor: '#000',
		appleMobileWebAppCache: 'yes',
		manifestOptions: {
			background_color: '#000',
			gcm_sender_id: '571399924691',
			name: 'Chat'
		},
		workboxOptions: {
			exclude: [ /firebase.*\.js$/, /map/ ],
			runtimeCaching: [
				{
					urlPattern: /^\/$/,
					handler: 'networkFirst'
				}
			]
		}
	}
};
