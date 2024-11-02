import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function useCart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user.uid) return;

        const cartRef = doc(db, 'Carts', user.uid);

        const unsubscribe = onSnapshot(
            cartRef,
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    console.log('Fetched cart:', data);
                    setCartItems(data.items || []);
                } else {
                    console.log('No such cart!');
                    setCartItems([]);
                }
                setIsLoading(false);
            },
            (error) => {
                console.error('Error fetching cart:', error);
                setError(error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user.uid]);

    const removeFromCart = async (productId) => {
        try {
            const cartRef = doc(db, 'Carts', user.uid);

            // Find the exact item object that matches the ProductId
            const itemToRemove = cartItems.find((item) => item.ProductId === productId);

            if (!itemToRemove) {
                console.error('Item not found in cart:', productId);
                return;
            }

            // Use the entire item object in arrayRemove
            await updateDoc(cartRef, {
                items: arrayRemove(itemToRemove)
            });

            console.log('Item removed from cart:', productId);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return { cartItems, error, isLoading, removeFromCart };
}
