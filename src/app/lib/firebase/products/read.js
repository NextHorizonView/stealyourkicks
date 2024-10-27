// "use client";
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
          isExclusive:doc.data().isExclusive,
          isResel:doc.data().isResel,
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
  console.log('Data:', data);
  return {
    data,
    error,
    isLoading: data === undefined,
  };
}
export const getProducts = async (id) => {
  console.log(`Fetching product with ID: ${id}`); // Log the ID being fetched

  try {
    const productDoc = await getDoc(doc(db, `Products/${id}`));
    
    if (productDoc.exists()) {
      console.log('Product data:', productDoc.data()); // Log the product data if it exists
      return productDoc.data(); // Return the product data
    } else {
      console.log('No such product!'); // Log if the product does not exist
      return null; // Return null if no document was found
    }
  } catch (error) {
    console.error('Error fetching product:', error); // Log any errors that occur
    return null; // Return null on error
  }
};
