"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    AiOutlineShoppingCart,
    AiOutlineShopping,
    AiFillTag,
    AiFillFire,
} from "react-icons/ai"; // Icons for tags
import { useProducts } from "@/app/lib/firebase/products/read";
import { addProductToCart } from "@/app/lib/firebase/cart/write";
import { useAuth } from "@/app/lib/contexts/AuthContext";
import { BackgroundGradient } from "@/app/components/ui/background-gradient"; // Importing the background gradient

export function HomePageCards() {
    const [cart, setCart] = useState([]);
    const { data, error, isLoading } = useProducts();
    const { user } = useAuth();

    const addToCart = async (shoe) => {
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
                <div key={shoe.id} className="relative group p-6 rounded-3xl">
                    <CardContainer className="relative">
                        <CardBody
                            className={`relative dark:bg-black w-full rounded-3xl p-4 border shadow-xl ${
                                shoe.isExclusive || shoe.isResell || shoe.isRefurbished
                                    ? "border-none" // Special styles for exclusive, resell, and refurbished cards
                                    : "bg-gray-50 dark:border-white/[0.2] border-black/[0.1]"
                            }`}
                            style={{ minHeight: '400px' }} // Set a minimum height for uniformity
                        >
                            <CardItem translateZ="100" className="w-full mb-4">
                                <Image
                                    src={shoe.ProductImage}
                                    height="1000"
                                    width="1000"
                                    className="h-48 w-full object-cover rounded-xl"
                                    alt={shoe.ProductName}
                                />
                            </CardItem>

                            {/* Tags Section */}
                            <div className="flex justify-center space-x-2 mb-4">
                                {shoe.isExclusive && (
                                    <BackgroundGradient className="rounded-full p-1">
                                        <span className="flex items-center bg-yellow-500 text-white px-3 py-1 text-sm font-semibold rounded-full h-8">
                                            <AiFillFire className="mr-2" /> Exclusive
                                        </span>
                                    </BackgroundGradient>
                                )}
                                {shoe.isResel && (
                                    <span className="flex items-center bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-full h-8">
                                        <AiFillTag className="mr-2" /> Resell
                                    </span>
                                )}
                                {/* {shoe.isRefurbished && ( // New Refurbished Tag
                                    <span className="flex items-center bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full h-8">
                                        <AiFillTag className="mr-2" /> Refurbished
                                    </span>
                                )} */}
                            </div>

                            {/* Shoe Name and Description */}
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white text-center">
                                {shoe.ProductName}
                            </CardItem>
                            <CardItem translateZ="30" className="text-sm text-neutral-500 dark:text-gray-300 text-center mt-2">
                                {shoe.ProductDescription}
                            </CardItem>

                            {/* Price and Action Buttons */}
                            <div className="flex items-center justify-between mt-4">
                                <Link key={shoe.id} href={`/pages/shoe/?id=${shoe?.id}/`}>
                                    <button
                                        className="px-2 py-2 rounded-3xl text-white bg-indigo-600 text-sm font-bold transition w-auto flex items-center justify-center"
                                        aria-label="Buy Now"
                                    >
                                        <AiOutlineShopping className="size-5 mr-2" /> Buy now
                                    </button>
                                </Link>

                                <CardItem translateZ={20} className="text-xl font-bold text-neutral-600 dark:text-white text-center flex-grow">
                                    ${shoe.ProductPrize}
                                </CardItem>

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
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}
