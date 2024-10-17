// src/app/lib/contexts/AdminAuth.js
"use client";

import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../firebase';// Import your Firestore instance
import { doc, getDoc } from 'firebase/firestore';

// Higher Order Component (HOC) for admin route protection
const withAdminAuth = (Component) => {
  return function AdminProtectedPage(props) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(null); // To track admin status

    useEffect(() => {
      const checkAdminStatus = async () => {
        if (user) {
          const adminDocRef = doc(db, 'Admins', user.uid); // Reference to the Admins collection
          const adminDoc = await getDoc(adminDocRef);

          if (adminDoc.exists()) {
            setIsAdmin(true); // User is admin
          } else {
            setIsAdmin(false); // User is not admin
          }
        }
      };

      if (!isLoading) {
        checkAdminStatus();
      }
    }, [user, isLoading]);

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          router.push('/pages/login'); // Redirect to login if no user is logged in
        } else if (isAdmin === false) {
          router.push('/'); // Redirect to home if not an admin
        }
      }
    }, [user, isLoading, isAdmin, router]);

    if (isLoading || isAdmin === null) {
      return <div>Loading...</div>; // Show loading until admin status is determined
    }

    return <Component {...props} />;
  };
};

export default withAdminAuth;
