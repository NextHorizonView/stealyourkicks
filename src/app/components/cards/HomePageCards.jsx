// components/HomePageCards.js

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai'; // Icons
import { useProducts } from "@/app/lib/firebase/products/read";
import { addProductToCart } from "@/app/lib/firebase/cart/write";
import { useAuth } from "@/app/lib/contexts/AuthContext";

export function HomePageCards() {
    const [cart, setCart] = useState([]);
    const { data, error, isLoading } = useProducts();
    const { user } = useAuth();

    const addToCart = async (shoe) => {
        console.log("Shoe", shoe);

        await addProductToCart(user.uid, shoe);
        toast.success(`${shoe.ProductName} added to cart!`, {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    if (isLoading) {
        return <div>Loading...</div>; // Handle loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle error state
    }

    const shoesData = data || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 px-5 pt-15 sm:px-10 lg:px-20">
            {shoesData.map((shoe) => (
                <CardContainer key={shoe.id} className="inter-var sm:p-8">
                    <CardBody
                        className={`relative group/card dark:bg-black w-full rounded-3xl p-4 border ${
                            shoe.isExclusive
                                ? 'bg-yellow-100 dark:bg-yellow-800 border-yellow-500 shadow-yellow-500/50 animate-pulse' // Glowing effect for exclusives
                                : 'bg-gray-50 dark:border-white/[0.2] border-black/[0.1]'
                        }`}
                    >
                        {/* Exclusive Tag */}
                        {shoe.isExclusive && (
                            <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                Exclusive
                            </span>
                        )}

                        {/* Shoe Name */}
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white text-center"
                        >
                            {shoe.ProductName}
                        </CardItem>

                        {/* Shoe Image */}
                        <CardItem translateZ="100" className="w-full mt-2">
                            <Image
                                src={shoe.ProductImage}
                                height="1000"
                                width="1000"
                                className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt={shoe.ProductName}
                            />
                        </CardItem>
                        {/* Price and Action Buttons */}
                        <div className="flex items-center justify-between mt-4">
                            {/* Buy Now Button */}
                            <Link key={shoe.id} href={`/pages/shoe/?id=${shoe?.id}/`}>
                                <button
                                    className="px-2 py-2 rounded-3xl text-indigo-600 text-sm font-bold transition w-auto flex items-center justify-center"
                                    aria-label="Buy Now"
                                >
                                    <AiOutlineShopping className="size-5" /> {/* Buy Icon */}
                                </button>
                            </Link>

                            {/* Price Display */}
                            <CardItem
                                translateZ={20}
                                className="text-xl font-bold text-neutral-600 dark:text-white text-center flex-grow"
                            >
                                {shoe.ProductPrize}
                            </CardItem>

                            {/* Add to Cart Icon */}
                            <button
                                onClick={() => addToCart(shoe)}
                                className="text-xl text-indigo-600 hover:text-indigo-700"
                                aria-label="Add to cart"
                            >
                                <AiOutlineShoppingCart />
                            </button>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
            <ToastContainer />
        </div>
    );
}
