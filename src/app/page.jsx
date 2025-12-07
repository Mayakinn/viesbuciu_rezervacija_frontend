"use client";

import { useEffect, useState } from "react";
import { getAllHotels } from "@/services/hotelService";
import HotelCard from "@/components/HotelCard";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllHotels();
        setHotels(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p className="p-6 text-lg">Loading hotels...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Hotels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
