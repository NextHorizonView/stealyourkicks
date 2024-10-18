"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import { useAuction } from "../lib/firebase/auction/read";
import { updateDoc, arrayUnion, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // Adjust to your Firebase config
import { useAuth } from "../lib/contexts/AuthContext";
import { getAuth } from "firebase/auth";

// Helper function to calculate time left and return hours, minutes, and seconds
const calculateTimeLeft = (endTime) => {

    const now = new Date();
    const end = new Date(endTime);
    const totalSeconds = Math.max(Math.floor((end - now) / 1000), 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
};

export function AuctionCard() {
    const { user } = useAuth() || {};
    const { data, error, isLoading } = useAuction();
    const [timers, setTimers] = useState({});
    const [bidAmount, setBidAmount] = useState(""); // Input state
    const [selectedAuctionId, setSelectedAuctionId] = useState(null); // Track which auction is being bid on

    // Initialize timers
    useEffect(() => {
        if (data) {
            const newTimers = {};
            data.forEach((auction) => {
                const timeLeft = calculateTimeLeft(auction.AuctionDetails.EndTime);
                newTimers[auction.id] = timeLeft;
            });
            setTimers(newTimers);
        }
    }, [data]);

    // Update timers every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) => {
                const updatedTimers = { ...prevTimers };
                Object.keys(updatedTimers).forEach((id) => {
                    const { hours, minutes, seconds } = updatedTimers[id];
                    if (hours === 0 && minutes === 0 && seconds === 0) return;

                    const newTimeLeft = calculateTimeLeft(
                        data.find((a) => a.id === id)?.AuctionDetails.EndTime
                    );
                    updatedTimers[id] = newTimeLeft;
                });
                return updatedTimers;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const auctionData = data || [];

    // Handle Bid Submission
    const handleBidSubmit = async () => {
        print("User on handlebid", user);
        if (!bidAmount || !selectedAuctionId) return;
        const auctionDocRef = doc(db, "Auctions", selectedAuctionId);
        // const auth = getAuth(); // Get the auth instance
        // const user = auth.currentUser; 
        try {
            // Fetch the current auction data
            const auctionSnapshot = await getDoc(auctionDocRef);
            const auctionData = auctionSnapshot.data();
    
            // Check if the new bid is higher than the current highest bid
            const currentHighestBid = auctionData.AuctionDetails.CurrentHighestBid?.BidAmount || 0;
            const newBidAmount = Number(bidAmount);
    
            if (newBidAmount <= currentHighestBid) {
                alert("Your bid must be higher than the current highest bid.");
                return;
            }
    
            const newBid = {
                BidderID: user?.uid || "unknown", // Fallback to 'unknown' if user.id is undefined
                BidAmount: newBidAmount,
                BidTime: new Date().toISOString(),
            };
            
    
            // Update the BidHistory and CurrentHighestBid in Firestore
            await updateDoc(auctionDocRef, {
                "AuctionDetails.BidHistory": arrayUnion(newBid),
                "AuctionDetails.CurrentHighestBid": newBid,
            });
    
            alert("Bid placed successfully!");
            setBidAmount(""); // Reset input
            setSelectedAuctionId(null); // Reset auction selection
        } catch (error) {
            console.error("Error placing bid:", error);

            alert("Failed to place bid.");
        }
    };
    

    return (
        <>
            <div className="flex align-middle font-bold justify-center text-5xl">
                Auction
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 px-5 pt-15 sm:px-10 lg:px-20">
                {auctionData.map((auction) => {
                    const { hours, minutes, seconds } = timers[auction.id] || {};
                    const { CurrentHighestBid, ProductDetails } = auction.AuctionDetails;
                    console.log("AuctionData",auction);
                    
                    return (
                        <CardContainer key={auction.id} className="inter-var sm:p-8">
                            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-3xl p-4 border">
                                {/* Product Image */}
                                <CardItem translateZ="100" className="w-full mt-2">
                                    <Image
                                        src={auction.ProductDetails.ProductImage}
                                        height="1000"
                                        width="1000"
                                        className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                        alt={auction.ProductDetails.ProductName}
                                    />
                                </CardItem>

                                {/* Product Name */}
                                <CardItem
                                    translateZ={20}
                                    className="text-xl font-bold text-neutral-600 dark:text-white text-center mt-4"
                                >
                                    {auction.ProductDetails.ProductName}
                                </CardItem>

                                {/* Product Price */}
                                <CardItem
                                    translateZ={20}
                                    className="text-lg text-gray-700 dark:text-gray-300 text-center mt-2"
                                >
                                    ₹{auction.ProductDetails.ProductPrize}
                                </CardItem>

                                {/* Current Highest Bid */}
                                <div className="text-center text-lg font-bold text-green-500 mt-2">
                                Current Highest Bid: ₹
                               {CurrentHighestBid && CurrentHighestBid.BidAmount ? (
                                     CurrentHighestBid.BidAmount.toLocaleString() // Format the bid amount with commas
                                ) : (
                               "No bids yet"
                               )}
                                </div>


                                {/* Auction Timer */}
                                <div className="text-center text-sm text-red-500 mt-2">
                                    {hours !== undefined &&
                                    minutes !== undefined &&
                                    seconds !== undefined ? (
                                        hours === 0 &&
                                        minutes === 0 &&
                                        seconds === 0 ? (
                                            "Auction Ended"
                                        ) : (
                                            `Time Left: ${hours}h ${minutes}m ${seconds}s`
                                        )
                                    ) : (
                                        "Loading timer..."
                                    )}
                                </div>

                                {/* BID Button */}
                                <div className="mt-4 flex justify-center">
                                    <button
                                        className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition hover:bg-blue-600"
                                        disabled={hours === 0 && minutes === 0 && seconds === 0}
                                        onClick={() => setSelectedAuctionId(auction.id)}
                                    >
                                        BID
                                    </button>
                                </div>

                                {/* Bid Input and Submit */}
                                {selectedAuctionId === auction.id && (
                                    <div className="mt-4">
                                        <input
                                            type="number"
                                            placeholder="Enter your bid"
                                            className="w-full p-2 border rounded mb-2"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                        />
                                        <button
                                            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleBidSubmit}
                                        >
                                            Submit Bid
                                        </button>
                                    </div>
                                )}
                            </CardBody>
                        </CardContainer>
                    );
                })}
            </div>
        </>
    );
}
