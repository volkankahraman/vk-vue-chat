/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import VueChatScroll from 'vue-chat-scroll';
import { firestorePlugin } from 'vuefire';
import './registerServiceWorker';

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
