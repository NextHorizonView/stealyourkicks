import { addDoc, collection, updateDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // Import Firestore instance

export const addProductToAuction = async (product,sizeName) => {
  try {
    console.log("product at auction:", product);

    // Check if the product already exists in the auction collection
    const auctionQuery = query(
      collection(db, "Auctions"),
      where("ProductDetails.ProductId", "==", product.ProductId)
    );
    const auctionSnapshot = await getDocs(auctionQuery);

    // If the product is already in an auction, do not create a new auction
    if (!auctionSnapshot.empty) {
      console.log(`Product with ID ${product.ProductId} already exists in auction.`);
      return; // Exit the function if the product is already in auction
    }

    // Set start and end times for the auction (1 day duration)
    const now = new Date();
    const startTime = now.toISOString(); // Current time in ISO format
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(); // 1 day from now

    // Ensure valid size data
    const validatedSizes = product.ProductSize.map((size) => ({
      SizeName: size.SizeName || "Unknown", // Default size name if missing
      SizeStock: size.SizeStock ? Number(size.SizeStock) : 0, // Default stock to 0 if missing
    }));

    // Create the auction document
    const auctionData = {
      ProductDetails: {
        ProductId: product.ProductId,
        ProductName: product.ProductName,
        ProductImage: product.ProductImage,
        ProductPrize: product.ProductPrize,
        ProductTotalStock: product.ProductTotalStock,
        ProductSize: sizeName,
      },
      AuctionDetails: {
        StartTime: startTime,
        EndTime: endTime,
        CurrentHighestBid: null, // No bids ye t
        BidHistory: [],
        Winner: null,
      },
    };

    // Add the auction document to the "Auctions" collection
    await addDoc(collection(db, "Auctions"), auctionData);
    console.log(`Auction created successfully for product ID ${product.ProductId}`);
  } catch (error) {
    console.error("Error adding product to auction:", error);
    throw error;
  }
};
