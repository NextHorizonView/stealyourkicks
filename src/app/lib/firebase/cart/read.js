// lib/firebase/cart/read.js
"use client";
import { db } from '../../firebase'; // Adjust import based on your file structure
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function useCart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {user} = useAuth();
    useEffect(() => {
        if (!user.uid) return;

        const cartRef = doc(db, 'Carts', user.uid); // Reference to the user's cart document

        const unsubscribe = onSnapshot(
            cartRef,
            (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    console.log('Fetched cart:', data); // Log fetched cart data
                    setCartItems(data.items || []); // Set items to state (fallback to empty array)
                } else {
                    console.log('No such cart!');
                    setCartItems([]); // Set to empty if cart does not exist
                }
                setIsLoading(false); // Stop loading after fetching data
            },
            (error) => {
                console.error('Error fetching cart:', error);
                setError(error);
                setIsLoading(false); // Stop loading on error
            }
        );

        return () => unsubscribe(); // Cleanup on unmount
    }, [user.uid]);
    const removeFromCart = async (productId) => {
        try {
            const cartRef = doc(db, 'Carts', userId);
            await updateDoc(cartRef, {
                items: arrayRemove({ ProductId: productId }) // Ensure to match the structure of the item
            });
            console.log('Item removed from cart:', productId);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return { cartItems, error, isLoading, removeFromCart };
}
