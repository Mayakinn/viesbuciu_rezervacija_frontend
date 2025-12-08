"use client";

import api from "@/lib/api";

export default function DeleteRoomModal({ room, hotelId, onClose, onDeleted }) {
  async function handleDelete() {
    try {
      await api.delete(`/hotel/${hotelId}/room/${room.id}`);

      // Reload rooms
      const roomsRes = await api.get(`/hotel/${hotelId}/room`);
      onDeleted(roomsRes.data);

    } catch (err) {
      console.error(err);
      alert("Failed to delete room.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-fadeIn z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg animate-slideUp">

        <h2 className="text-xl font-semibold mb-4">
          Delete Room #{room.id}?
        </h2>

        <p className="mb-4">
          Are you sure you want to delete this room? This action cannot be undone.
        </p>

        <button
          onClick={handleDelete}
          className="w-full p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg mb-2"
        >
          Delete
        </button>

        <button
          onClick={onClose}
          className="w-full p-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
