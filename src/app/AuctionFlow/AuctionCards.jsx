// components/AuctionCard.js

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import { useProducts } from "@/app/lib/firebase/products/read";

export function AuctionCard() {
    const { data, error, isLoading } = useProducts();
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Clear timer on component unmount
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const shoesData = data || [];

    return (
        <>
        <div className="flex align-middle font-bold justify-center text-5xl">
            Auction
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 px-5 pt-15 sm:px-10 lg:px-20">
           
            {shoesData.map((shoe) => (
                <CardContainer key={shoe.id} className="inter-var sm:p-8">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-3xl p-4 border">
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

                        {/* Price Display */}
                        <CardItem
                            translateZ={20}
                            className="text-xl font-bold text-neutral-600 dark:text-white text-center mt-4"
                        >
                            {shoe.ProductPrize}
                        </CardItem>

                        {/* Timer */}
                        <div className="text-center text-sm text-red-500 mt-2">
                            {timeLeft > 0 ? `Time Left: ${timeLeft} sec` : "Auction Ended"}
                        </div>

                        {/* BID Button */}
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition hover:bg-blue-600"
                                disabled={timeLeft === 0} // Disable button when auction ends
                            >
                                BID
                            </button>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
        </div>
        </>
    );
}
