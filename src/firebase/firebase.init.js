// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5oDmHXKD0ud0XeEZ6gvtdZJWs4rKJnhI",
  authDomain: "b11a12-real-estate.firebaseapp.com",
  projectId: "b11a12-real-estate",
  storageBucket: "b11a12-real-estate.firebasestorage.app",
  messagingSenderId: "187706730066",
  appId: "1:187706730066:web:7c05251e8f2836f810a18b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);