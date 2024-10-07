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
import { useRouter } from "next/navigation"; // Use Next.js router
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Create an AuthContext
const AuthContext = createContext();

// AuthContextProvider component
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true, since we are waiting for Firebase response
  const [error, setError] = useState(null);
  const router = useRouter(); // Next.js router

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false); // Stop loading once we get the response
    });

    return () => unsub(); // Clean up listener on unmount
  }, []);

  const handleSignInWithGoogle = async (redirectPath = "/dashboard") => {
    setIsLoading(true);
    setError(null); // Reset error before attempting sign-in
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push(redirectPath); // Navigate to a specific route after login
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpWithEmail = async (email, password, redirectPath ) => {
    setIsLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(redirectPath); // Navigate to a specific route after signup
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignInWithEmail = async (email, password,path) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(path); // Navigate after successful login
    } catch (error) {
      console.error("Error during sign-in:", error); // Log error for debugging
      setError(error.message); // Display error to the user
    } finally {
      setIsLoading(false);
    }
  };
  const handleAdminSignInWithEmail = async (email, password, path) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      console.log("UserId:",);
      
      // Step 2: Check if the user is an admin in Firestore
      const adminDocRef = doc(db, "Admins", userId); // Assuming "Admins" collection has user UIDs as doc IDs
      const adminDoc = await getDoc(adminDocRef);
  
      if (adminDoc.exists()) {
        // Step 3: If the user is an admin, navigate to the admin dashboard or path
        router.push(path); // Redirect to the provided path, such as an admin dashboard
      } else {
        // Step 4: If the user is not an admin, show an error or redirect them
        setError("You are not authorized to access the admin panel.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error); // Log error for debugging
      setError(error.message); // Display error to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (redirectPath = "/") => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut(auth);
      router.push(redirectPath); // Navigate to a specific route after logout
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

// Loading screen with a blinking logo
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-pulse">
        <img
          src="/logo.png" // Replace this with the path to your logo
          alt="Logo"
          className="h-16 w-16"
        />
      </div>
    </div>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
