'use client'
import React, { useState } from "react";
import { storage, firestore } from "../lib/firebase"; // Import Firebase setup
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

const ShoeSellingComponent = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState([{ SizeName: "", SizeStock: 0 }]);
    const [productImages, setProductImages] = useState([]);
    const [isCoupon, setIsCoupon] = useState(false); // Boolean field
    const [totalStock, setTotalStock] = useState(""); // Product total stock
    const [loading, setLoading] = useState(false); // Loader state

    // Handle Image Upload to Firebase Storage
    const handleImageUpload = async (files) => {
        const promises = Array.from(files).map(async (file) => {
            const storageRef = ref(storage, `shoe-images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            return await getDownloadURL(snapshot.ref); // Return image URL
        });

        const urls = await Promise.all(promises);
        setProductImages(urls);
    };
    // Handle File Input Change
    const handleFileChange = (e) => {
        const files = e.target.files;
        handleImageUpload(files);
    };

    // Handle Adding New Sizes
    const handleAddSize = () => {
        setProductSize([...productSize, { SizeName: "", SizeStock: 0 }]);
    };

    // Handle Size and Stock Change
    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...productSize];
        updatedSizes[index][field] = value;
        setProductSize(updatedSizes);
    };

    // Submit Form and Save to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state
    
        try {
            // Create a new product with default status
            const newProductRef = await addDoc(collection(db, "Selling"), {
                ProductName: productName,
                ProductPrize: productPrice,
                ProductImage: productImages[0] || "", // Use the first uploaded image
                ProductIsCoupon: false,
                ProductSize: productSize,
                ProductTotalStock: totalStock,
                createdAt: new Date(),
            });
    
            // Update the product to include its Firestore doc ID as ProductId
            await updateDoc(doc(db, "Selling", newProductRef.id), {
                ProductId: newProductRef.id,
            });
    
            console.log(`Product ${productName} added with ID: ${newProductRef.id}`);
    
            // Clear form fields
            setProductName("");
            setProductPrice("");
            setProductSize([{ SizeName: "", SizeStock: 0 }]);
            setProductImages([]);
            setIsCoupon(false);
            setTotalStock("");
        } catch (error) {
            console.error("Error adding product to Firestore:", error);
        }
    
        setLoading(false); // Hide loading state
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Add Your Product for Sale</h2>

            {/* Product Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="productPrice">
                        Product Price
                    </label>
                    <input
                        type="number"
                        id="productPrice"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Product Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">Upload Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">Product Sizes</label>
                    {productSize.map((size, index) => (
                        <div key={index} className="flex space-x-4 mb-2">
                            <input
                                type="text"
                                placeholder="Size Name"
                                className="flex-1 p-2 border rounded"
                                value={size.SizeName}
                                onChange={(e) => handleSizeChange(index, "SizeName", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                className="flex-1 p-2 border rounded"
                                value={size.SizeStock}
                                onChange={(e) => handleSizeChange(index, "SizeStock", e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-2 text-blue-500"
                        onClick={handleAddSize}
                    >
                        Add Size
                    </button>
                </div>

                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="totalStock">
                        Total Stock
                    </label>
                    <input
                        type="number"
                        id="totalStock"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Total Stock"
                        value={totalStock}
                        onChange={(e) => setTotalStock(e.target.value)}
                        required
                    />
                </div> */}

                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                        Is this a coupon product?
                    </label>
                    <input
                        type="checkbox"
                        checked={isCoupon}
                        onChange={(e) => setIsCoupon(e.target.checked)}
                    />
                </div> */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Adding Product..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default ShoeSellingComponent;
