// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-LYRWpXjgMKaTQIN1F3McvvHF3SVkxzE",
  authDomain: "fir-practice-d340c.firebaseapp.com",
  projectId: "fir-practice-d340c",
  storageBucket: "fir-practice-d340c.appspot.com",
  messagingSenderId: "677427939518",
  appId: "1:677427939518:web:57d1372b9b59b2db1e36ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()