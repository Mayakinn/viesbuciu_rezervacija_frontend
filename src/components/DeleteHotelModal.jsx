"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function DeleteHotelModal({ hotelId, onClose, onDeleted }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 20);
  }, []);

  function closeWithAnimation() {
    setAnimate(false);
    setTimeout(() => onClose(), 200);
  }

  async function handleDelete() {
    try {
      await api.delete(`/hotel/${hotelId}`);
      onDeleted();
    } catch (err) {
      console.error(err);
      alert("Failed to delete hotel.");
    }
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-200
        ${animate ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}
      `}
      onClick={closeWithAnimation}
    >
      <div
        className={`
          bg-white p-6 rounded-lg shadow-lg max-w-sm w-full
          transition-all duration-200 transform
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-red-600 mb-4">
          Delete Hotel?
        </h2>

        <p className="text-gray-700 mb-4">
          This action cannot be undone. Your hotel and all associated rooms will be deleted.
        </p>

        <button
          onClick={handleDelete}
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Yes, Delete Hotel
        </button>

        <button
          onClick={closeWithAnimation}
          className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded-lg mt-2 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
