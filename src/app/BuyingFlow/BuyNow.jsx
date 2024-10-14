'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // For accessing query params
import Navbar from '@/app/components/header/Navbar';
import SizeDropDown from './SizeDropDown';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import { getProducts } from '../lib/firebase/products/read';

const BuyNow = ({shoeid,size}) => {
    const router = useRouter();
    const searchParams = useSearchParams(); // Fetch query params
    const [product, setProduct] = useState(null);

    // Extract shoe ID from query params
    const shoeId = searchParams.get('id') || ''; 

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedSize, setSelectedSize] = useState(null); // Store selected size

    // Simulate fetching addresses
    useEffect(() => {
        const fetchProduct = async () => {
            const id = shoeid; // Extract product ID from props
            const fetchedProduct = await getProducts(id);
            setProduct(fetchedProduct);
        };
        const fetchedAddresses = [
            { id: 1, addressLine: '123 Street, City, Country' },
            { id: 2, addressLine: '456 Avenue, City, Country' },
        ];
        fetchProduct();
        setAddresses(fetchedAddresses);
        setSelectedAddress(fetchedAddresses[0]?.id || ''); // Set first address as default
    }, []);
    
    if (!product) {
        return <div>Loading...</div>; // Show loading state if product data isn't loaded yet
    }

    const handleAddressChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'addNew') {
            router.push('/pages/addressdetails'); // Redirect to address details page
        } else {
            setSelectedAddress(selectedValue);
        }
    };

    const handleProceed = () => {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
        }

        // Proceed to the next step (pass selected values in query params or state)
        router.push(`/pages/confirmation?id=${shoeId}&size=${selectedSize.SizeName}`);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0 py-10 px-5">
                {/* Product Card Section */}
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <BuyPageCard image={product?.ProductImage} productName={product?.ProductName} />
                </div>

                {/* Right Section - Purchase Details */}
                <div className="w-full lg:w-1/3">
                    {/* Size Dropdown */}
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Size</p>
                         {size ?
                         <p>{size}</p> 
                         :
                         <SizeDropDown
                            onSizeSelect={(size) => setSelectedSize(size)} // Capture selected size
                            />

                         }
                    </div>

                    {/* Buy Now Pri "bg-white p-5 rounded shadow mt-4">
                        <div className="text-gray-500">Buy Now</div>
                        <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">
                            $251
                        </button>
                    </div>

                    {/* Address Section */}
                    <div className="mt-4">
                        <label className="text-lg font-semibold block mb-2">Select Address</label>
                        <select
                            className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            {addresses.map((address) => (
                                <option key={address.id} value={address.id}>
                                    {address.addressLine}
                                </option>
                            ))}
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
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-1/2 sm:ml-2"
                            onClick={handleProceed}
                            disabled={!selectedAddress || !selectedSize} // Disable until size is selected
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyNow;
