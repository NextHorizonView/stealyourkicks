"use client";

import Image from "next/image";
import { useCart } from "@/app/lib/firebase/cart/read";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartCard({ userId }) {
    const { cartItems, error, isLoading, removeFromCart } = useCart(userId);
    const router = useRouter();
    const [selectedSizes, setSelectedSizes] = useState({}); // State to track selected size for each item

    if (isLoading) {
        return <div>Loading your cart...</div>;
    }

    if (error) {
        return <div>Error loading cart: {error}</div>;
    }

    const handleSizeSelect = (productId, sizeName) => {
        setSelectedSizes((prevSizes) => ({
            ...prevSizes,
            [productId]: sizeName,
        }));
    };

    const handleProceedToCheckout = () => {
        // Ensure each item has a selected size
        const allSizesSelected = cartItems.every((item) => selectedSizes[item.ProductId]);
    
        if (!allSizesSelected) {
            alert("Please select a size for each item.");
            return;
        }
    
        // Create a string with product IDs and their corresponding sizes
        const sizeInfo = cartItems.map(item => {
            const size = selectedSizes[item.ProductId];
            return `${item.ProductId}:${size}`; // Format: ProductId:SizeName
        }).join(',');
    
        // Redirect to the checkout page with size information
        router.push(`/pages/cartbuy/?sizes=${encodeURIComponent(sizeInfo)}`);
    };
    

    return (
        <div className="p-6 px-5 sm:px-10 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={item.ProductId}
                            className="bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-4 hover:shadow-2xl transition duration-200 ease-in-out"
                        >
                            <div className="relative w-full h-60 mb-4">
                                <Image
                                    src={item.ProductImage}
                                    alt={item.ProductName}
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
                                    <label htmlFor={`size-${item.ProductId}`} className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">
                                        Select Size:
                                    </label>
                                    <select
                                        id={`size-${item.ProductId}`}
                                        value={selectedSizes[item.ProductId] || ""}
                                        onChange={(e) => handleSizeSelect(item.ProductId, e.target.value)}
                                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:bg-neutral-700 dark:text-white"
                                    >
                                        <option value="">-- Select Size --</option>
                                        {item.ProductSize.map((size) => (
                                            <option key={size.SizeName} value={size.SizeName}>
                                                {size.SizeName} (Stock: {size.SizeStock})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.ProductId, userId)}
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

            {cartItems && cartItems.length > 0 && (
                <div className="text-center">
                    <button
                        onClick={handleProceedToCheckout}
                        className="mt-4 px-8 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
