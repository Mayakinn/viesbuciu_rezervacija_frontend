import api from "@/lib/api";

export async function getRoomsByHotel(hotelId) {
  const res = await api.get(`/hotel/${hotelId}/room`);
  return res.data;
}

export async function getRoomDetails(hotelId, roomId) {
  const res = await api.get(
    `/hotel/${hotelId}/room/${roomId}`,
    {
      params: {
        includeReviews: true,
        includePictures: true,
      },
    }
  );
  return res.data;
}
export async function deleteRoomImage(hotelId, roomId, pictureId) {
  return api.delete(
    `/hotel/${hotelId}/room/${roomId}/pictures/${pictureId}`,
    { withCredentials: true }
  );
}