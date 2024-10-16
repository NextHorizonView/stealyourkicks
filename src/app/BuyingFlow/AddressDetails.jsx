"use client"
import React, { useState } from 'react';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import Navbar from '../components/header/Navbar';
import { db } from '../lib/firebase'; // Adjust the import according to your Firebase setup
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../lib/contexts/AuthContext';

const AddressDetails = () => {
    // State for address inputs
    const [address, setAddress] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        city: '',
        country: '',
        postalCode: '',
        contactNumber: '',
    });
    const {user} = useAuth();
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Reference to the user document using their uid
            const userDocRef = doc(db, 'Users', user.uid);
    
            // Prepare the address data to be added
            const addressData = {
                ...address,
                createdAt: new Date().toISOString(), // Add createdAt timestamp
                email: user.email, // Assuming the user's email is passed as a prop
                uid: user.uid,
            };
    
            // Submit address data to the user's document in Firestore
            await updateDoc(userDocRef, {
                addresses: arrayUnion(addressData), // Add address to the addresses array
            });
    
            alert('Address submitted successfully!');
            // Reset the form (optional)
            setAddress({
                name: '',
                addressLine1: '',
                addressLine2: '',
                state: '',
                city: '',
                country: '',
                postalCode: '',
                contactNumber: '',
            });
        } catch (error) {
            console.error('Error adding address: ', error);
            // alert('Failed to submit address. Please try again.',error);
        }
    };

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

                    <form onSubmit={handleSubmit}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={address.name}
                                onChange={handleChange}
                                placeholder="Jane Doe"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                                required
                            />
                        </div>

                        {/* Address Line 1 Input */}
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={address.addressLine1}
                                onChange={handleChange}
                                placeholder="Elite Apartment"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                                required
                            />
                        </div>

                        {/* Address Line 2 Input */}
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Address Line 2</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={address.addressLine2}
                                onChange={handleChange}
                                placeholder="Optional"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                            />
                        </div>

                        {/* State and City Input */}
                        <div className="mb-4 flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-gray-600 block mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-gray-600 block mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Country and Postal Code Input */}
                        <div className="mb-4 flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-gray-600 block mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={address.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-gray-600 block mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Number Input */}
                        <div className="mb-4">
                            <label className="text-gray-600 block mb-1">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={address.contactNumber}
                                onChange={handleChange}
                                placeholder="+91 5210052100"
                                className="w-full border border-gray-300 px-4 py-2 rounded"
                                required
                            />
                        </div>

                        {/* Cancel and Proceed Buttons */}
                        <div className="flex justify-between mt-6 space-x-4">
                            <button type="button" className="w-1/2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressDetails;
