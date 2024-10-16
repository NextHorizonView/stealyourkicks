"use client";

import React, { useState, useEffect } from "react";
import { useOrders } from "../lib/firebase/orders/read";
import { updateOrderInFirestore } from "../lib/firebase/orders/write"; // Import your update function

// Order Management Component
const OrderManagement = () => {
    const { data, loading, error } = useOrders(); // Fetch orders from Firestore
    const [orders, setOrders] = useState(data || []);
    const [editingOrder, setEditingOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({
        OrderId: "",
        AddressId: "",
        OrderStatus: "Pending",
        OrderTime: new Date().toISOString(),
        OrderUserId: "",
        ProductId: "",
        ProductImage: "",
        ProductIsCoupon: false,
        ProductName: "",
        ProductPrize: "",
        ProductSize: "",
    });

    useEffect(() => {
        if (data) {
            setOrders(data);
        }
    }, [data]);

    // Functions to handle form updates and submit
    const handleEditOrder = (order) => {
        setEditingOrder(order);
    };

    const handleSaveOrder = async () => {
        // Update order in Firestore
        await updateOrderInFirestore(editingOrder.OrderId, editingOrder);
        
        const updatedOrders = orders.map((order) =>
            order.OrderId === editingOrder.OrderId ? editingOrder : order
        );
        setOrders(updatedOrders);
        setEditingOrder(null); // Exit edit mode
    };

    const handleAddOrder = () => {
        setOrders([...orders, { ...newOrder }]);
        setNewOrder({
            OrderId: "",
            AddressId: "",
            OrderStatus: "Pending",
            OrderTime: new Date().toISOString(),
            OrderUserId: "",
            ProductId: "",
            ProductImage: "",
            ProductIsCoupon: false,
            ProductName: "",
            ProductPrize: "",
            ProductSize: "",
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>

            {/* Display Orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading orders: {error.message}</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.OrderId} className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md">
                            <img src={order.ProductImage} alt={order.ProductName} className="w-full h-auto mb-2 rounded" />
                            <div className="mt-4">
                                <h3 className="font-bold text-xl">{order.ProductName}</h3>
                                <p className="text-gray-600 dark:text-gray-300">Order ID: {order.OrderId}</p>
                                <p className="text-gray-600 dark:text-gray-300">Status: {order.OrderStatus}</p>
                                <p className="text-gray-600 dark:text-gray-300">Price: {order.ProductPrize}</p>
                                <button
                                    onClick={() => handleEditOrder(order)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Editing Order */}
            {editingOrder && (
                <div className="mb-10">
                    <h3 className="text-xl font-semibold">Edit Order</h3>
                    <div className="flex flex-col gap-2">
                        <img src={editingOrder.ProductImage} alt={editingOrder.ProductName} className="w-full h-auto mb-2 rounded" />
                        <input
                            type="text"
                            value={editingOrder.ProductName}
                            onChange={(e) => setEditingOrder({ ...editingOrder, ProductName: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={editingOrder.OrderId}
                            onChange={(e) => setEditingOrder({ ...editingOrder, OrderId: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Order ID"
                            readOnly
                        />
                        <input
                            type="text"
                            value={editingOrder.AddressId}
                            onChange={(e) => setEditingOrder({ ...editingOrder, AddressId: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Address ID"
                        />
                        <select
                            value={editingOrder.OrderStatus}
                            onChange={(e) => setEditingOrder({ ...editingOrder, OrderStatus: e.target.value })}
                            className="border p-2 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Packed">Packed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                        </select>
                        <input
                            type="text"
                            value={editingOrder.ProductPrize}
                            onChange={(e) => setEditingOrder({ ...editingOrder, ProductPrize: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="Product Price"
                        />
                        <button
                            onClick={handleSaveOrder}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Add New Order */}
            <div>
                <h3 className="text-xl font-semibold">Add New Order</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newOrder.ProductName}
                        onChange={(e) => setNewOrder({ ...newOrder, ProductName: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Name"
                    />
                    <input
                        type="text"
                        value={newOrder.OrderId}
                        onChange={(e) => setNewOrder({ ...newOrder, OrderId: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Order ID"
                    />
                    <input
                        type="text"
                        value={newOrder.AddressId}
                        onChange={(e) => setNewOrder({ ...newOrder, AddressId: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Address ID"
                    />
                    <input
                        type="text"
                        value={newOrder.OrderStatus}
                        onChange={(e) => setNewOrder({ ...newOrder, OrderStatus: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Order Status"
                    />
                    <input
                        type="text"
                        value={newOrder.ProductPrize}
                        onChange={(e) => setNewOrder({ ...newOrder, ProductPrize: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="Product Price"
                    />
                    <button
                        onClick={handleAddOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Add Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
