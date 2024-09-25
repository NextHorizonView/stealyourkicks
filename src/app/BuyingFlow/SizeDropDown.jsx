'use client';
import React, { useState } from 'react';
// Import sizes data from the JSON file
import sizeData from '@/app/BuyingFlow/sizes.json';

const SizeDropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    // Sizes are now fetched from the JSON file
    const sizes = sizeData.sizes;

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectSize = (size) => {
        setSelectedSize(size);
        setIsOpen(false);
    };

    return (
        <div className="relative text-black">
            <div
                onClick={toggleDropdown}
                className="bg-gray-200 p-2 rounded flex justify-between items-center cursor-pointer"
            >
                <span>{selectedSize ? `Size: ${selectedSize}` : 'Select Size'}</span>
                <span className="ml-2">&#9660;</span> {/* Down arrow */} 
            </div>
            {isOpen && (
                <div className="absolute mt-2 bg-white border border-gray-400 rounded w-full z-10 p-4">
                    <h3 className="text-gray-800 text-sm mb-2">Select Size</h3>
                    {/* Sizes in Grid Layout */}
                    <div className="grid grid-cols-4 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => selectSize(size)}
                                className={`px-2 py-3 text-center rounded ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4">
                        <button className="bg-white text-gray-600 border border-gray-400 px-4 py-2 rounded">
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SizeDropDown;
