// "use client";
import { db } from '../../firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useSWRSubscription from 'swr/subscription';

// Hook to fetch real-time auction list
export function useAuction() {
  const { data, error } = useSWRSubscription(['Auctions'], ([path], { next }) => {
    const ref = collection(db, path);

    const unsub = onSnapshot(
      ref,
      (snaps) => {
        const auctionData = snaps.docs.map((doc) => ({
          id: doc.id,
          ProductDetails: {
            ProductId: doc.data().ProductDetails?.ProductId,
            ProductName: doc.data().ProductDetails?.ProductName,
            ProductImage: doc.data().ProductDetails?.ProductImage,
            ProductPrize: doc.data().ProductDetails?.ProductPrize,
            ProductTotalStock: doc.data().ProductDetails?.ProductTotalStock,
            ProductSize: doc.data().ProductDetails?.ProductSize,
          },
          AuctionDetails: {
            StartTime: doc.data().AuctionDetails?.StartTime,
            EndTime: doc.data().AuctionDetails?.EndTime,
            CurrentHighestBid: doc.data().AuctionDetails?.CurrentHighestBid,
            BidHistory: doc.data().AuctionDetails?.BidHistory,
            Winner: doc.data().AuctionDetails?.Winner,
          },
        }));

        console.log('Fetched auctions:', auctionData); // Check the fetched data
        next(null, auctionData); // Pass the data to SWR
      },
      (error) => {
        console.error('Error fetching auctions:', error.message || error); // Log error if any
        next(error?.message || 'Error fetching auctions');
      }
    );

    return () => unsub(); // Unsubscribe from updates on unmount
  });

  console.log('Data:', data); // Check if data is being returned
  // console.log('Error:', error); // Check if there's any error

  return {
    data,
    error,
    isLoading: data === undefined,
  };
}

// Function to fetch a single auction by ID
export const getAuctionById = async (id) => {
  console.log(`Fetching auction with ID: ${id}`); // Log the ID being fetched

  try {
    const auctionDoc = await getDoc(doc(db, `Auctions/${id}`));

    if (auctionDoc.exists()) {
      console.log('Auction data:', auctionDoc.data()); // Log the auction data if it exists
      return auctionDoc.data(); // Return the auction data
    } else {
      console.log('No such auction!'); // Log if the auction does not exist
      return null; // Return null if no document was found
    }
  } catch (error) {
    console.error('Error fetching auction:', error); // Log any errors that occur
    return null; // Return null on error
  }
};
