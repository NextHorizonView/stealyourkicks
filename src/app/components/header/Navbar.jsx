"use client";

import { useState } from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 m-4">
                <div className="relative flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img src="/logo.png" alt="Logo" className="h-8 w-8 cursor-pointer" />
                        </Link>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden sm:flex sm:ml-auto space-x-4">
                        <Link href="/" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                        <Link href="/about" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                        <Link href="/services" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                            Services
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                        <Link href="/contact" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 ease-in-out hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-7 relative">
                        {/* Profile Icon */}
                        <button onClick={toggleProfileMenu} className="text-black hover:text-indigo-500 transition duration-300 ease-in-out">
                            <CgProfile className="h-8 w-8" />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <Link href="/pages/login" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                    Login
                                </Link>
                                <Link href="/pages/register" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* <a className="text-black hover:text-indigo-500 transition duration-300 ease-in-out" href="">
                            <FaCartShopping className="h-8 w-8" />
                        </a>
                        <a className="text-black hover:text-indigo-500 transition duration-300 ease-in-out" href="">
                            <FaHeart className="h-8 w-8" />
                        </a> */}
                    </div>

                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, toggle based on menu state */}
            <div className={`${isOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                        Home
                    </Link>
                    <Link href="/about" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                        About
                    </Link>
                    <Link href="/services" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                        Services
                    </Link>
                    <Link href="/contact" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
