"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { BsCartFill } from "react-icons/bs"; // Cart icon
import { useAuth } from "@/app/lib/contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, isLoading } = useAuth();

    const profileRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setIsProfileOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

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
                        <Link href="/" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">Home</Link>
                        <Link href="pages/about" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">About</Link>
                        <Link href="/services" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">Services</Link>
                        <Link href="/contact" className="text-black hover:text-indigo-500 relative px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">Contact</Link>
                    </div>

                    {/* Icons Section */}
                    <div className="flex items-center space-x-7 ml-8 relative">
                        {/* Cart Button */}
                        <Link href="/pages/cart">
                            <button className="text-black hover:text-indigo-500 transition duration-300 ease-in-out">
                                <BsCartFill className="h-8 w-8" />
                            </button>

                        </Link>

                        {/* Profile Icon */}
                        <button onClick={toggleProfileMenu} className="text-black hover:text-indigo-500 transition duration-300 ease-in-out">
                            <CgProfile className="h-8 w-8" />
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div ref={profileRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                {!user ? (
                                    <>
                                        <Link href="/pages/login" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                            Login
                                        </Link>
                                        <Link href="/pages/register" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/pages/profile" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                            Profile
                                        </Link>
                                        <Link href="/pages/logout" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                            Logout
                                        </Link>
                                    </>
                                )}
                                {/* Admin Login */}
                                <Link href="/pages/adminlogin" className="block px-4 py-2 text-sm text-black hover:bg-indigo-500 hover:text-white transition duration-300">
                                    Admin Login
                                </Link>
                            </div>
                        )}
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
                            <svg className={`${isOpen ? "hidden" : "block"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? "block" : "hidden"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, toggle based on menu state */}
            <div className={`${isOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">Home</Link>
                    <Link href="/about" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">About</Link>
                    <Link href="/services" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">Services</Link>
                    <Link href="/contact" className="text-black hover:text-indigo-500 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
