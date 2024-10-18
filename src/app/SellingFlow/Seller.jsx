'use client'
import React, { useState } from "react";

const ShoeSellingComponent = () => {
    const [shoeName, setShoeName] = useState("");
    const [shoeSize, setShoeSize] = useState("");
    const [shoePrice, setShoePrice] = useState("");
    const [shoeImages, setShoeImages] = useState([]);
    const [submittedShoes, setSubmittedShoes] = useState([]);

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const images = files.map((file) => URL.createObjectURL(file));
        setShoeImages(images);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newShoe = { 
            name: shoeName, 
            size: shoeSize, 
            price: shoePrice, 
            images: shoeImages 
        };
        setSubmittedShoes([...submittedShoes, newShoe]);

        // Clear the form fields after submission
        setShoeName("");
        setShoeSize("");
        setShoePrice("");
        setShoeImages([]);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Add Your Shoe for Sale</h2>

            {/* Shoe Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="shoeName">
                        Shoe Name
                    </label>
                    <input
                        type="text"
                        id="shoeName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Shoe Name"
                        value={shoeName}
                        onChange={(e) => setShoeName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="shoeSize">
                        Shoe Size
                    </label>
                    <input
                        type="text"
                        id="shoeSize"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Shoe Size"
                        value={shoeSize}
                        onChange={(e) => setShoeSize(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="shoePrice">
                        Shoe Price
                    </label>
                    <input
                        type="number"
                        id="shoePrice"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Shoe Price"
                        value={shoePrice}
                        onChange={(e) => setShoePrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                        Upload Shoe Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleImageUpload}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold p-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Add Shoe
                </button>
            </form>

            {/* Display Submitted Shoes */}
            <div className="mt-8">
                <h3 className="text-3xl font-semibold mb-4">Submitted Shoes</h3>

                {submittedShoes.length === 0 ? (
                    <p className="text-gray-600">No shoes added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {submittedShoes.map((shoe, index) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
                            >
                                <h4 className="text-xl font-bold mb-2">{shoe.name}</h4>
                                <p className="text-gray-700 mb-2">Size: {shoe.size}</p>
                                <p className="text-gray-700 mb-2">Price: ${shoe.price}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {shoe.images.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Shoe ${index} - Image ${imgIndex + 1}`}
                                            className="w-full h-32 object-cover rounded-md border"
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoeSellingComponent;
