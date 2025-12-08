"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import UploadRoomImageModal from "@/components/UploadRoomImageModal";
import HotelModal from "@/components/HotelModal";
import DeleteHotelModal from "@/components/DeleteHotelModal";
import RoomModal from "@/components/RoomModal";
import DeleteRoomModal from "@/components/DeleteRoomModal";
import { deleteRoomImage } from "@/services/roomService";

export default function OwnerDashboard() {
  const { userId } = useAuthStore();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isHotelModalOpen, setHotelModalOpen] = useState(false);
  const [hotelModalMode, setHotelModalMode] = useState("create");

  const [isDeleteHotelOpen, setDeleteHotelOpen] = useState(false);

  const [isRoomModalOpen, setRoomModalOpen] = useState(false);
  const [roomModalMode, setRoomModalMode] = useState("create");
  const [selectedRoom, setSelectedRoom] = useState(null);
    async function deleteImage(room, pictureId) {
  try {
    await deleteRoomImage(hotel.id, room.id, pictureId);

    const updated = rooms.map(r =>
      r.id === room.id
        ? { ...r, pictures: r.pictures.filter(p => p.id !== pictureId) }
        : r
    );

    setRooms(updated);

  } catch (err) {
    console.error(err);
    alert("Failed to delete image");
  }
}

  useEffect(() => {
    async function load() {
      try {
        const hotelRes = await api.get("/hotel/my-hotel", { withCredentials: true });
        const hotelData = hotelRes.data;

        setHotel(hotelData);

        if (hotelData?.id) {
            const roomsRes = await api.get(`/hotel/${hotelData.id}/room`);
            const roomList = roomsRes.data;

            const detailedRooms = await Promise.all(
            roomList.map(room => api.get(`/hotel/${hotelData.id}/room/${room.id}`, {
                params: { includeReviews: false, includePictures: true }
            }).then(res => res.data))
            );

            setRooms(detailedRooms);

        }

      } catch {
        setHotel(null);
        setRooms([]);
      }
      setLoading(false);
    }

    load();
  }, []);

  function openHotelModal(mode) {
    setHotelModalMode(mode);
    setHotelModalOpen(true);
  }

  function closeHotelModal() {
    setHotelModalOpen(false);
  }

  function openRoomModal(mode, room = null) {
    setRoomModalMode(mode);
    setSelectedRoom(room);
    setRoomModalOpen(true);
  }

  function closeRoomModal() {
    setRoomModalOpen(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>

      <section className="space-y-4">

        {hotel ? (
          <>
            <p><strong>Name:</strong> {hotel.name}</p>
            <p><strong>City:</strong> {hotel.city}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => openHotelModal("edit")}
                className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
              >
                Edit Hotel
              </button>

              <button
                onClick={() => setDeleteHotelOpen(true)}
                className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
              >
                Delete Hotel
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You do not have a hotel yet.</p>
            <button
              onClick={() => openHotelModal("create")}
className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"            >
              Create Hotel
            </button>
          </>
        )}
      </section>

      {/* ROOMS SECTION */}
      {hotel && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Rooms</h2>

          <button
            onClick={() => openRoomModal("create")}
            className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
          >
            + Add Room
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="border rounded-lg p-4 bg-white shadow"
              >
                <h3 className="text-xl font-semibold">Room #{room.id}</h3>
                <p>Beds: {room.numberOfBeds}</p>
                <p>Size: {room.squareMeters} m²</p>
                <p>Toiletries: {room.toileteries ? "Yes" : "No"}</p>
                {room?.pictures?.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold">Current Images:</h3>

                    <div className="grid grid-cols-2 gap-3">
                    {room.pictures.map((pic) => (
                        <div key={pic.id} className="relative group">
                        <img
                            src={pic.url}
                            className="rounded shadow-md w-full h-32 object-cover"
                        />

                        <button
                        onClick={() => deleteImage(room, pic.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                        >
                        ✕
                        </button>

                        </div>
                    ))}
                    </div>
                </div>
                )}

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => openRoomModal("edit", room)}
                    className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
                  >
                    Edit
                  </button>

                    <button
                    onClick={() => {
                        setSelectedRoom(room);
                        setRoomModalMode("delete");
                        setRoomModalOpen(true);
                    }}
                    className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
                    >
                    Delete
                    </button>   
                      <button
                    onClick={() => openRoomModal("uploadImage", room)}
                    className="px-4 py-2  text-white rounded-lg hover:bg-gray-700 bg-gray-600"
                >
                    Upload Image
                    </button>

                </div>
              </div>
            ))}

            {rooms.length === 0 && (
              <p>No rooms yet.</p>
            )}
          </div>
        </section>
      )}

      {/* HOTEL MODALS */}
      {isHotelModalOpen && (
        <HotelModal
          mode={hotelModalMode}
          hotel={hotel}
          onClose={closeHotelModal}
          onSaved={(updated) => {
            setHotel(updated);
            closeHotelModal();
          }}
        />
      )}

      {isDeleteHotelOpen && (
        <DeleteHotelModal
          hotelId={hotel?.id}
          onClose={() => setDeleteHotelOpen(false)}
          onDeleted={() => {
            setHotel(null);
            setRooms([]);
            setDeleteHotelOpen(false);
          }}
        />
      )}

        {/* ROOM MODALS */}
        {isRoomModalOpen && (roomModalMode === "create" || roomModalMode === "edit") && (
        <RoomModal
            mode={roomModalMode}
            room={selectedRoom}
            hotelId={hotel.id}
            onClose={closeRoomModal}
            onSaved={(updatedRoomList) => {
            setRooms(updatedRoomList);
            closeRoomModal();
            }}
        />
        )}


        {isRoomModalOpen && roomModalMode === "delete" && (
        <DeleteRoomModal
            room={selectedRoom}
            hotelId={hotel.id}
            onClose={closeRoomModal}
            onDeleted={(updatedRoomList) => {
            setRooms(updatedRoomList);
            closeRoomModal();
            }}
        />
        )}
        {isRoomModalOpen && roomModalMode === "uploadImage" && (
        <UploadRoomImageModal
            room={selectedRoom}
            hotelId={hotel.id}
            onClose={closeRoomModal}
            onUploaded={(updatedRoom) => {
            setRooms(prev =>
                prev.map(r => (r.id === updatedRoom.id ? updatedRoom : r))
            );
            closeRoomModal();
            }}

        />
        )}




    </div>
  );
}
