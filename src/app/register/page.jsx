"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser(username, email, password);
      setSuccess("Account created! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Something went wrong!");
    }
  }

return (
  <div className="flex justify-center mt-10 mb-20">
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-xs">

      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">

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

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
          Create Account
        </button>
      </form>
    </div>
  </div>
);

}
