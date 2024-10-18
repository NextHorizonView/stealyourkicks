'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/header/Navbar';
import SizeDropDown from './SizeDropDown';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import { getProducts } from '../lib/firebase/products/read';
import { useAuth } from '../lib/contexts/AuthContext';
import { useUsers } from '../lib/firebase/userData/read';
import { createOrder } from '../lib/firebase/orders/write'; // Import your order creation function
import { updateProductStock } from '../lib/firebase/products/write'; // Import your stock update function
import { Timestamp } from 'firebase/firestore';

const BuyNow = ({ shoeid, size }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [product, setProduct] = useState(null);
    const shoeId = searchParams.get('id') || ''; 
    const { data } = useUsers();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedSize, setSelectedSize] = useState(null);
    const {user} = useAuth();
    // Fetch product and addresses data
    useEffect(() => {
        const fetchProduct = async () => {
            const id = shoeid; 
            const fetchedProduct = await getProducts(id);
            setProduct(fetchedProduct);
        };

        // Simulate address fetching (replace with real API call)
        const fetchedAddresses = []; // Mock data; replace with actual addresses

        fetchProduct();
        // setAddresses(fetchedAddresses);
        setSelectedAddress(fetchedAddresses[0]?.id || 'addNew');
    }, [shoeid]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddressChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'addNew') {
            router.push('/pages/addressdetails'); // Redirect to address details page
        } else {
            setSelectedAddress(selectedValue);
        }
    };

    const handleProceed = async () => {
        // Ensure selectedSize is set before proceeding
        // If you want to enforce size selection, uncomment this section
        // if (!size) {
        //     alert('Please select a size!');
        //     return;
        // }
    
        // Find the selected size data based on the size variable directly
        const selectedSizeData = product.ProductSize.find(sizeObj => sizeObj.SizeName === size);
        console.log("selectedSizeData",selectedSizeData);
        
        // Check if the selectedSizeData is found and its stock is greater than 0
        if (!selectedSizeData) {
            alert('Selected size is not available!');
            return;
        }
    
        if (selectedSizeData.SizeStock <= 0) {
            alert('Selected size is out of stock!');
            return;
        }
    
        // Create order data
        const orderData = {
            ProductId: product.ProductId,
            ProductImage: product.ProductImage,
            ProductIsCoupon: product.ProductIsCoupon,
            ProductName: product.ProductName,
            ProductPrize: product.ProductPrize,
            ProductSize: selectedSizeData.SizeName, // Using the size name directly from selectedSizeData
            AddressId: data,
            OrderTime: Timestamp.now(),
            OrderUserId: user.uid,
            OrderStatus: 'Pending', // Set the initial status
            // Add any other necessary order fields
        };
    
        try {
            // Create the order
            await createOrder(orderData);
    
            // Update the product stock
            const newStock = selectedSizeData.SizeStock - 1; // Decrement stock
            await updateProductStock(product.ProductId, selectedSizeData.SizeName, newStock); // Pass size name and new stock
    
            // Redirect to confirmation page
            router.push(`/pages/confirmation?id=${product.ProductId}&size=${selectedSizeData.SizeName}`);
        } catch (error) {
            console.error("Error processing the order:", error);
            alert('There was an error processing your order. Please try again later.');
        }
    };
    
    
    
    
    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0 py-10 px-5">
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                    <BuyPageCard image={product?.ProductImage} productName={product?.ProductName} />
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Size</p>
                        {size ? (
                            <p>{size}</p>
                        ) : (
                            <SizeDropDown onSizeSelect={(size) => setSelectedSize(size)} />
                        )}
                    </div>

                    <div className="bg-white p-5 rounded shadow mt-4">
                        <div className="text-gray-500">Buy Now</div>
                        <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">
                            $251
                        </button>
                    </div>

                    <div className="mt-4">
                        <label className="text-lg font-semibold block mb-2">Select Address</label>
                        {data.length > 0 ? 
                            <select
                                className="w-full border border-gray-300 px-4 py-3 rounded text-lg"
                                value={selectedAddress}
                                onChange={handleAddressChange}
                            >
                                {data.map((address) => (
                                    <option key={address.id} value={address.id}>
                                        {address.addressLine1}
                                    </option>
                                ))}
                            </select> : 
                            <div className="space-y-3 mt-4">
                                <Link href="/pages/addressdetails">
                                    <div className="flex justify-between items-center border border-gray-300 px-4 py-3 rounded">
                                        <span>Add New Address</span>
                                        <button className="text-blue-500">Add</button>
                                    </div>
                                </Link>
                            </div>
                        }
                    </div>

                    <div className="mt-4">
                        <label className="text-lg font-semibold block mb-2">Payment Method</label>
                        <div className="border border-gray-300 px-4 py-3 rounded">
                            <span>Cash on Delivery (COD)</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
                        <button className="border border-gray-400 text-black px-4 py-2 rounded w-full sm:w-1/2 sm:mr-2">
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-1/2 sm:ml-2"
                            onClick={handleProceed}
                            // disabled={!selectedAddress || !selectedSize}
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
