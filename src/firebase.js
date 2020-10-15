import Firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = Firebase.initializeApp({
	apiKey: 'AIzaSyAq4MA7Vy0bsWO_OfXfsvd6pIziBlkBjio',
	authDomain: 'vk-chat-5c98b.firebaseapp.com',
	databaseURL: 'https://vk-chat-5c98b.firebaseio.com',
	projectId: 'vk-chat-5c98b',
	storageBucket: 'vk-chat-5c98b.appspot.com',
	messagingSenderId: '571399924691',
	appId: '1:571399924691:web:a21ddce999a1320bb8dd26',
	measurementId: 'G-Q5QFJTJ831'
});
export const db = firebaseApp.firestore();

Firebase.firestore().settings({
	cacheSizeBytes: Firebase.firestore.CACHE_SIZE_UNLIMITED
});

Firebase.firestore().enablePersistence({
	synchronizeTabs: true
});

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = Firebase.firestore;
export { Timestamp, GeoPoint };