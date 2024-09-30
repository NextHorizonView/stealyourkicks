import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      
      {/* Personal Information Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-bold">Name</span>
            <p>Jane Doe</p>
          </div>
          <div>
            <span className="font-bold">Shoe Size</span>
            <p>UK 5</p>
          </div>
          <div>
            <span className="font-bold">Email</span>
            <p>sjk@gmail.com</p>
          </div>
          <div>
            <span className="font-bold">Contact</span>
            <p>9210092100</p>
          </div>
          <div className="md:col-span-2">
            <span className="font-bold">Username</span>
            <p>Jane_Doe</p>
          </div>
        </div>
      </div>

      {/* Shipping Details Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
        <p className="font-bold">Address</p>
        <p>123, Baker's Street, London.</p>
      </div>
    </div>
  );
};

export default Profile;
