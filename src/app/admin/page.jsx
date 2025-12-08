"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  getAllUsers,
  promoteToHotelOwner,
  demoteToUser,
} from "@/services/adminService";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { roles } = useAuthStore();

  // 👇 ALWAYS CALL HOOKS FIRST — NO RETURNS ABOVE THIS LINE

  async function loadUsers() {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }

  async function promote(userId) {
    await promoteToHotelOwner(userId);
    loadUsers();
  }

  async function demote(userId) {
    await demoteToUser(userId);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // 👇 NOW SAFE TO CHECK ROLES AND RETURN
  if (!roles.includes("Admin")) {
    return (
      <p className="text-center text-red-600 text-lg mt-10">
        Access Denied. Admins Only.
      </p>
    );
  }

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading users...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Roles</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => {
            const role = u.roles?.[0] || "User";

            return (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.userName}</td>

                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      role === "HotelOwner"
                        ? "bg-blue-600"
                        : role === "Admin"
                        ? "bg-purple-600"
                        : "bg-gray-600"
                    }`}
                  >
                    {role}
                  </span>
                </td>

                <td className="p-2">
                  {role === "User" && (
                    <button
                      onClick={() => promote(u.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Make HotelOwner
                    </button>
                  )}

                  {role === "HotelOwner" && (
                    <button
                      onClick={() => demote(u.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Make User
                    </button>
                  )}

                  {role === "Admin" && (
                    <p className="text-gray-500 italic">No actions</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
