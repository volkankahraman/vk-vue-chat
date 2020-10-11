module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/chat/' : '/',
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'Chat';
			return args;
		});
	},
	pwa: {
		name: 'Chat',
		themeColor: '#42b983',
		msTileColor: '#000',
		appleMobileWebAppCache: 'yes',
		manifestOptions: {
			background_color: '#000'
		},
		workboxOptions: {
			exclude: [ /OneSignal.*\.js$/ ],
			runtimeCaching: [
				{
					urlPattern: /^\/$/,
					handler: 'networkFirst'
				}
			]
		}
	}
};
