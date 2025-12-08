import api from "@/lib/api"; // your axios instance

export async function getMyHotels() {
  const res = await api.get("/hotel", { withCredentials: true });
  return res.data;
}
