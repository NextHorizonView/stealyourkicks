import React from 'react'; 
import Image from 'next/image'; // Next.js Image component
import { FaGithub, FaInstagram } from 'react-icons/fa'; // Importing GitHub and Instagram icons from React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:flex md:justify-between md:items-center">
        {/* Left Section */}
        <div className="md:w-1/4 mb-6 md:mb-0 flex flex-col items-start">
          {/* Insert white logo image */}
          {/* <img src="logo.png" alt="" /> */}
          <p>USA, California</p>
          <p>1800 123 4567</p>
          <a href="mailto:javaria.y2be@gmail.com" className="text-blue-400">
            javaria.y2be@gmail.com
          </a>
        </div>

        {/* Center Section with Navigation Links */}
        <div className="md:w-1/2 flex justify-center space-x-8 mb-6 md:mb-0">
          <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="/services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </div>

        {/* Right Section with Social Media Icons */}
        <div className="md:w-1/4 flex justify-end space-x-6">
          <a
            href="https://github.com/yourgithubusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/yourinstagramhandle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400"
          >
            <FaInstagram size={24} />
          </a>
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
