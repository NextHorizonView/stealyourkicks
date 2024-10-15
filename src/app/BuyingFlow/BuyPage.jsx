"use client";
import React, { useState, useEffect } from 'react';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import Navbar from '../components/header/Navbar';
import SizeDropDown from './SizeDropDown';
import Link from 'next/link';
import { getProducts } from "@/app/lib/firebase/products/read";
import { addProductToAuction } from '../lib/firebase/auction/write';

const BuyPage = ({ shoeid }) => {
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    // Fetch product inside useEffect
    useEffect(() => {
        const fetchProduct = async () => {
            const id = shoeid; // Extract product ID from props
            const fetchedProduct = await getProducts(id);
            setProduct(fetchedProduct);
        };
        fetchProduct();
    }, [shoeid]);

    if (!product) {
        return <div>Loading...</div>; // Show loading state if product data isn't loaded yet
    }
    const handleAuction=async ()=>
    {
        await addProductToAuction(product,selectedSize?.SizeName);
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 py-10 px-5">
                {/* Product Image Section */}
                <div className="w-50% lg:w-1/3 flex justify-center">
                    <BuyPageCard
                        image={product?.ProductImage}
                        productName={product?.ProductName}
                    />
                </div>

                {/* Product Info Section */}
                <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
                    <div className="bg-white p-5 rounded shadow space-y-5">
                        <div>
                            <p className="text-lg font-semibold">Size</p>
                            <SizeDropDown
                                sizes={product.ProductSize}
                                onSizeSelect={(size) => setSelectedSize(size)}
                            />
                        </div>

                        <div className="text-lg font-semibold">
                            Buy Now For <span className="font-bold">${product?.ProductPrize}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                            <Link href={`/pages/auction/?id=${product.ProductId}&size=${selectedSize?.SizeName || ''}`}>
                                <button className="bg-black text-white font-bold py-2 px-4 rounded w-full" onClick={handleAuction}>
                                    Place Bid
                                </button>
                            </Link>
                            <Link
                                href={`/pages/buynow/?id=${shoeid}&size=${selectedSize?.SizeName || ''}`}
                            >
                                <button
                                    className="border border-black text-black font-bold py-2 px-4 rounded w-full"
                                    disabled={!selectedSize}
                                >
                                    Buy Now
                                </button>
                            </Link>
                        </div>

                        <div className="text-gray-500">
                            Sell Now for <span className="font-bold">${product?.ProductPrize - 100}</span> or Ask For More.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyPage;
