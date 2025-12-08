import { create } from "zustand";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = create((set) => ({
  user: null,
  userId: null,
  roles: [],
  isLoggedIn: false,
  hydrated: false,

  loadUserFromToken: () => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

    if (!token) {
      set({ hydrated: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);

      const username =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User";

      const userId =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
        decoded.sub ||
        decoded.userId ||
        null;

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const roles = Array.isArray(role) ? role : role ? [role] : [];

      set({ user: username, userId, roles, isLoggedIn: true, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  loginUser: (token, username, roles) => {
    localStorage.setItem("accessToken", token);

    const decoded = jwtDecode(token);

    const userId =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      decoded.sub ||
      decoded.userId ||
      null;

    set({
      user: username,
      userId,
      roles,
      isLoggedIn: true,
      hydrated: true,
    });
  },

  logoutUser: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, userId: null, roles: [], isLoggedIn: false, hydrated: true });
  },
}));
