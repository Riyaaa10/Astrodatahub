import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase"; // Correct import for auth and db
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create AuthContext with a default value
const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("AuthContext is not available! Make sure to wrap your app in AuthProvider.");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign up user with email and password
  async function signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user profile in Firestore with proper permission handling
      const userProfile = {
        username,
        email,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error.message);
      throw error;
    }
  }

  // Log in user with email and password
  async function login(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  }

  // Log out user
  function logout() {
    return signOut(auth);
  }

  // Fetch user profile from Firestore with permission checks
  async function getUserProfile(uid) {
    try {
      if (!uid) {
        throw new Error("Invalid user ID.");
      }
      
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn(`No user profile found for UID: ${uid}`);
        return null;
      }

      return docSnap.data();
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      throw error;
    }
  }

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const profile = await getUserProfile(user.uid);
          setCurrentUser({ ...user, profile });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  }

  // Sign in with Facebook
  async function signInWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Facebook Sign-In Error:", error.message);
      throw error;
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    signInWithFacebook,
    getUserProfile,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}
