import React from 'react';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import Navbar from '../components/header/Navbar';

const AddressDetails = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center items-start space-y-5 lg:space-y-0 lg:space-x-10 py-10 px-5">

                <div className="w-full lg:w-1/2 flex justify-center">
                    <BuyPageCard />
                </div>

                {/* Add Address Section */}
                <div className="w-full lg:w-1/2 bg-white p-5 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Add Address</h2>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="text-gray-600 block mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Jane Doe"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* Address Line 1 Input */}
                    <div className="mb-4">
                        <label className="text-gray-600 block mb-1">Address Line 1</label>
                        <input
                            type="text"
                            placeholder="Elite Apartment"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* Address Line 2 Input */}
                    <div className="mb-4">
                        <label className="text-gray-600 block mb-1">Address Line 2</label>
                        <input
                            type="text"
                            placeholder="Elite Apartment"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* State and City Input */}
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="text-gray-600 block mb-1">State</label>
                            <input
                                type="text"
                                placeholder="State"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-gray-600 block mb-1">City</label>
                            <input
                                type="text"
                                placeholder="City"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Country and Postal Code Input */}
                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="text-gray-600 block mb-1">Country</label>
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="text-gray-600 block mb-1">Postal Code</label>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Contact Number Input */}
                    <div className="mb-4">
                        <label className="text-gray-600 block mb-1">Contact Number</label>
                        <input
                            type="text"
                            placeholder="+91 5210052100"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>

                    {/* Cancel and Proceed Buttons */}
                    <div className="flex justify-between mt-6 space-x-4">
                        <button className="w-1/2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
                            Cancel
                        </button>
                        <button className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Proceed
                        </button>
                    </div>
                </div>
            </div>

        </>

    );
};

export default AddressDetails;
