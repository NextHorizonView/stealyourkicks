import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Import Firestore instance

// Function to add a new product with sizes
export const addProduct = async (product) => {
    try {
        if (!product.ProductSize || !Array.isArray(product.ProductSize)) {
            throw new Error("ProductSize is undefined or not an array");
        }

        // Ensure that all sizes have valid names and stock
        const validatedSizes = product.ProductSize.map(size => ({
            SizeName: size.SizeName || "Unknown", // Use fallback if size name is missing
            SizeStock: size.SizeStock ? Number(size.SizeStock) : 0, // Default stock to 0 if missing
        }));

        await addDoc(collection(db, "Products"), {
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrize: product.ProductPrize,
            ProductTotalStock: product.ProductTotalStock, 
            ProductSize: validatedSizes,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};


// Function to update an existing product with sizes
export const updateProduct = async (product) => {
    try {
        if (!product.ProductName) throw new Error("ProductName is required");
        if (!product.ProductImage) throw new Error("ProductImage is required");
        if (typeof product.ProductPrize === 'undefined') throw new Error("ProductPrize is required");
        if (typeof product.ProductTotalStock === 'undefined') throw new Error("ProductTotalStock is required");

        // Validate sizes, ensuring non-empty names and valid stock values
        const validatedSizes = product.ProductSize.map(size => ({
            SizeName: size.SizeName || "Unknown", // Use fallback if size name is missing
            SizeStock: size.SizeStock ? Number(size.SizeStock) : 0, // Default stock to 0 if missing
        }));

        const productRef = doc(db, "Products", product.id);
        await updateDoc(productRef, {
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrize: product.ProductPrize,
            ProductTotalStock: product.ProductTotalStock,
            ProductSize: validatedSizes,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        throw error;
    }
};


