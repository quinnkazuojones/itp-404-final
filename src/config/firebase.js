import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyD5Dm2gJwjaIYOi_TqUpGwlYbMtqyczfAo",
  authDomain: "itp-404-d471e.firebaseapp.com",
  projectId: "itp-404-d471e",
  storageBucket: "itp-404-d471e.appspot.com",
  messagingSenderId: "426253968386",
  appId: "1:426253968386:web:4592d2292960407670331b",
  measurementId: "G-1YW35BV3TK",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const db = app.firestore();
