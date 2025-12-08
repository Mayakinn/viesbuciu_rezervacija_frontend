"use client";

import { useState } from "react";
import { registerHotelOwner } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterHotelOwnerPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = await registerHotelOwner(username, email, password);

      // redirect immediately because hotel owners get tokens instantly
      router.push("/dashboard");
    } catch {
      setError("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Register as Hotel Owner</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold">
            Register & Create Hotels
          </button>
        </form>
      </div>
    </div>
  );
}
