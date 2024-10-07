"use client"
import React, { useState } from "react";
import Navbar from "@/app/components/header/Navbar"; // Ensure this points to your Navbar
import { BuyPageCard } from "../components/cards/BuyPageCard";
import { FaCcVisa } from "react-icons/fa"; import { FaCcPaypal } from "react-icons/fa";
const PaymentMethod = () => {
    // State to store selected payment mode
    const [selectedMode, setSelectedMode] = useState("VISA");

    // Function to handle changes in the dropdown
    const handleModeChange = (e) => {
        setSelectedMode(e.target.value);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row justify-center md:space-x-10 py-10 px-5 space-y-5 md:space-y-0">
                {/* Placeholder for Product Card Section */}
                <div className="w-full md:w-1/3">
                    <BuyPageCard />
                </div>

                {/* Right Section - Payment Method Details */}
                <div className="w-full md:w-1/3">
                    {/* Payment Method Header */}
                    <h2 className="text-xl font-bold mb-4 sm:text-center md:text-left">Payment Method</h2>

                    {/* Payment Icons (PayPal, Visa) */}
                    <div className="bg-white p-4 rounded shadow flex items-center space-x-4 justify-center md:justify-start">
                    <FaCcVisa className="size-8" />
                    <FaCcPaypal className="size-8"/> 
                        
                    </div>

                    {/* Payment Mode Dropdown */}
                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Select Payment Mode</label>
                        <select
                            value={selectedMode}
                            onChange={handleModeChange}
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg focus:ring focus:ring-blue-200 focus:outline-none"
                        >
                            <option value="VISA">VISA</option>
                            <option value="MasterCard">MasterCard</option>
                            <option value="PayPal">PayPal</option>
                            <option value="American Express">American Express</option>
                        </select>
                    </div>

                    {/* Selected Mode Display */}
                    <div className="mt-4">
                        <label className="text-gray-500 block mb-2">Selected Mode</label>
                        <input
                            type="text"
                            value={selectedMode}
                            readOnly
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg bg-gray-100"
                        />
                    </div>

                    {/* Instruction */}
                    <p className="text-gray-500 text-sm mt-4">
                        By clicking proceed, you Authorize Feel Your Kick to charge the
                        platform amount per sale to your selected payment method.
                    </p>

                    {/* Cancel and Proceed Buttons */}
                    <div className="flex justify-between mt-6">
                        <button className="border border-gray-400 text-black px-4 py-2 rounded w-1/2 mr-2 hover:bg-gray-200">
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-1/2 ml-2 hover:bg-blue-600">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentMethod;
