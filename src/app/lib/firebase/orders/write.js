import { db } from '../../firebase';// Adjust import based on your Firebase setup
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export const createOrder = async (orderData) => {
    try {
        // Add a new order document in the "Orders" collection
        const orderRef = await addDoc(collection(db, "Orders"), orderData);
        
        // Update the order document to include OrderId as the document ID
        await updateDoc(doc(db, "Orders", orderRef.id), {
            OrderId: orderRef.id // Set OrderId to the document ID
        });

        return orderRef.id; // Return the generated document ID
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
export const updateOrderInFirestore = async (orderId, orderData) => {
    const orderRef = doc(db, "Orders", orderId); // Adjust "orders" to your actual collection name

    try {
        await updateDoc(orderRef, {
            ...orderData,
            // Optionally, you can include timestamps or other fields if necessary
        });
        console.log("Order updated successfully");
    } catch (error) {
        console.error("Error updating order: ", error);
    }
};