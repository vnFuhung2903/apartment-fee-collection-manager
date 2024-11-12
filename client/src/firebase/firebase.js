// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBpa8frZEBf55O5AAjjc5r-wJU1GjJUuIw",
  authDomain: "apartment-fee-manager.firebaseapp.com",
  projectId: "apartment-fee-manager",
  storageBucket: "apartment-fee-manager.firebasestorage.app",
  messagingSenderId: "607548746873",
  appId: "1:607548746873:web:9cf3d04f9f43afa744f8a8",
  measurementId: "G-Y0ME6HX49E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;