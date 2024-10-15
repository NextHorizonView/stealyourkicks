import { doc, setDoc, arrayUnion, Timestamp } from "firebase/firestore"; 
import { db } from "../../firebase"; // Make sure to import your Firestore db instance

export const addProductToCart = async (userId, product) => {
    const cartDocRef = doc(db, "Carts", userId); // Reference to the user's cart document

    // Create the cart item
    const cartItem = {
        ProductId: product.ProductId,
        ProductName: product.ProductName,
        ProductImage: product.ProductImage,
        ProductPrize: product.ProductPrize,
        ProductQuantity: "1",
        ProductSize: product.ProductSize // Amount to add (e.g., 1)
    };

    try {
        // Add item to the cart (create if doesn't exist)
        await setDoc(cartDocRef, {
            userId: userId,
            createdAt: Timestamp.fromDate(new Date()), // Set current time
            items: arrayUnion(cartItem) // Add item to the items array
        }, { merge: true }); // Use merge to update existing documents

        alert("Item added to cart successfully!");
    } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart.");
    }
};