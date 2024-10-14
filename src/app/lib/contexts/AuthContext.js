"use client";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import setDoc for creating users

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  // Helper to create user document
  const createUserDoc = async (user) => {
    const userDocRef = doc(db, "Users", user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
  };

  const handleSignInWithGoogle = async (redirectPath = "/dashboard") => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await createUserDoc(result.user); // Create user document
      router.push(redirectPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpWithEmail = async (email, password, redirectPath) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserDoc(result.user); // Create user document
      router.push(redirectPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithEmail = async (email, password, path) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(path);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSignInWithEmail = async (email, password, path) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const adminDocRef = doc(db, "Admins", userId);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        router.push(path); // Admin access granted
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (redirectPath = "/") => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
      router.push(redirectPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        handleSignInWithGoogle,
        handleSignUpWithEmail,
        handleSignInWithEmail,
        handleAdminSignInWithEmail,
        handleLogout,
      }}
    >
      {isLoading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-pulse">
      <img src="/logo.png" alt="Logo" className="h-16 w-16" />
    </div>
  </div>
);

export const useAuth = () => useContext(AuthContext);
