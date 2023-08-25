// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPMO2JDZl-BS9fJuEqhx72qouVoYJxr0M",
  authDomain: "chatgpt-clone-9ad89.firebaseapp.com",
  databaseURL:
    "https://chatgpt-clone-9ad89-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatgpt-clone-9ad89",
  storageBucket: "chatgpt-clone-9ad89.appspot.com",
  messagingSenderId: "1053918056598",
  appId: "1:1053918056598:web:fc7f04a85c7da16138b2b7",
  measurementId: "G-8GQXY0CR2V",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app)
