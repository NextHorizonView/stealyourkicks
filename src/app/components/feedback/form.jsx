"use client";
import React from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedback = {
      name: formData.get("name"),
      email: formData.get("email"),
      rating: parseInt(formData.get("rating"), 10),
      comments: formData.get("comments"),
      submittedAt: new Date().toISOString(), // Optional: Track submission time
    };

    try {
      // Create a new doc and retrieve the auto-generated ID
      const feedbackRef = await addDoc(collection(db, "Feedback"), feedback);
      
      console.log("Feedback submitted:", feedback);
      console.log("Document ID:", feedbackRef.id);

      // Set the same data with the doc ID matching its own ID
      await setDoc(doc(db, "Feedback", feedbackRef.id), {
        ...feedback,
        id: feedbackRef.id, // Store the doc ID in the document itself (optional)
      });

      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        We Value Your Feedback
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please share your experience with us.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            type="text"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            placeholder="5"
            type="number"
            min="1"
            max="5"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="comments">Your Feedback</Label>
          <Textarea
            id="comments"
            name="comments"
            placeholder="Share your thoughts..."
            required
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Submit Feedback &rarr;
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
