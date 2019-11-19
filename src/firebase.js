import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9pEin3cdW5EIyOy_n4ASL1WSzfboyDWo",
  authDomain: "flowwize-2b565.firebaseapp.com",
  databaseURL: "https://flowwize-2b565.firebaseio.com",
  projectId: "flowwize-2b565",
  storageBucket: "flowwize-2b565.appspot.com",
  messagingSenderId: "940091608374",
  appId: "1:940091608374:web:0e9c3d3a1cf5f668f97797"
};

const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
