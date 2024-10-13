import React from 'react';

const BuyNowDetails = ({ price, onClose }) => {
    return (
        <div className="bg-[#111B37] text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="flex justify-between items-center">
                <span className="text-sm bg-red-500 px-2 py-1 rounded">🔥 High Demand</span>
            <span className="text-gray-400 text-sm">1397 people are interested in this product</span>
            </div>
            
            <div className="mt-4">
                <div className="flex justify-between items-center border-b border-gray-600 pb-2">
                    <span>Size: US Men's 4</span>
                    <button className="text-blue-500">EDIT</button>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-600 pt-4">
                <h3 className="text-xl font-bold">Buy Now</h3>
                <p className="text-3xl font-bold">${price}</p>
            </div>

            <div className="mt-4 border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                    <span>Standard Shipping</span>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                    <span>No Shipping Info Provided</span>
                    <button className="text-blue-500">ADD</button>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                    <span>Please add a payment method</span>
                    <button className="text-blue-500">ADD</button>
                </div>
            </div>

            {/* Close Button */}
            <div className="mt-6">
                <button 
                    className="bg-gray-600 text-white px-4 py-2 rounded w-full" 
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BuyNowDetails;
