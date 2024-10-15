// src/app/lib/contexts/AdminAuth.js
"use client";

import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Higher Order Component (HOC) for admin route protection
const withAdminAuth = (Component) => {
  return function AdminProtectedPage(props) {
    const { user, isLoading, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!user) {
          router.push('/login'); // Redirect to login if no user is logged in
        } else if (!user.isAdmin) {
          router.push('/'); // Redirect to home if not an admin
        }
      }
    }, [user, isLoading, router]);
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
};

export default withAdminAuth;
