importScripts('//www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('//www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

var config = {
	messagingSenderId: '571399924691',
	projectId: 'vk-chat-5c98b',
	apiKey: 'AIzaSyAq4MA7Vy0bsWO_OfXfsvd6pIziBlkBjio',
	appId: '1:571399924691:web:a21ddce999a1320bb8dd26'
};
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}
let messaging = firebase.messaging();


