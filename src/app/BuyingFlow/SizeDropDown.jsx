"use client";
import React, { useState } from 'react';

const SizeDropDown = ({ sizes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    console.log("Sized",sizes);
    
    // Function to toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Function to select a size
    const selectSize = (size) => {
        setSelectedSize(size);
        setIsOpen(false); // Close dropdown after selecting a size
    };

    // Function to handle cancellation
    const handleCancel = () => {
        setIsOpen(false); // Close dropdown without making a selection
    };

    // Function to handle proceed action
    const handleProceed = () => {
        if (selectedSize) {
            console.log(`Proceeding with size: ${selectedSize.SizeName}`);
            // Add your proceed logic here (e.g., navigate to another page or update a parent component)
        }
    };

    return (
        <div className="relative text-black">
            {/* Dropdown toggle */}
            <div
                onClick={toggleDropdown}
                className="bg-gray-200 p-2 rounded flex justify-between items-center cursor-pointer"
            >
                <span>{selectedSize ? `Size: ${selectedSize.SizeName}` : 'Select Size'}</span>
                <span className="ml-2">&#9660;</span> {/* Down arrow icon */}
            </div>

            {/* Dropdown content */}
            {isOpen && (
                <div className="absolute mt-2 bg-white border border-gray-400 rounded w-full z-10 p-4">
                    <h3 className="text-gray-800 text-sm mb-2">Select Size</h3>
                    
                    {/* Sizes in grid layout */}
                    <div className="grid grid-cols-4 gap-2">
                        {sizes?.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => selectSize(size)}
                                className={`px-2 py-3 text-center rounded ${
                                    selectedSize && selectedSize.SizeName === size.SizeName
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                {size.SizeName} {/* Display size name */}
                                <br />
                                <small className="text-xs">Stock: {size.SizeStock}</small> {/* Display size stock */}
                            </button>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between mt-4">
                        <button onClick={handleCancel} className="bg-white text-gray-600 border border-gray-400 px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button onClick={handleProceed} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SizeDropDown;
