// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the authentication module

const firebaseConfig = {
  apiKey: "AIzaSyAZx1zy1E7HkbldtiQ_bEy3uyBgjf4AWN0",
  authDomain: "react-dc1a3.firebaseapp.com",
  projectId: "react-dc1a3",
  storageBucket: "react-dc1a3.appspot.com",
  messagingSenderId: "1069188629042",
  appId: "1:1069188629042:web:f8c7e16c6997ec7437722b",
  measurementId: "G-53V5VP4964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication

export { auth }; // Export auth for use in your components
