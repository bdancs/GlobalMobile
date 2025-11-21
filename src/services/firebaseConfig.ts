import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6WC3MaSbSkFcf4XIgtN6oQDAI2ZMwS_g",
  authDomain: "securitystate-f969a.firebaseapp.com",
  databaseURL: "https://securitystate-f969a-default-rtdb.firebaseio.com",
  projectId: "securitystate-f969a",
  storageBucket: "securitystate-f969a.firebasestorage.app",
  messagingSenderId: "903843978334",
  appId: "1:903843978334:web:37d5d37db0a2c03e8128cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
