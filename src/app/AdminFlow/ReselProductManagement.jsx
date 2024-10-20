"use client";

import React, { useState } from "react";
import { addProduct, updateProduct } from "../lib/firebase/products/write";
import { useResel } from "../lib/firebase/reselling/read";
import { doc, updateDoc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(); // Initialize Firestore

const ReselProductManagement = () => {
    const { data, error, isLoading } = useResel();
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        ProductId: "",
        ProductName: "",
        ProductImage: "",
        ProductPrize: "",
        ProductIsCoupon: false,
        ProductIsExclusive: false,
        ProductSize: [{ SizeName: "", SizeStock: "" }],
        ProductTotalStock: "0",
        status: "Pending", // Default status
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log("Data at selling",data);
    
    const products = data || [];
    console.log("Products Data at reselling ", products);
    
    const handleEditProduct = (product) => {
        setEditingProduct({
            ...product,
            ProductSize: product.ProductSize || [],
        });
    };

    const handleSaveProduct = async () => {
        if (editingProduct && editingProduct.ProductId) {
            try {
                const totalStock = editingProduct.ProductSize.reduce(
                    (sum, size) => sum + Number(size.SizeStock),
                    0
                );
                await updateProduct({
                    ...editingProduct,
                    ProductTotalStock: totalStock.toString(),
                });
                setEditingProduct(null); // Exit edit mode
            } catch (error) {
                console.error("Error saving product:", error);
            }
        }
    };

    const handleApprove = async (product) => {
        try {
            const totalStock = product.ProductSize.reduce(
                (sum, size) => sum + Number(size.SizeStock),
                0
            );

            const newProductDoc = {
                ...product,
                ProductTotalStock: totalStock.toString(),
                status: "Approved", // Mark as approved
            };

            // Create the product in the "Products" collection
            await setDoc(doc(db, "Products", product.ProductId), newProductDoc);
            console.log(`Product ${product.ProductName} approved and added.`);
        } catch (error) {
            console.error("Error approving product:", error);
        }
    };

    const handleReject = async (productId) => {
        try {
            const productRef = doc(db, "Selling", productId);
            await updateDoc(productRef, { status: "Rejected" });

            console.log(`Product ${productId} marked as Rejected.`);
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Resell Management</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {products.map((product) => (
                    <div
                        key={product.ProductId}
                        className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md"
                    >
                        <img
                            src={product.ProductImage}
                            alt={product.ProductName}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{product.ProductName}</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Price: {product.ProductPrize}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Total Stock: {product.ProductTotalStock}
                            </p>

                            <div>
                                {product.ProductSize?.length > 0 ? (
                                    product.ProductSize.map((sizeObj, index) => (
                                        <p
                                            key={index}
                                            className="text-gray-600 dark:text-gray-300"
                                        >
                                            Size: {sizeObj.SizeName}, Stock:{" "}
                                            {sizeObj.SizeStock}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">
                                        No sizes available
                                    </p>
                                )}
                            </div>

                            <p className="text-gray-600 dark:text-gray-300">
                                Exclusive: {product.ProductIsExclusive ? "Yes" : "No"}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Coupons Available: {product.ProductIsCoupon ? "Yes" : "No"}
                            </p>

                            {/* Status Display */}
                            <p className={`mt-2 font-semibold  ${product.status == "Rejected" ? "text-red-500" : "text-green-500"}`}>
                                Status: {product.status}
                            </p>

                            <button
                                onClick={() => handleEditProduct(product)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>

                            {product.status === "Pending" && (
                                <>
                                    <button
                                        onClick={() => handleApprove(product)}
                                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleReject(product.ProductId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReselProductManagement;
