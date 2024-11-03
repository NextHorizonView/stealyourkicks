import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '@/app/lib/firebase';
// Initialize Firestore (Assuming Firebase has been initialized in your app)


const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all feedbacks from Firestore
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbackCollection = collection(db, 'Feedback');
                const feedbackSnapshot = await getDocs(feedbackCollection);
                const feedbackList = feedbackSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFeedbacks(feedbackList);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) return <div>Loading feedbacks...</div>;

    if (feedbacks.length === 0) return <div>No feedbacks found.</div>;

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-6">Customer Feedback</h2>
            <div className="space-y-4">
                {feedbacks.map(feedback => (
                    <div key={feedback.id} className="border p-4 rounded shadow-sm">
                        <p><strong>Name:</strong> {feedback.name}</p>
                        <p><strong>Email:</strong> {feedback.email}</p>
                        <p><strong>Rating:</strong> {feedback.rating}/5</p>
                        <p><strong>Comments:</strong> {feedback.comments}</p>
                        <p>
                            <strong>Submitted At:</strong>{' '}
                            {format(new Date(feedback.submittedAt), 'yyyy-MM-dd HH:mm')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;
