"use client";
import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore"; 
import { useAuction } from "../lib/firebase/auction/read";

const initialAuctionState = {
  ProductName: "",
  ProductImage: "",
  ProductPrize: "",
  ProductTotalStock: "",
  StartTime: "",
  EndTime: "",
  CurrentHighestBid: {
    BidAmount: 0,
    BidderID: null,
  },
  BidHistory: [],
  Winner: null,
};

const AuctionManagement = () => {
  const { data: auctions, error, isLoading } = useAuction();
  const [newAuction, setNewAuction] = useState(initialAuctionState);
  const [editingAuction, setEditingAuction] = useState(null); // Track editing state

  // Handle adding a new auction
  const handleAddAuction = async () => {
    try {
      await addDoc(collection(db, "Auctions"), {
        ProductDetails: {
          ProductName: newAuction.ProductName,
          ProductImage: newAuction.ProductImage,
          ProductPrize: newAuction.ProductPrize,
          ProductTotalStock: newAuction.ProductTotalStock,
        },
        AuctionDetails: {
          StartTime: newAuction.StartTime,
          EndTime: newAuction.EndTime,
          CurrentHighestBid: newAuction.CurrentHighestBid,
          BidHistory: newAuction.BidHistory,
          Winner: newAuction.Winner,
        },
      });
      setNewAuction(initialAuctionState);
    } catch (error) {
      console.error("Error adding auction:", error);
    }
  };

  // Handle editing an auction
  const handleEditAuction = (auction) => {
    setEditingAuction(auction);
    setNewAuction({
      ProductName: auction.ProductDetails.ProductName,
      ProductImage: auction.ProductDetails.ProductImage,
      ProductPrize: auction.ProductDetails.ProductPrize,
      ProductTotalStock: auction.ProductDetails.ProductTotalStock,
      StartTime: auction.AuctionDetails.StartTime, // Populate StartTime
      EndTime: auction.AuctionDetails.EndTime,     // Populate EndTime
      CurrentHighestBid: auction.AuctionDetails.CurrentHighestBid,
      BidHistory: auction.AuctionDetails.BidHistory,
      Winner: auction.AuctionDetails.Winner,
    });
  };

  const handleUpdateAuction = async () => {
    try {
      const auctionRef = doc(db, "Auctions", editingAuction.id);
      await updateDoc(auctionRef, {
        ProductDetails: {
          ProductName: newAuction.ProductName,
          ProductImage: newAuction.ProductImage,
          ProductPrize: newAuction.ProductPrize,
          ProductTotalStock: newAuction.ProductTotalStock,
        },
        AuctionDetails: {
          StartTime: newAuction.StartTime,
          EndTime: newAuction.EndTime,
          CurrentHighestBid: newAuction.CurrentHighestBid,
          BidHistory: newAuction.BidHistory,
          Winner: newAuction.Winner,
        },
      });
      setEditingAuction(null);
      setNewAuction(initialAuctionState);
    } catch (error) {
      console.error("Error updating auction:", error);
    }
  };

  // Handle selecting the highest bidder as the winner
  const handleConfirmWinner = async (auction) => {
    const highestBidder = getHighestBidder(auction.AuctionDetails.BidHistory);
    if (!highestBidder) return alert("No bids available to select a winner!");

    try {
      const auctionRef = doc(db, "Auctions", auction.id);
      await updateDoc(auctionRef, {
        "AuctionDetails.Winner": highestBidder.BidderID,
      });
    } catch (error) {
      console.error("Error confirming winner:", error);
    }
  };

  // Helper function to get the highest bidder from the BidHistory
  const getHighestBidder = (bidHistory) => {
    if (!bidHistory || bidHistory.length === 0) return null;

    const highestBid = bidHistory.reduce((max, bid) =>
      bid.BidAmount > max.BidAmount ? bid : max
    );

    return highestBid; // { BidderID: 'Odur...', BidAmount: 110000 }
  };

  // Handle deleting an auction
  const handleDeleteAuction = async (auctionId) => {
    try {
      await deleteDoc(doc(db, "Auctions", auctionId));
    } catch (error) {
      console.error("Error deleting auction:", error);
    }
  };

  if (isLoading) return <p>Loading auctions...</p>;
  if (error) return <p>Error loading auctions: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Auction Management</h2>

      {/* Add or Edit Auction */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold">
          {editingAuction ? "Edit Auction" : "Add New Auction"}
        </h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newAuction.ProductName}
            onChange={(e) =>
              setNewAuction({ ...newAuction, ProductName: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Product Name"
          />
          <input
            type="text"
            value={newAuction.ProductImage}
            onChange={(e) =>
              setNewAuction({ ...newAuction, ProductImage: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Product Image URL"
          />
          <input
            type="number"
            value={newAuction.ProductPrize}
            onChange={(e) =>
              setNewAuction({ ...newAuction, ProductPrize: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Product Prize"
          />
          <input
            type="number"
            value={newAuction.ProductTotalStock}
            onChange={(e) =>
              setNewAuction({ ...newAuction, ProductTotalStock: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Total Stock"
          />
          <input
            type="datetime-local"
            value={newAuction.StartTime}
            onChange={(e) =>
              setNewAuction({ ...newAuction, StartTime: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Start Time"
          />
          <input
            type="datetime-local"
            value={newAuction.EndTime}
            onChange={(e) =>
              setNewAuction({ ...newAuction, EndTime: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="End Time"
          />
          <button
            onClick={editingAuction ? handleUpdateAuction : handleAddAuction}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            {editingAuction ? "Update Auction" : "Add Auction"}
          </button>
        </div>
      </div>

      {/* Display Auctions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md"
          >
            <img
              src={auction.ProductDetails.ProductImage}
              alt={auction.ProductDetails.ProductName}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="font-bold text-xl">
                {auction.ProductDetails.ProductName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Prize: {auction.ProductDetails.ProductPrize}
              </p>
              <p>Start: {auction.AuctionDetails.StartTime}</p>
              <p>End: {auction.AuctionDetails.EndTime}</p>

              {auction.AuctionDetails.Winner ? (
                <p className="text-green-500 font-semibold">
                  Winner: {auction.AuctionDetails.Winner}
                </p>
              ) : (
                <p className="text-red-500 font-semibold">No winner yet</p>
              )}

              <div className="mt-4">
                <button
                  onClick={() => handleConfirmWinner(auction)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm Winner
                </button>
                <button
                  onClick={() => handleEditAuction(auction)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAuction(auction.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionManagement;
