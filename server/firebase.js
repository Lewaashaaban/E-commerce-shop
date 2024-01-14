// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_Go5GRE1mS2Y_5pgMpA0CmYIUoSjT0t8",
  authDomain: "e-commerce-shop-bdeb1.firebaseapp.com",
  projectId: "e-commerce-shop-bdeb1",
  storageBucket: "e-commerce-shop-bdeb1.appspot.com",
  messagingSenderId: "127103707471",
  appId: "1:127103707471:web:4b060677e4d8680133bd3a",
  measurementId: "G-X71N3RB6QG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firebaseConfig, app, db, auth, storage };
