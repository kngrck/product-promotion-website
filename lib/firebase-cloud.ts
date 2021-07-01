import firebase from "firebase";
import "@firebase/storage";

var firebaseConfig = {
  apiKey: process.env.FIREBASE_IMAGE_STORAGE_API_KEY,
  authDomain: process.env.FIREBASE_IMAGE_STORAGE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_IMAGE_STORAGE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_IMAGE_STORAGE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_IMAGE_STORAGE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_IMAGE_STORAGE_APP_ID,
  measurementId: process.env.FIREBASE_IMAGE_STORAGE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

export { storage, firebase as default };
