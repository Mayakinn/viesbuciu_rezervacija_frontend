"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadRoomImageModal({ room, hotelId, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Select an image first");

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      setLoading(true);
      await api.post(
        `/hotel/${hotelId}/room/${room.id}/upload-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

        const detailed = await api.get(
        `/hotel/${hotelId}/room/${room.id}`,
        { params: { includePictures: true } }
        );

        onUploaded(detailed.data);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">

        <h2 className="text-xl font-bold mb-4">Upload Image for Room #{room.id}</h2>

        <form onSubmit={handleUpload} className="space-y-4">

          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-md mt-3 shadow"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}
