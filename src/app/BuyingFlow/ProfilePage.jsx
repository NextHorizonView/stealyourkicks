'use client';
import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Profile</h2>
      
      {/* Personal Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="font-bold text-gray-600">Name:</span>
            <p className="text-lg text-gray-800">Jane Doe</p>
          </div>
          <div>
            <span className="font-bold text-gray-600">Shoe Size:</span>
            <p className="text-lg text-gray-800">UK 5</p>
          </div>
          <div>
            <span className="font-bold text-gray-600">Email:</span>
            <p className="text-lg text-gray-800">sjk@gmail.com</p>
          </div>
          <div>
            <span className="font-bold text-gray-600">Contact:</span>
            <p className="text-lg text-gray-800">9210092100</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-bold text-gray-600">Username:</span>
            <p className="text-lg text-gray-800">Jane_Doe</p>
          </div>
        </div>
      </div>

      {/* Shipping Details Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Details</h3>
        <div className="mb-2">
          <span className="font-bold text-gray-600">Address:</span>
          <p className="text-lg text-gray-800">123 Bakers Street London</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
