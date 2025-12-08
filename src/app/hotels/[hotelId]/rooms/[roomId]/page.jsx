"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getRoomDetails } from "@/services/roomService";
import { addReview, updateReview, deleteReviewRequest } from "@/services/reviewService";
import ReviewModal from "@/components/ReviewModal";
import { useAuthStore } from "@/store/authStore";
import {
  UsersIcon,
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function RoomPage() {
  const { hotelId, roomId } = useParams();
   const userId = useAuthStore((state) => state.userId);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  async function refreshRoom() {
    const data = await getRoomDetails(hotelId, roomId);
    setRoom(data);
  }

  useEffect(() => {
    async function load() {
      await refreshRoom();
      setLoading(false);
    }
    if (hotelId && roomId) load();
  }, [hotelId, roomId]);

  if (loading || !room) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Room #{roomId}</h1>

      <div className="flex items-center gap-2">
        <UsersIcon className="h-6 w-6 text-blue-600" />
        <span>{room.numberOfBeds} beds</span>
      </div>

      <div className="flex items-center gap-2">
        <HomeIcon className="h-6 w-6 text-green-600" />
        <span>{room.squareMeters} m²</span>
      </div>

      <div className="flex items-center gap-2">
        {room.toileteries ? (
          <>
            <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
            <span>Toiletries included</span>
          </>
        ) : (
          <>
            <XCircleIcon className="h-6 w-6 text-red-600" />
            <span>No toiletries</span>
          </>
        )}
      </div>

      {room.pictures?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Pictures</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {room.pictures.map((pic) => (
              <img key={pic.id} src={pic.url} className="rounded shadow" />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Reviews</h2>

      {userId && (
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Write Review
        </button>
      )}


      {room.reviews?.length === 0 && <p>No reviews yet.</p>}

      <div className="space-y-4">
        {room.reviews?.map((review) => {
          const ownerId = review.userId || review.UserId;
          const isOwner = ownerId === userId;

          console.log("Review ownerId:", ownerId, "Current userId:", userId, "isOwner:", isOwner);
          return (
            <div key={review.id} className="p-4 bg-white shadow rounded-lg">
              <p className="font-semibold">{review.reviewerName}</p>

              <div className="flex items-center gap-1 text-yellow-600">
                <StarIcon className="h-5 w-5" />
                <span>{review.rating}</span>
              </div>

              <p>{review.comment}</p>

              {isOwner && (
                <div className="flex gap-4 text-sm mt-2">
                  <button
                    onClick={() => {
                      setEditingReview(review);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await deleteReviewRequest(hotelId, roomId, review.id);
                      await refreshRoom();
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <ReviewModal
          initial={editingReview}
          onClose={() => {
            setEditingReview(null);
            setShowModal(false);
          }}
          onSave={async (data) => {
            if (editingReview) {
              await updateReview(hotelId, roomId, editingReview.id, data);
            } else {
              await addReview(hotelId, roomId, data);
            }
            setEditingReview(null);
            setShowModal(false);
            await refreshRoom();
          }}
        />
      )}
    </div>
  );
}
