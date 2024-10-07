"use client";
import { db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

// Hook to fetch real-time product list
export function useProducts() {
  const { data, error } = useSWRSubscription(['Products'], ([path], { next }) => {
    const ref = collection(db, path);
    
    const unsub = onSnapshot(
      ref,
      (snaps) => {
        const productData = snaps.docs.map((doc) => ({
          id: doc.id,
          ProductId: doc.data().ProductId,
          ProductImage: doc.data().ProductImage,
          ProductIsCoupon: doc.data().ProductIsCoupon,
          ProductName: doc.data().ProductName,
          ProductPrize: doc.data().ProductPrize,
          ProductSize: doc.data().ProductSize,
          ProductTotalStock: doc.data().ProductTotalStock
        }));
        
        console.log('Fetched products:', productData);  // Check the fetched data
        next(null, productData);
      },
      (error) => {
        console.error('Error fetching products:', error.message || error);  // Log error if any
        next(error?.message || "Error fetching products");
      }
    );
    
    return () => unsub();
  });

  console.log('Data:', data);  // Check if data is being returned
//   console.log('Error:', error);  // Check if there's any error

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}
