// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNwWtT2Kc2cYNPSwREF4XOAg4mtO75Chw",
  authDomain: "astrodatahub-3318f.firebaseapp.com",
  projectId: "astrodatahub-3318f",
  storageBucket: "astrodatahub-3318f.appspot.com", // Fixed incorrect URL
  messagingSenderId: "584810208431",
  appId: "1:584810208431:web:f7451b7376bdfbfeab085a",
  measurementId: "G-D85GBZEYSY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with offline persistence
const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error("Persistence failed: multiple tabs open");
  } else if (err.code === "unimplemented") {
    console.error("Persistence is not supported");
  }
});

// Initialize Firebase Storage (Keep for future use if needed)
const storage = getStorage(app);

// Initialize other services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Export all services
export { app, db, auth, storage, analytics, googleProvider, facebookProvider };

// Export default database instance
export default db;
