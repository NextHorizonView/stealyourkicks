import React from 'react'
import { BuyPageCard } from '../components/cards/BuyPageCard'
import Navbar from '../components/header/Navbar'
import SizeDropdown from './SizeDropDown'
import Link from 'next/link'

const BuyPage = () => {
    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col lg:flex-row justify-center items-center  lg:space-x-10 py-10 px-5'>

                    {/* Product Image Section */}
                    <div className="w-50% lg:w-1/3 flex justify-center">
                        <BuyPageCard />
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
                        <div className="bg-white p-5 rounded shadow space-y-5">

                            {/* Size Dropdown */}
                            <div>
                                <p className="text-lg font-semibold">Size</p>
                                <SizeDropdown />
                            </div>

                            {/* Price Info */}
                            <div className="text-lg font-semibold">
                                Buy Now For <span className="font-bold">$220</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                                <Link href="/pages/biddingdetails">
                                   
                                        <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
                                            Place Bid
                                        </button>
                                   
                                </Link>

                                <button className="border border-black text-black font-bold py-2 px-4 rounded w-full flex-grow">
                                    Buy Now
                                </button>
                            </div>


                            {/* Sell Info */}
                            <div className="text-gray-500">
                                Sell Now for <span className="font-bold">$299</span> or Ask For More.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyPage;
