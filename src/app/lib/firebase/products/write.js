import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore";
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

        // Add the product to Firestore and get the document reference
        const productRef = await addDoc(collection(db, "Products"), {
            ProductName: product.ProductName,
            ProductImage: product.ProductImage,
            ProductPrize: product.ProductPrize,
            ProductTotalStock: product.ProductTotalStock, 
            ProductSize: validatedSizes,
            ProductIsCoupon: product.ProductIsCoupon,
            isExclusive: product.isExclusive,
            isResel: product.isResel,
        });

        // Update the document with the ProductId (document ID)
        await updateDoc(doc(db, "Products", productRef.id), {
            ProductId: productRef.id,
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
            ProductIsCoupon: product.ProductIsCoupon,
            isExclusive: product.isExclusive,
            isResel: product.isResel,
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        throw error;
    }
};

export const updateProductStock = async (productId, sizeName, newStock) => {
    try {
        // Reference to the product document
        const productRef = doc(db, "Products", productId);
        
        // Retrieve the current product document
        const productDoc = await getDoc(productRef);
        if (!productDoc.exists()) {
            throw new Error("Product not found");
        }

        // Get the current ProductSize array
        const productData = productDoc.data();
        const currentSizes = productData.ProductSize || [];

        // Update the stock for the specific size
        const updatedSizes = currentSizes.map(size => {
            if (size.SizeName === sizeName) {
                return { ...size, SizeStock: newStock }; // Update the size stock
            }
            return size; // Keep other sizes unchanged
        });

        // Update the product document with the new ProductSize array
        await updateDoc(productRef, {
            ProductSize: updatedSizes
        });
    } catch (error) {
        console.error("Error updating product stock:", error);
        throw error;
    }
};