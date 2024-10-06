"use client";

import React, { useState } from "react";

// Product Management Component
const ProductManagement = () => {

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Nike Air Max 270",
            image: "https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
            price: "$150",
            stock: 20,
        },
        {
            id: 2,
            name: "Adidas Ultraboost",
            image: "https://image.goat.com/375/attachments/product_template_pictures/images/011/119/994/original/218099_00.png.png",
            price: "$180",
            stock: 15,
        },

    ]);

    const [editingProduct, setEditingProduct] = useState(null); 
    const [newProduct, setNewProduct] = useState({ name: "", image: "", price: "", stock: "" });

    // Functions to handle form updates and submit
    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = () => {
        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null); // Exit edit mode
    };

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ name: "", image: "", price: "", stock: "" });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Products Management</h2>

            {/* Display Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {products.map((product) => (
                    <div key={product.id} className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{product.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Price: {product.price}</p>
                            <p className="text-gray-600 dark:text-gray-300">Stock: {product.stock}</p>

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
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Price"
                        />
                        <input
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
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
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Name"
                    />
                    <input
                        type="text"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Image URL"
                    />
                    <input
                        type="text"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Price"
                    />
                    <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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
