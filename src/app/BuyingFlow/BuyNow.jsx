'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/header/Navbar'; // Ensure correct casing
import SizeDropDown from './SizeDropDown';
import { BuyPageCard } from '../components/cards/BuyPageCard';

const BuyNow = () => {
    // Simulating addresses from API or state   
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    // Simulate fetching addresses (replace with actual fetch)
    useEffect(() => {
        // Fetch existing addresses from API or state management
        const fetchedAddresses = [
            { id: 1, addressLine: "123 Street, City, Country" },
            { id: 2, addressLine: "456 Avenue, City, Country" },
        ];
        setAddresses(fetchedAddresses);
        setSelectedAddress(fetchedAddresses[0]?.id || ''); // Set the first address as the default selection
    }, []);

    // Handle address selection
    const handleAddressChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'addNew') {
            // Redirect to address details page to add a new address
            window.location.href = "/pages/addressdetails"; // Replace with appropriate method in your framework
        } else {
            setSelectedAddress(selectedValue);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0 py-10 px-5'>
                {/* Product Card Section */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <BuyPageCard />
                </div>

                {/* Right Section - Purchase Details */}
                <div className="w-full lg:w-1/3">
                    {/* Size Dropdown */}
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Size</p>
                        <SizeDropDown />
                    </div>

                    {/* Buy Now Price */}
                    <div className="bg-white p-5 rounded shadow mt-4">
                        <div className="text-gray-500">Buy Now</div>
                        <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">$251</button>
                    </div>

                    {/* Address Section with Dropdown */}
                    <div className="mt-4">
                        <label className="text-lg font-semibold block mb-2">Select Address</label>
                        <select
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            {/* Dynamically generate options for each address */}
                            {addresses.map((address) => (
                                <option key={address.id} value={address.id}>
                                    {address.addressLine}
                                </option>
                            ))}
                            {/* Option to add a new address */}
                            <option value="addNew">Add New Address</option>
                        </select>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3 mt-4">
                        <Link href="/pages/paymentdetails">
                            <div className="flex justify-between items-center border border-gray-300 px-4 py-3 rounded">
                                <span>Add Payment Method</span>
                                <button className="text-blue-500">Add</button>
                            </div>
                        </Link>
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
};

export default BuyNow;
