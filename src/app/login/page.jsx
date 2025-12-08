"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";
import {useAuthStore }from "@/store/authStore";
export default function LoginPage() {
const router = useRouter();
  const loginUser = useAuthStore((state) => state.loginUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
        const accessToken = await login(email, password);

        loginUser(accessToken);

        window.location.href = "/";
    } catch (err) {
        setError("Invalid email or password");
    }
    }


return (
  <div className="flex justify-center mt-10 mb-20">
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xs">

      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">

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

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

}
