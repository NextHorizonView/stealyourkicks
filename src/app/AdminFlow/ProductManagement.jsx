"use client";

import React, { useState } from "react";
import { useProducts } from "../lib/firebase/products/read";
import { addProduct, updateProduct } from "../lib/firebase/products/write";

const ProductManagement = () => {
    const { data, error, isLoading } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        ProductName: "",
        ProductImage: "",
        ProductPrize: "",
        ProductSizes: [{ size: "", stock: "" }],
        hasCoupons: false, // New state property for coupons
    });

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
            setNewProduct({
                ProductName: "",
                ProductImage: "",
                ProductPrize: "",
                ProductSizes: [{ size: "", stock: "" }],
                hasCoupons: false, // Reset form including the checkbox
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...newProduct.ProductSizes];
        updatedSizes[index][field] = value;
        setNewProduct({ ...newProduct, ProductSizes: updatedSizes });
    };

    const addNewSize = () => {
        setNewProduct({
            ...newProduct,
            ProductSizes: [...newProduct.ProductSizes, { size: "", stock: "" }],
        });
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

                            {/* Display sizes and stock */}
                            <div>
                                {product.ProductSizes?.length > 0 ? (
                                    product.ProductSizes.map((sizeObj, index) => (
                                        <p key={index} className="text-gray-600 dark:text-gray-300">
                                            Size: {sizeObj.size}, Stock: {sizeObj.stock}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">No sizes available</p>
                                )}
                            </div>

                            {/* Display if product has coupons */}
                            <p className="text-gray-600 dark:text-gray-300">
                                Coupons Available: {product.hasCoupons ? "Yes" : "No"}
                            </p>

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

            {/* Edit Product */}
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

                        {/* Editing Sizes and Stock */}
                        <h4 className="text-lg font-semibold mt-4">Edit Sizes and Stock</h4>
                        {(editingProduct.ProductSizes || []).map((sizeObj, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={sizeObj.size}
                                    onChange={(e) => {
                                        const updatedSizes = [...(editingProduct.ProductSizes || [])];
                                        updatedSizes[index].size = e.target.value;
                                        setEditingProduct({ ...editingProduct, ProductSizes: updatedSizes });
                                    }}
                                    className="border p-2 rounded"
                                    placeholder="Size"
                                />
                                <input
                                    type="number"
                                    value={sizeObj.stock}
                                    onChange={(e) => {
                                        const updatedSizes = [...(editingProduct.ProductSizes || [])];
                                        updatedSizes[index].stock = e.target.value;
                                        setEditingProduct({ ...editingProduct, ProductSizes: updatedSizes });
                                    }}
                                    className="border p-2 rounded"
                                    placeholder="Stock"
                                />
                            </div>
                        ))}

                        {/* Add New Size and Stock During Editing */}
                        <button
                            onClick={() => {
                                const updatedSizes = [...(editingProduct.ProductSizes || []), { size: "", stock: "" }];
                                setEditingProduct({ ...editingProduct, ProductSizes: updatedSizes });
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Add Size
                        </button>

                        {/* Coupons Checkbox for Edit */}
                        <label className="mt-2">
                            <input
                                type="checkbox"
                                checked={editingProduct.hasCoupons}
                                onChange={(e) => setEditingProduct({ ...editingProduct, hasCoupons: e.target.checked })}
                            />
                            {" "}Product Coupons
                        </label>

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

                    {/* Product Sizes Input */}
                    {newProduct.ProductSizes.map((sizeObj, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={sizeObj.size}
                                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Size"
                            />
                            <input
                                type="number"
                                value={sizeObj.stock}
                                onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Stock"
                            />
                        </div>
                    ))}

                    <button
                        onClick={addNewSize}
                        className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Add Size
                    </button>

                    {/* Coupons Checkbox for Add New Product */}
                    <label className="mt-2">
                        <input
                            type="checkbox"
                            checked={newProduct.hasCoupons}
                            onChange={(e) => setNewProduct({ ...newProduct, hasCoupons: e.target.checked })}
                        />
                        {" "}Product Coupons
                    </label>

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
