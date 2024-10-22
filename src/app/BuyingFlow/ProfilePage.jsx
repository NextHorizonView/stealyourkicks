'use client';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; // Firestore methods
import { db } from '../lib/firebase';
import { useAuth } from '../lib/contexts/AuthContext';

const Profile = ({ uid }) => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({}); // To handle form input changes
  const {user}= useAuth();
  // Fetch profile data on component mount
  useEffect(() => {
    if (!user.uid) {
      console.error('UID is missing!');
      return;
    }
  
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
          setFormData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, [user.uid]);
  

  // Handle input change in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving changes to Firestore
  const handleSave = async () => {
    try {
      const docRef = doc(db, 'Users', user.uid);
      await setDoc(docRef, formData); // Update Firestore with new data
      setProfileData(formData); // Update local state with new data
      setIsEditing(false); // Exit edit mode
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Profile</h2>

      {/* Personal Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="font-bold text-gray-600">Name:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-lg text-gray-800">{profileData.name}</p>
            )}
          </div>
          <div>
            <span className="font-bold text-gray-600">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-lg text-gray-800">{profileData.email}</p>
            )}
          </div>
          <div>
            <span className="font-bold text-gray-600">Contact:</span>
            {isEditing ? (
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <p className="text-lg text-gray-800">{profileData.contactNumber}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Details Section */}
    
      {/* Addresses Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Addresses</h3>
        {formData.addresses.map((address, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <div>
              <label className="font-bold text-gray-600">Address Line 1:</label>
              <input
                type="text"
                name={`addressLine1-${index}`}
                value={address.addressLine1}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="font-bold text-gray-600">City:</label>
              <input
                type="text"
                name={`city-${index}`}
                value={address.city}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="font-bold text-gray-600">Contact Number:</label>
              <input
                type="text"
                name={`contactNumber-${index}`}
                value={address.contactNumber}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
