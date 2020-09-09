import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB04GfutjyRx9CoYFyEDlsVJvHsBe25EZw",
  authDomain: "react-todo-firebase-eeeb9.firebaseapp.com",
  databaseURL: "https://react-todo-firebase-eeeb9.firebaseio.com",
  projectId: "react-todo-firebase-eeeb9",
  storageBucket: "react-todo-firebase-eeeb9.appspot.com",
  messagingSenderId: "51575302134",
  appId: "1:51575302134:web:fbb0408b52eb0a6c0e89d7",
  measurementId: "G-ZCSG34JZ6M",
});

const db = firebaseApp.firestore();

export default db;
