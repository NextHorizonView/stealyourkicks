import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:flex md:justify-between">
        {/* Left Section */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          {/* Insert logo image */}
          <Image
            src={"/logo.png"} // The path to your logo image
            alt="Logo" 
            width={150} // Adjust the width according to your needs
            height={50} // Adjust the height according to your needs
            className="mb-4"
          />
          <p className="mb-1">Address:</p>
          <p>USA, California</p>
          <p className="mt-2 mb-1">Contact:</p>
          <p>1800 123 4567</p>
          <a href="mailto:javaria.y2be@gmail.com" className="text-blue-400">javaria.y2be@gmail.com</a>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <a href="#" className="block mb-2">Link One</a>
            <a href="#" className="block mb-2">Link Two</a>
            <a href="#" className="block mb-2">Link Three</a>
            <a href="#" className="block mb-2">Link Four</a>
            <a href="#" className="block mb-2">Link Five</a>
          </div>
          <div>
            <a href="#" className="block mb-2">Link One</a>
            <a href="#" className="block mb-2">Link Two</a>
            <a href="#" className="block mb-2">Link Three</a>
            <a href="#" className="block mb-2">Link Four</a>
            <a href="#" className="block mb-2">Link Five</a>
          </div>
          <div>
            <a href="#" className="block mb-2">Link Six</a>
            <a href="#" className="block mb-2">Link Seven</a>
            <a href="#" className="block mb-2">Link Eight</a>
            <a href="#" className="block mb-2">Link Nine</a>
            <a href="#" className="block mb-2">Link Ten</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2023 Javaria. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
