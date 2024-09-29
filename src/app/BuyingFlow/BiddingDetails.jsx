import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/header/Navbar'; // Ensure correct casing
import SizeDropDown from './SizeDropDown';
import { BuyPageCard } from '../components/cards/BuyPageCard';

const BiddingDetails = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0 py-10 px-5'>
                {/* Product Card Section */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <BuyPageCard />
                </div>

                {/* Right Section - Bidding and Purchase Details */}
                <div className="w-full lg:w-1/3">
                    {/* Place Your Bid Header */}
                    <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>

                    {/* Size Dropdown */}
                    <SizeDropDown />

                    {/* Average Sale Price and Buy Now Price */}
                    <div className="flex flex-col md:flex-row justify-between mt-4 bg-white p-5 rounded shadow space-y-4 md:space-y-0">
                        <div className="w-full md:w-1/2 pr-0 md:pr-2">
                            <div className="text-gray-500">Avg Sale Price</div>
                            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full mt-1">$245</button>
                        </div>
                        <div className="w-full md:w-1/2 pl-0 md:pl-2">
                            <div className="text-gray-500">Buy Now</div>
                            <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">$290</button>
                        </div>
                    </div>

                    {/* Name Your Price Input */}
                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Name Your Price</label>
                        <input
                            type="number"
                            placeholder="$ 34"
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                        />
                    </div>

                    {/* Bid Expiration Input */}
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Bid Expiration"
                            className="w-full border border-gray-300 px-4 py-3 rounded"
                        />
                    </div>

                    {/* Add Address and Payment Method */}
                    <div className="space-y-3 mt-4">
                        <Link href="/pages/addressdetails">
                            <div className="flex justify-between items-center border border-gray-300 px-4 py-3 rounded">
                                <span>Add Address</span>
                                <button className="text-blue-500">Add</button>
                            </div></Link>

                        <div className="flex justify-between items-center border border-gray-300 px-4 py-3 rounded">
                            <span>Add Payment Method</span>
                            <button className="text-blue-500">Add</button>
                        </div>
                    </div>

                    {/* Cancel and Proceed Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
                        <button className="border border-gray-400 text-black px-4 py-2 rounded w-full sm:w-1/2 sm:mr-2">
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-1/2 sm:ml-2">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BiddingDetails;
