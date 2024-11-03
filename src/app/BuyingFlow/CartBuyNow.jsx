import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/header/Navbar';
import { BuyPageCard } from '../components/cards/BuyPageCard';
import { getProducts } from '../lib/firebase/products/read';
import { useAuth } from '../lib/contexts/AuthContext';
import { useUsers } from '../lib/firebase/userData/read';
import { createOrder } from '../lib/firebase/orders/write';
import { updateProductStock } from '../lib/firebase/products/write';
import { Timestamp } from 'firebase/firestore';

const CartBuyNow = ({ sizeData }) => {
    const router = useRouter();
    const { data } = useUsers();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productPromises = Object.keys(sizeData).map(async (shoeId) => {
                    const product = await getProducts(shoeId);
                    return { ...product, selectedSize: sizeData[shoeId] };
                });
                const fetchedProducts = await Promise.all(productPromises);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

        // Simulate address fetching (replace with real API call)
        const fetchedAddresses = []; // Mock data; replace with actual addresses
        setAddresses(fetchedAddresses);
        setSelectedAddress(fetchedAddresses[0]?.id || 'addNew');
    }, [sizeData]);

    if (loading) return <div>Loading...</div>;

    if (products.length === 0) return <div>No products found.</div>;

    const handleAddressChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'addNew') {
            router.push('/pages/addressdetails');
        } else {
            setSelectedAddress(selectedValue);
        }
    };

    const handleProceed = async () => {
        for (const product of products) {
            const selectedSizeData = product.ProductSize.find(sizeObj => sizeObj.SizeName === product.selectedSize);

            if (!selectedSizeData) {
                alert(`Selected size for ${product.ProductName} is not available!`);
                return;
            }

            if (selectedSizeData.SizeStock <= 0) {
                alert(`Selected size for ${product.ProductName} is out of stock!`);
                return;
            }

            const orderData = {
                ProductId: product.ProductId,
                ProductImage: product.ProductImage,
                ProductIsCoupon: product.ProductIsCoupon,
                ProductName: product.ProductName,
                ProductPrize: product.ProductPrize,
                ProductSize: selectedSizeData.SizeName,
                AddressId: selectedAddress,
                OrderTime: Timestamp.now(),
                OrderUserId: user.uid,
                OrderStatus: 'Pending',
            };

            try {
                await createOrder(orderData);
                const newStock = selectedSizeData.SizeStock - 1;
                await updateProductStock(product.ProductId, selectedSizeData.SizeName, newStock);
            } catch (error) {
                console.error("Error processing the order:", error);
                alert('There was an error processing your order. Please try again later.');
                return;
            }
        }
        
        router.push(`/pages/feedback`);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col space-y-10 py-10 px-5">
                {products.map((product) => (
                    <div key={product.ProductId} className="flex flex-col lg:flex-row justify-center lg:space-x-10 space-y-5 lg:space-y-0">
                        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                            <BuyPageCard image={product.ProductImage} productName={product.ProductName} />
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="mb-4">
                                <p className="text-lg font-semibold">Size</p>
                                <p>{product.selectedSize}</p>
                            </div>

                            <div className="bg-white p-5 rounded shadow mt-4">
                                <div className="text-gray-500">Buy Now</div>
                                <button className="border border-gray-400 text-black font-bold py-2 px-4 rounded w-full mt-1">
                                    ${product.ProductPrize}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-8">
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

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded"
                        onClick={handleProceed}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartBuyNow;
