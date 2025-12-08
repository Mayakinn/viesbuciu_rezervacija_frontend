"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function RoomModal({ mode, room, hotelId, onClose, onSaved }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    numberOfBeds: room?.numberOfBeds || 1,
    squareMeters: room?.squareMeters || 10,
    toileteries: room?.toileteries ?? true,
  });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response;

      if (isEdit) {
        response = await api.put(`/hotel/${hotelId}/room/${room.id}`, form);
      } else {
        response = await api.post(`/hotel/${hotelId}/room`, form);
      }

      // Re-fetch updated room list
      const roomsRes = await api.get(`/hotel/${hotelId}/room`);
      onSaved(roomsRes.data);

    } catch (err) {
      console.error(err);
      alert("Error saving room.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center animate-fadeIn z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg animate-slideUp">

        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? "Edit Room" : "Create Room"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">Number of Beds</label>
            <input
              type="number"
              min="1"
              value={form.numberOfBeds}
              onChange={(e) => updateField("numberOfBeds", Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Room Size (m²)</label>
            <input
              type="number"
              min="1"
              value={form.squareMeters}
              onChange={(e) => updateField("squareMeters", Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.toileteries}
              onChange={(e) => updateField("toileteries", e.target.checked)}
            />
            Includes toiletries
          </label>

          <button
            type="submit"
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg w-full transition shadow"
          >
            {isEdit ? "Save Changes" : "Create Room"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-lg w-full transition shadow mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
