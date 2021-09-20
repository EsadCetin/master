import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD9XsHzWToyy0-sJGsPhKE-OdKLqlNmUhk",
	authDomain: "master-73609.firebaseapp.com",
	projectId: "master-73609",
	storageBucket: "master-73609.appspot.com",
	messagingSenderId: "419916932537",
	appId: "1:419916932537:web:88258fed8d0d0c01784268",
	measurementId: "G-90F4QXRM9Q",
};
let app;

if (firebase.apps.length === 0) {
	const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
