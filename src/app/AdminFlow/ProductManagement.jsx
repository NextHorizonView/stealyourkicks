"use client";

import React, { useState } from "react";
import { useProducts } from "../lib/firebase/products/read";
import { addProduct, updateProduct } from "../lib/firebase/products/write";

const ProductManagement = () => {
    const { data, error, isLoading } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        ProductId: "", 
        ProductName: "",
        ProductImage: "",
        ProductPrize: "",
        ProductIsCoupon: false,
        isExclusive: false,
        isResel: false, // Added exclusive field
        ProductSize: [{ SizeName: "", SizeStock: "" }], 
        ProductTotalStock: "0",
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const products = data || [];

    const handleEditProduct = (product) => {
        console.log("Edititng clicked ",editingProduct);
        // console.log("New clicked ",newProduct);
        
        setEditingProduct({
            ...product,
            ProductSize: product.ProductSize || [],
        });
        console.log("New clicked ",editingProduct);

    };

    const handleSaveProduct = async () => {
        console.log("Save Clicked");
        if (editingProduct && editingProduct.ProductId) {
            try {
                const totalStock = editingProduct.ProductSize.reduce(
                    (sum, size) => sum + Number(size.SizeStock),
                    0
                );
                await updateProduct({
                    ...editingProduct,
                });
                setEditingProduct(null); // Exit edit mode
            } catch (error) {
                console.error("Error saving product:", error);
            }
        }
    };

    const handleAddProduct = async () => {
        try {
            const totalStock = newProduct.ProductSize.reduce(
                (sum, size) => sum + Number(size.SizeStock),
                0
            );
            console.log("New Product", newProduct);
            await addProduct({
                ...newProduct,
                ProductTotalStock: totalStock.toString(),
            });
            setNewProduct({
                ProductId: "",
                ProductName: "",
                ProductImage: "",
                ProductPrize: "",
                ProductIsCoupon: false,
                ProductIsExclusive: false, 
                isResel: false, // Reset exclusive field
                // Reset exclusive field
                ProductSize: [{ SizeName: "", SizeStock: "" }],
                ProductTotalStock: "0",
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...newProduct.ProductSize];
        updatedSizes[index][field] = value;
        setNewProduct({ ...newProduct, ProductSize: updatedSizes });
    };

    const addNewSize = () => {
        setNewProduct({
            ...newProduct,
            ProductSize: [...newProduct.ProductSize, { SizeName: "", SizeStock: "" }],
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Products Management</h2>

            {/* Display Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {products.map((product) => (
                    <div key={product.ProductId} className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md">
                        <img
                            src={product.ProductImage}
                            alt={product.ProductName}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{product.ProductName}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Price: {product.ProductPrize}</p>
                            <p className="text-gray-600 dark:text-gray-300">Total Stock: {product.ProductTotalStock}</p>

                            {/* Display sizes and stock */}
                            <div>
                                {product.ProductSize?.length > 0 ? (
                                    product.ProductSize.map((sizeObj, index) => (
                                        <p key={index} className="text-gray-600 dark:text-gray-300">
                                            Size: {sizeObj.SizeName}, Stock: {sizeObj.SizeStock}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">No sizes available</p>
                                )}
                            </div>

                            {/* Display if product is exclusive */}
                            <p className="text-gray-600 dark:text-gray-300">
                                Exclusive: {product.isExclusive ? "Yes" : "No"}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Resell: {product.isResel ? "Yes" : "No"}
                            </p>
                            {/* Display if product has coupons */}
                            {/* <p className="text-gray-600 dark:text-gray-300">
                                Coupons Available: {product.ProductIsCoupon ? "Yes" : "No"}
                            </p> */}

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
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, ProductName: e.target.value })
                            }
                            className="border p-2 rounded"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={editingProduct.ProductPrize}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, ProductPrize: e.target.value })
                            }
                            className="border p-2 rounded"
                            placeholder="Product Price"
                        />

                        {/* Editing Sizes and Stock */}
                        <h4 className="text-lg font-semibold mt-4">Edit Sizeas and Stock</h4>
                        {(editingProduct.ProductSize || []).map((sizeObj, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={sizeObj.SizeName}
                                    onChange={(e) => {
                                        const updatedSizes = [...editingProduct.ProductSize];
                                        updatedSizes[index].SizeName = e.target.value;
                                        setEditingProduct({ ...editingProduct, ProductSize: updatedSizes });
                                    }}
                                    className="border p-2 rounded"
                                    placeholder="Size"
                                />
                                <input
                                    type="number"
                                    value={sizeObj.SizeStock}
                                    onChange={(e) => {
                                        const updatedSizes = [...editingProduct.ProductSize];
                                        updatedSizes[index].SizeStock = e.target.value;
                                        setEditingProduct({ ...editingProduct, ProductSize: updatedSizes });
                                    }}
                                    className="border p-2 rounded"
                                    placeholder="Stock"
                                />
                            </div>
                        ))}

                        {/* Add New Size During Editing */}
                        <button
                            onClick={() => {
                                const updatedSizes = [...editingProduct.ProductSize, { SizeName: "", SizeStock: "" }];
                                setEditingProduct({ ...editingProduct, ProductSize: updatedSizes });
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Add Size
                        </button>

                        {/* Coupons Checkbox for Edit */}
                        <label className="mt-2">
                            <input
                                type="checkbox"
                                checked={editingProduct.ProductIsCoupon}
                                onChange={(e) => setEditingProduct({ ...editingProduct, ProductIsCoupon: e.target.checked })}
                            />
                            {" "}Product Coupons
                        </label>
                        {/* Exclusive Checkbox for Edit */}
                        <label className="mt-2">
                            <input
                                type="checkbox"
                                checked={editingProduct.isExclusive}
                                onChange={(e) => setEditingProduct({ ...editingProduct, isExclusive: e.target.checked })}
                            />
                            {" "}Exclusive
                        </label>
                        <label className="mt-2">
                        <input
                            type="checkbox"
                            checked={editingProduct.isResel}
                            onChange={(e) => setEditingProduct({ ...editingProduct, isResel: e.target.checked })}
                        />
                        {" "}Resel Product
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
                    {newProduct.ProductSize.map((sizeObj, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={sizeObj.SizeName}
                                onChange={(e) => handleSizeChange(index, "SizeName", e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Size"
                            />
                            <input
                                type="number"
                                value={sizeObj.SizeStock}
                                onChange={(e) => handleSizeChange(index, "SizeStock", e.target.value)}
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
                            checked={newProduct.ProductIsCoupon}
                            onChange={(e) => setNewProduct({ ...newProduct, ProductIsCoupon: e.target.checked })}
                        />
                        {" "}Product Coupons
                    </label>

                    {/* Exclusive Checkbox for Add New Product */}
                    <label className="mt-2">
                        <input
                            type="checkbox"
                            checked={newProduct.isExclusive}
                            onChange={(e) => setNewProduct({ ...newProduct, ProductIsExclusive: e.target.checked })}
                        />
                        {" "}Exclusive
                    </label>
                    <label className="mt-2">
                        <input
                            type="checkbox"
                            checked={newProduct.isResel}
                            onChange={(e) => setNewProduct({ ...newProduct, isResel: e.target.checked })}
                        />
                        {" "}Resell Product
                    </label>
                    <button
                        onClick={handleAddProduct}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
