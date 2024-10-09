// components/HomePageCards.js

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
// import shoesData from "./Homeshoes.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Shopping cart icon
import { AiOutlineShopping } from 'react-icons/ai'; // Outlined Buy icon
import { useProducts } from "@/app/lib/firebase/products/read";

export function HomePageCards() {
    const [cart, setCart] = useState([]);
    const { data, error, isLoading } = useProducts();
    const addToCart = (shoe) => {
        setCart((prevCart) => [...prevCart, shoe]);
        toast.success(`${shoe.name} added to cart!`, {
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
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-3xl p-4 border">
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
                            {/* Buy Now Button with Outlined Icon */}
                            <Link key={shoe.id} href = {`/pages/shoe/?id=${shoe?.id}/`}>
                            <button
                                className="px-2 py-2 rounded-3xl  text-indigo-600 text-sm font-bold transition w-auto flex items-center justify-center"
                            >
                                <AiOutlineShopping className="size-5" /> {/* Outlined Buy Icon */}
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
