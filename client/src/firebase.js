import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB_Go5GRE1mS2Y_5pgMpA0CmYIUoSjT0t8",
  authDomain: "e-commerce-shop-bdeb1.firebaseapp.com",
  projectId: "e-commerce-shop-bdeb1",
  storageBucket: "e-commerce-shop-bdeb1.appspot.com",
  messagingSenderId: "127103707471",
  appId: "1:127103707471:web:4b060677e4d8680133bd3a",
  measurementId: "G-X71N3RB6QG",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { app, firebase, db, auth, storage };

