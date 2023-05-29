import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYRhU84mgWpIx3FWNbC89jCLlzLqfNXvE",
  authDomain: "gamemania-ca0c1.firebaseapp.com",
  projectId: "gamemania-ca0c1",
  storageBucket: "gamemania-ca0c1.appspot.com",
  messagingSenderId: "840797297430",
  appId: "1:840797297430:web:c1e82102d84d1bed2b0e37",
  measurementId: "G-62BMH17GK9",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
