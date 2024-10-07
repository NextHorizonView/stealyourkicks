// src/lib/firebase/products/productService.js

import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase"; // Import Firestore instance
import { db } from "../../firebase";
// Function to add a new product
export const addProduct = async (product) => {
    try {
        await addDoc(collection(db, "Products"), {
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrize: product.ProductPrize,
            ProductTotalStock: product.ProductTotalStock, // Ensure stock is a number
        });
    } catch (error) {
        console.error("Error adding product:", error);
        
        throw error;
    }
};

// Function to update an existing product
export const updateProduct = async (product) => {
    try {
        const productRef = doc(db, "Products", product.id);
        await updateDoc(productRef, {
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrize: product.ProductPrize,
            ProductTotalStock: product.ProductTotalStock, // Ensure stock is a number
        });
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};
