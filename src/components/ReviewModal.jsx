"use client";

import { useState } from "react";

export default function ReviewModal({ initial, onClose, onSave }) {
  const [rating, setRating] = useState(initial?.rating || 5);
  const [comment, setComment] = useState(initial?.comment || "");

  function submit(e) {
    e.preventDefault();
    onSave({ rating, comment });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow animate-fadeIn">

        <h2 className="text-xl font-bold mb-4">
          {initial ? "Edit Review" : "Write a Review"}
        </h2>

        <form className="space-y-4" onSubmit={submit}>
          <label className="block">
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>

          <textarea
            className="w-full border rounded p-2"
            placeholder="Write something..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 mt-2 text-black rounded py-2 hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
