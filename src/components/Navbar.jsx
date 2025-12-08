"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/services/authService";

export default function Navbar() {
  const { roles, isLoggedIn, loadUserFromToken, logoutUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadUserFromToken();
  }, []);

  async function handleLogout() {
    await logout();
    logoutUser();
    window.location.href = "/";
  }

  const closeMenu = () => setMenuOpen(false);

  const links = (
    <>
      <Link href="/" onClick={closeMenu} className="nav-btn">Home</Link>
      <Link href="/hotels" onClick={closeMenu} className="nav-btn">Hotels</Link>

      {isLoggedIn && roles.includes("HotelOwner") && (
        <Link href="/owner/dashboard" onClick={closeMenu} className="nav-btn">
          My Hotel
        </Link>
      )}

      {isLoggedIn && roles.includes("Admin") && (
        <Link href="/admin" onClick={closeMenu} className="nav-btn text-red-600 font-bold">
          Admin Panel
        </Link>
      )}

      {isLoggedIn ? (
        <button
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          className="nav-btn bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <>
          <Link href="/login" onClick={closeMenu} className="nav-btn">Login</Link>
          <Link href="/register" onClick={closeMenu} className="nav-btn">Register</Link>
        </>
      )}
    </>
  );

  return (
    <header className="p-4 bg-white shadow sticky top-0 z-50">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="text-xl font-bold">Hotels</Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 text-xl font-share">
          {links}
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span className="w-6 h-1 bg-black rounded"></span>
          <span className="w-6 h-1 bg-black rounded"></span>
          <span className="w-6 h-1 bg-black rounded"></span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-xl font-share">
          {links}
        </div>
      )}
    </header>
  );
}
