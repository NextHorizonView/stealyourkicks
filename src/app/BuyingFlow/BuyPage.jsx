"use client";


import React from 'react';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import Navbar from '../components/header/Navbar';
import SizeDropdown from './SizeDropDown';
import Link from 'next/link';
import { getProducts, useProducts } from "@/app/lib/firebase/products/read"; // Hook to get products from Firestore

const BuyPage = async ({shoeid}) => {

    const id  = shoeid; // Extract product ID from URL
    const product = await getProducts(id);
    console.log("product id",id);
    console.log("product",product);


    // Wait for router to be ready and product data to load
    if (!id) {
        return <div>Loading...</div>; // Show loading state if ID is not available
    }
    // if (product) {
    //     return <div>Error: {product}</div>;
    // }
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    // Find the specific product based on ID



    // if (!shoe) {
    //     return <div>{shoeid}</div>;
    // }

    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col lg:flex-row justify-center items-center lg:space-x-10 py-10 px-5'>
                    {/* Product Image Section */}
                    
                    <div className="w-50% lg:w-1/3 flex justify-center">
                        {/* Pass the shoe data to BuyPageCard */}
                        <BuyPageCard  image={product?.ProductImage} productName={product?.ProductName}  />
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
                        <div className="bg-white p-5 rounded shadow space-y-5">
                            {/* Size Dropdown */}
                            <div>
                                <p className="text-lg font-.semibold">Size</p>
                                <SizeDropdown sizes={product.ProductSize} />
                            </div>

                            {/* Price Info */}
                            <div className="text-lg font-semibold">
                                <Link href="/pages/buynow">
                                <button>
                                Buy Now For <span className="font-bold">${product?.ProductPrize}</span>
                                </button>
                                </Link>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                <Link href="/pages/biddingdetails">
                                    <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
                                        Place Bid
                                    </button>
                                </Link>

                                <button className="border border-black text-black font-bold py-2 px-4 rounded w-full flex-grow">
                                    Buy Now
                                </button>
                            </div>

                            {/* Sell Info */}
                            <div className="text-gray-500">
                                Sell Now for <span className="font-bold">${product?.ProductPrize - 100}</span> or Ask For More.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyPage;
