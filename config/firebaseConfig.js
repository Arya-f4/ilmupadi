import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBodGJHul3KWdqNCrfCiJBeQid7mlkabyU",
  authDomain: "consume-care.firebaseapp.com",
  projectId: "consume-care",
  storageBucket: "consume-care.appspot.com",
  messagingSenderId: "876917470097",
  appId: "1:876917470097:web:37a9cfbe2e5d69fa73e030",
  measurementId: "G-L4J7GYV5T2",
};

// Initialize the app and Firestore only once
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
