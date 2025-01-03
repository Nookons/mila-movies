import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import directly from the modular SDK

const firebaseConfig = {
    apiKey: "AIzaSyCbxeuJsp-KvP1RNYzzQZIkFfuVXSTsBAo",
    authDomain: "mila-movies.firebaseapp.com",
    projectId: "mila-movies",
    storageBucket: "mila-movies.firebasestorage.app",
    messagingSenderId: "706424272307",
    appId: "1:706424272307:web:6f00706fa2c9c8aac707c6",
    measurementId: "G-Z3GBRL6L3L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);          // Firestore
export const auth = getAuth(app);              // Authentication
export const provider = new GoogleAuthProvider();  // Google Auth provider
export const analytics = getAnalytics(app);    // Analytics
