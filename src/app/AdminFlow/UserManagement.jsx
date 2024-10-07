"use client";

import React, { useState } from "react";

// User Management Component
const UserManagement = () => {
    // Example user data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
        },
        // Add more users as needed
    ]);

    const [editingUser, setEditingUser] = useState(null); // State for editing a user
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

    // Functions to handle form updates and submit
    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = () => {
        const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? editingUser : user
        );
        setUsers(updatedUsers);
        setEditingUser(null); // Exit edit mode
    };

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: "", email: "", role: "" });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Display Users */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {users.map((user) => (
                    <div key={user.id} className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md">
                        <div className="mt-4">
                            <h3 className="font-bold text-xl">{user.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">Email: {user.email}</p>
                            <p className="text-gray-600 dark:text-gray-300">Role: {user.role}</p>

                            <button
                                onClick={() => handleEditUser(user)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Editing User */}
            {editingUser && (
                <div className="mb-10">
                    <h3 className="text-xl font-semibold">Edit User</h3>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="User Name"
                        />
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="User Email"
                        />
                        <input
                            type="text"
                            value={editingUser.role}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            className="border p-2 rounded"
                            placeholder="User Role"
                        />
                        <button
                            onClick={handleSaveUser}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Add New User */}
            <div>
                <h3 className="text-xl font-semibold">Add New User</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="User Name"
                    />
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="User Email"
                    />
                    <input
                        type="text"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="border p-2 rounded"
                        placeholder="User Role"
                    />
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Add User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
