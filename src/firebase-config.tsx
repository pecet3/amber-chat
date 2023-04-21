// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCO6hGZQTZ5L6YRAkUGr974GEcnaBaZo4",
  authDomain: "jakub-serverless-da0d1.firebaseapp.com",
  projectId: "jakub-serverless-da0d1",
  storageBucket: "jakub-serverless-da0d1.appspot.com",
  messagingSenderId: "795628811229",
  appId: "1:795628811229:web:be3a105f6fe89cdc8dfc34",
  measurementId: "G-3WLNJXQTW1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
