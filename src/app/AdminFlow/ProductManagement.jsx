"use client";

import React, { useState } from "react";
import { useProducts } from "../lib/firebase/products/read";
// import { addProduct, updateProduct } from "../lib/firebase/products/productService"; // Import Firestore functions
import { addProduct,updateProduct } from "../lib/firebase/products/write";
//TODO: Need to modify the add and update the product as per the structure
const ProductManagement = () => {
    const { data, error, isLoading } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null); 
    const [newProduct, setNewProduct] = useState({ ProductName: "", ProductImage: "", ProductPrize: "", ProductTotalStock: "" });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const products = data || [];

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = async () => {
        if (editingProduct && editingProduct.id) {
            try {
                await updateProduct(editingProduct); // Update product in Firestore
                setEditingProduct(null); // Exit edit mode
            } catch (error) {
                console.error("Error saving product:", error);
            }
        }
    };

    const handleAddProduct = async () => {
        try {
            await addProduct(newProduct); // Add product to Firestore
            setNewProduct({ ProductName: "", ProductImage: "", ProductPrize: "", ProductTotalStock: "" }); // Reset form
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Products Management</h2>

            {/* Display Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {products.map((product) => (
                    <div key={product.id} className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md">
                        <img
                            src={product.ProductImage}
                            alt={product.ProductName}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{product.ProductName}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Price: {product.ProductPrize}</p>
                            <p className="text-gray-600 dark:text-gray-300">Stock: {product.ProductTotalStock}</p>

                            <button
                                onClick={() => handleEditProduct(product)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Editing Product */}
            {editingProduct && (
                <div className="mb-10">
                    <h3 className="text-xl font-semibold">Edit Product</h3>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={editingProduct.ProductName}
                            onChange={(e) => setEditingProduct({ ...editingProduct, ProductName: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={editingProduct.ProductPrize}
                            onChange={(e) => setEditingProduct({ ...editingProduct, ProductPrize: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Price"
                        />
                        <input
                            type="number"
                            value={editingProduct.ProductTotalStock}
                            onChange={(e) => setEditingProduct({ ...editingProduct, ProductTotalStock: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Stock"
                        />
                        <button
                            onClick={handleSaveProduct}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Add New Product */}
            <div>
                <h3 className="text-xl font-semibold">Add New Product</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newProduct.ProductName}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductName: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Name"
                    />
                    <input
                        type="text"
                        value={newProduct.ProductImage}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductImage: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Image URL"
                    />
                    <input
                        type="text"
                        value={newProduct.ProductPrize}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductPrize: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Price"
                    />
                    <input
                        type="number"
                        value={newProduct.ProductTotalStock}
                        onChange={(e) => setNewProduct({ ...newProduct, ProductTotalStock: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Stock"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
