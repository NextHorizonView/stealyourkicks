// components/CartCard.js
"use client";

import Image from "next/image"; // Ensure you import the Image component from Next.js
import { useCart } from "@/app/lib/firebase/cart/read"; // Adjust the import path as necessary

export function CartCard({ userId }) { // Accept userId as a prop
    const { cartItems, error, isLoading, removeFromCart } = useCart(userId); // Get cart items and removeFromCart from context

    if (isLoading) {
        return <div>Loading your cart...</div>; // Show loading state
    }

    if (error) {
        return <div>Error loading cart: {error}</div>; // Handle error state
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 px-5 sm:px-10 lg:px-20">
            {cartItems && cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div
                        key={item.ProductId} // Use a unique identifier for the key
                        className="bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-4 hover:shadow-2xl transition duration-200 ease-in-out"
                    >
                        <div className="relative w-full h-60 mb-4">
                            <Image
                                src={item.ProductImage} // Use the correct property for the image
                                alt={item.ProductName} // Use the correct property for the name
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">{item.ProductName}</h3>
                            <p className="text-xl font-bold text-neutral-700 dark:text-white">₹{item.ProductPrize}</p>
                            <p className="text-md text-neutral-600 dark:text-neutral-300">Quantity: {item.ProductQuantity}</p>
                            <div className="mt-2">
                                {item.ProductSize.map((size) => (
                                    <div key={size.SizeName} className="text-sm text-neutral-600 dark:text-neutral-300">
                                        Size: {size.SizeName} (Stock: {size.SizeStock})
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => removeFromCart(item.ProductId,userId)}  // Use the correct property for the ID
                                className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                            >
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center col-span-3">
                    <p className="text-lg font-semibold text-neutral-600 dark:text-neutral-200">
                        Your cart is empty.
                    </p>
                </div>
            )}
        </div>
    );
}
