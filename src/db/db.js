// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estonoesmoda-34be0.firebaseapp.com",
  projectId: "estonoesmoda-34be0",
  storageBucket: "estonoesmoda-34be0.appspot.com",
  messagingSenderId: "408269334426",
  appId: "1:408269334426:web:2e8297b82f8750de077c23",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
