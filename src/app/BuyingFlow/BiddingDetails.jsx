'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/header/Navbar';
import SizeDropDown from './SizeDropDown';
import { BuyPageCard } from '../components/cards/BuyPageCard';

const AuctionPage = () => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const isFormValid = selectedAddress && selectedPaymentMethod;

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0 py-10 px-5">
                {/* Product Card Section */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <BuyPageCard />
                </div>

                {/* Bidding and Purchase Details */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>

                    <SizeDropDown />

                    <div className="flex flex-col md:flex-row justify-between mt-4 bg-white p-5 rounded shadow space-y-4 md:space-y-0">
                        <div className="w-full md:w-1/2 pr-0 md:pr-2">
                            <div className="text-gray-500">Avg Sale Price</div>
                            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full mt-1">
                                $245
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 pl-0 md:pl-2">
                            <div className="text-gray-500">Buy Now</div>
                            <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">
                                $290
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Name Your Price</label>
                        <input
                            type="number"
                            placeholder="$ 34"
                            min={1}
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Select Address</label>
                        <select
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                        >
                            <option value="">Select an address</option>
                            <option value="123 Baker&apos;s Street, London">123 Baker&apos;s Street, London</option>
                            <option value="456 Oxford Avenue, New York">456 Oxford Avenue, New York</option>
                        </select>
                        <Link href="/pages/addressdetails">
                            <a className="text-blue-500 mt-3">Add New Address</a>
                        </Link>
                    </div>

                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Select Payment Method</label>
                        <select
                            value={selectedPaymentMethod}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                        >
                            <option value="">Select a payment method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                        <Link href="/pages/paymentdetails">
                            <a className="text-blue-500 mt-3">Add Payment Method</a>
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
                        <button className="border border-gray-400 text-black px-4 py-2 rounded w-full sm:w-1/2 sm:mr-2">
                            Cancel
                        </button>
                        <button
                            className={`${
                                isFormValid ? 'bg-blue-500' : 'bg-gray-300'
                            } text-white px-4 py-2 rounded w-full sm:w-1/2 sm:ml-2`}
                            disabled={!isFormValid}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuctionPage;
