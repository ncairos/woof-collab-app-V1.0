import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-t_T-fkosf-unQ78cvzcSw4M1ki7WB64",
  authDomain: "woof-collab.firebaseapp.com",
  databaseURL: "https://woof-collab.firebaseio.com",
  projectId: "woof-collab",
  storageBucket: "woof-collab.appspot.com",
  messagingSenderId: "228434213926",
  appId: "1:228434213926:web:d91ca9e3780225c2c43ae7"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
