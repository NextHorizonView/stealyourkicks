// "use client";
import { db } from '../../firebase'; // Make sure the path to your firebase configuration is correct
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

// Hook to fetch real-time orders list
export function useOrders() {
  const { data, error } = useSWRSubscription(['Orders'], ([path], { next }) => {
    const ref = collection(db, path);
    
    const unsub = onSnapshot(
      ref,
      (snaps) => {
        const orderData = snaps.docs.map((doc) => ({
          id: doc.id,
          AddressId: doc.data().AddressId,
          OrderId: doc.data().OrderId,
          OrderStatus: doc.data().OrderStatus,
          OrderTime: doc.data().OrderTime.toDate(), // Convert Firestore timestamp to JavaScript Date
          OrderUserId: doc.data().OrderUserId,
          ProductId: doc.data().ProductId,
          ProductImage: doc.data().ProductImage,
          ProductIsCoupon: doc.data().ProductIsCoupon,
          ProductName: doc.data().ProductName,
          ProductPrize: doc.data().ProductPrize,
          ProductSize: doc.data().ProductSize,
        }));
        
        console.log('Fetched orders:', orderData);  // Check the fetched data
        next(null, orderData);
      },
      (error) => {
        console.error('Error fetching orders:', error.message || error);  // Log error if any
        next(error?.message || "Error fetching orders");
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
export const getOrder = async (id) => {
    console.log(`Fetching order with ID: ${id}`); // Log the ID being fetched
  
    try {
      const orderDoc = await getDoc(doc(db, `Orders/${id}`));
      
      if (orderDoc.exists()) {
        console.log('Order data:', orderDoc.data()); // Log the order data if it exists
        return {
          id: orderDoc.id,
          ...orderDoc.data(), // Spread the data to include all fields
          OrderTime: orderDoc.data().OrderTime.toDate(), // Convert Firestore timestamp to JavaScript Date
        };
      } else {
        console.log('No such order!'); // Log if the order does not exist
        return null; // Return null if no document was found
      }
    } catch (error) {
      console.error('Error fetching order:', error); // Log any errors that occur
      return null; // Return null on error
    }
  };
  