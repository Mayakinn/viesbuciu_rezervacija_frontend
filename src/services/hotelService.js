import api from "@/lib/api";
export async function getAllHotels() {
  const res = await api.get("/hotel");
  return res.data;
}

export async function getHotelById(id) {
  const res = await api.get(`/hotel/${id}`);
  return res.data;
}

export async function createHotel(data) {
  const res = await api.post("/hotel", data, { withCredentials: true });
  return res.data;
}

export async function updateHotel(id, data) {
  const res = await api.put(`/hotel/${id}`, data, { withCredentials: true });
  return res.data;
}
