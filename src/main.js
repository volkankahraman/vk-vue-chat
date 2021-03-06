/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import VueChatScroll from 'vue-chat-scroll';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);
import { firestorePlugin } from 'vuefire';
import worker from './registerServiceWorker';

Vue.prototype.$workbox = worker;

Vue.use(firestorePlugin);

Vue.use(VueChatScroll);

// navigator.serviceWorker
// 	.register('/firebase-messaging-sw.js')
// 	.then((registration) => {
// 		Vue.prototype.$messaging.useServiceWorker(registration);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App)
}).$mount('#app');
