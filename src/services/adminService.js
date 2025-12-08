import api from "@/lib/api";

export function getAllUsers() {
  return api.get("/admin/users", { withCredentials: true });
}

export function promoteToHotelOwner(userId) {
  return api.post(`/admin/promote-to-hotelowner/${userId}`, null, {
    withCredentials: true,
  });
}

export function demoteToUser(userId) {
  return api.post(`/admin/demote-to-user/${userId}`, null, {
    withCredentials: true,
  });
}
