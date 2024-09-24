"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import Link from "next/link";
// Import your shoe data
import shoesData from "./Homeshoes.json";

export function HomePageCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 g-2 p-2 mt-16">
            {shoesData.map((shoe) => (
                <CardContainer key={shoe.id} className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-70% rounded-xl p-4 border">
                        {/* Shoe Name */}
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            {shoe.name}
                        </CardItem>

                        {/* Shoe Image */}
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src={shoe.image}
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt={shoe.name}
                            />
                        </CardItem>

                        {/* Buttons and Price */}
                        <div className="flex items-center justify-between mt-8">
                            {/* Buy Button */}
                            <Link href="/pages/buypage">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition"
                                >
                                    Buy Now
                                </CardItem>
                            </Link>

                            {/* Price Display */}
                            <CardItem
                                translateZ={20}
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {shoe.price}
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
        </div>
    );
}
