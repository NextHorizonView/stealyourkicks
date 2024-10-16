// "use client"; // Make sure to include this if you're using Next.js

import { db } from '../../firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';
import { useAuth } from '../../contexts/AuthContext';

// Hook to fetch real-time user addresses
export function useUsers() {
    const {user} = useAuth();
    const uid = user.uid;
  const { data, error } = useSWRSubscription(
    [`Users/${uid}`], // Path to the specific user's document
    ([path], { next }) => {
      const ref = doc(db, path);
      
      const unsub = onSnapshot(
        ref,
        (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const addresses = userData.addresses || []; // Get addresses array, default to empty array if undefined
            
            console.log('Fetched user addresses:', addresses);  // Check the fetched addresses
            next(null, addresses); // Return the addresses array
          } else {
            console.log('No such user!'); // Log if no document exists
            next(null, []); // Return empty array if no user found
          }
        },
        (error) => {
          console.error('Error fetching user addresses:', error.message || error);  // Log error if any
          next(error?.message || "Error fetching user addresses");
        }
      );

      return () => unsub();
    }
  );

  console.log('User Addresses Data:', data);  // Check if data is being returned
  // console.log('User Addresses Error:', error);  // Check if there's any error

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}
