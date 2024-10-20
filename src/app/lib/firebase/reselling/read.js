import { db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

// Hook to fetch real-time product list
export function useResel() {
  const { data, error } = useSWRSubscription(['Selling'], ([path], { next }) => {
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
          ProductTotalStock: doc.data().ProductTotalStock,
          status: doc.data().status || 'Pending', // Default to 'Pending'
        }));

        console.log('Fetched products at Reselling:', productData);
        next(null, productData);
      },
      (error) => {
        console.error('Error fetching products:', error.message || error);
        next(error?.message || "Error fetching products");
      }
    );

    return () => unsub(); // Unsubscribe on unmount
  });

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}

// Fetch product by ID from "Products" collection
export const getProducts = async (id) => {
  console.log(`Fetching product with ID: ${id}`);

  try {
    const productDoc = await getDoc(doc(db, `Products/${id}`));
    
    if (productDoc.exists()) {
      console.log('Product data:', productDoc.data());
      return productDoc.data();
    } else {
      console.log('No such product!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
