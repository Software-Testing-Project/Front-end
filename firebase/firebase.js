// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbpFvN69x-bPOb_2zZCmZIDQlEplTQZi0",
  authDomain: "smart-guard-280e9.firebaseapp.com",
  projectId: "smart-guard-280e9",
  storageBucket: "smart-guard-280e9.appspot.com",
  messagingSenderId: "369357215380",
  appId: "1:369357215380:web:fc69778e8d5c4d5bc18681",
  measurementId: "G-8EY7K305KQ",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export { firebase_app };
