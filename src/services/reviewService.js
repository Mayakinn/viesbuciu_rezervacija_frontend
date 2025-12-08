import api from "@/lib/api";

export async function addReview(hotelId, roomId, data) {
  return api.post(`/hotel/${hotelId}/room/${roomId}/reviews`, data, {
    withCredentials: true,
  });
}

export async function updateReview(hotelId, roomId, reviewId, data) {
  return api.put(
    `/hotel/${hotelId}/room/${roomId}/reviews/${reviewId}`,
    data,
    { withCredentials: true }
  );
}

export async function deleteReviewRequest(hotelId, roomId, reviewId) {
  return api.delete(
    `/hotel/${hotelId}/room/${roomId}/reviews/${reviewId}`,
    { withCredentials: true }
  );
}
