"use client";

import React, { useState } from "react";

const AuctionManagement = () => {
  const [newAuction, setNewAuction] = useState({
    auctionName: "",
    auctionImage: "",
    startingPrice: "",
    auctionTime: 0, // in minutes
    bidders: [], // Later to be populated with bidder data
    winner: null, // Will hold the winner's information
  });

  const [auctions, setAuctions] = useState([]);
  const [editingAuction, setEditingAuction] = useState(null);

  // Function to add a new auction
  const handleAddAuction = () => {
    setAuctions([...auctions, newAuction]);
    setNewAuction({
      auctionName: "",
      auctionImage: "",
      startingPrice: "",
      auctionTime: 0,
      bidders: [],
      winner: null,
    });
  };

  // Function to handle editing an auction
  const handleEditAuction = (auction) => {
    setEditingAuction(auction);
  };

  // Function to save the edited auction
  const handleSaveEditedAuction = () => {
    setAuctions((prev) =>
      prev.map((a) => (a === editingAuction ? editingAuction : a))
    );
    setEditingAuction(null);
  };

  // Function to confirm a winner for an auction
  const handleConfirmWinner = (auction, winner) => {
    setAuctions((prev) =>
      prev.map((a) => (a === auction ? { ...a, winner: winner } : a))
    );
  };

  // Function to delete an auction
  const handleDeleteAuction = (auctionToDelete) => {
    setAuctions(auctions.filter((auction) => auction !== auctionToDelete));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Auction Management</h2>

      {/* Add New Auction */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold">Add New Auction</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newAuction.auctionName}
            onChange={(e) =>
              setNewAuction({ ...newAuction, auctionName: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Auction Name"
          />
          <input
            type="text"
            value={newAuction.auctionImage}
            onChange={(e) =>
              setNewAuction({ ...newAuction, auctionImage: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Auction Image URL"
          />
          <input
            type="number"
            value={newAuction.startingPrice}
            onChange={(e) =>
              setNewAuction({ ...newAuction, startingPrice: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Starting Price"
          />
          <input
            type="number"
            value={newAuction.auctionTime}
            onChange={(e) =>
              setNewAuction({ ...newAuction, auctionTime: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Auction Time (minutes)"
          />
          <button
            onClick={handleAddAuction}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Auction
          </button>
        </div>
      </div>

      {/* Display Auctions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md"
          >
            <img
              src={auction.auctionImage}
              alt={auction.auctionName}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="font-bold text-xl">{auction.auctionName}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Starting Price: {auction.startingPrice}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Time: {auction.auctionTime} minutes
              </p>

              {auction.winner ? (
                <p className="text-green-500 font-semibold">
                  Winner: {auction.winner}
                </p>
              ) : (
                <p className="text-red-500 font-semibold">No winner yet</p>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEditAuction(auction)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteAuction(auction)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>

              {!auction.winner && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter winner name"
                    onChange={(e) =>
                      setEditingAuction({ ...auction, winner: e.target.value })
                    }
                    className="border p-2 rounded mb-2"
                  />
                  <button
                    onClick={() =>
                      handleConfirmWinner(auction, editingAuction?.winner)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Confirm Winner
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Auction */}
      {editingAuction && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold">Edit Auction</h3>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editingAuction.auctionName}
              onChange={(e) =>
                setEditingAuction({
                  ...editingAuction,
                  auctionName: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="Auction Name"
            />
            <input
              type="text"
              value={editingAuction.auctionImage}
              onChange={(e) =>
                setEditingAuction({
                  ...editingAuction,
                  auctionImage: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="Auction Image URL"
            />
            <input
              type="number"
              value={editingAuction.startingPrice}
              onChange={(e) =>
                setEditingAuction({
                  ...editingAuction,
                  startingPrice: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="Starting Price"
            />
            <input
              type="number"
              value={editingAuction.auctionTime}
              onChange={(e) =>
                setEditingAuction({
                  ...editingAuction,
                  auctionTime: e.target.value,
                })
              }
              className="border p-2 rounded"
              placeholder="Auction Time (minutes)"
            />

            <button
              onClick={handleSaveEditedAuction}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Save Auction
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionManagement;
