"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function HotelModal({ mode, hotel, onClose, onSaved }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: hotel?.name || "",
    description: hotel?.description || "",
    phoneNumber: hotel?.phoneNumber || "",
    city: hotel?.city || "",
    street: hotel?.street || "",
    streetNumber: hotel?.streetNumber || "",
    parking: hotel?.parking ?? true,
    breakfast: hotel?.breakfast ?? true,
    type: hotel?.type || 1,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger fade-in after component mounts
    setTimeout(() => setAnimate(true), 20);
  }, []);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response;

      if (isEdit) {
        response = await api.put(`/hotel/${hotel.id}`, form);
      } else {
        response = await api.post(`/hotel`, form);
      }

      onSaved(response.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  function closeWithAnimation() {
    setAnimate(false);
    setTimeout(() => onClose(), 200); // wait for fade-out
  }

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-50 
        transition-opacity duration-200
        ${animate ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}
      `}
      onClick={closeWithAnimation}
    >
      <div
        className={`
          bg-white rounded-lg p-6 w-full max-w-lg shadow-lg
          transition-all duration-200 transform
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? "Edit Hotel" : "Create Hotel"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hotel Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Street"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="No."
              value={form.streetNumber}
              onChange={(e) => updateField("streetNumber", e.target.value)}
              className="w-28 border p-2 rounded"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.parking}
              onChange={(e) => updateField("parking", e.target.checked)}
            />
            Parking available
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.breakfast}
              onChange={(e) => updateField("breakfast", e.target.checked)}
            />
            Breakfast included
          </label>

          <button
            type="submit"
            className="btn-primary p-2 bg-green-500 hover:bg-green-600 hover:shadow-xl transition rounded-2xl text-white w-full"
          >
            {isEdit ? "Save Changes" : "Create Hotel"}
          </button>

          <button
            type="button"
            onClick={closeWithAnimation}
            className="btn-primary p-2 bg-red-400 hover:bg-red-500 hover:shadow-xl transition rounded-2xl text-white w-full mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
