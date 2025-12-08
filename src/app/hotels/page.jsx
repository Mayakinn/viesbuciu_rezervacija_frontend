import { getAllHotels } from "@/services/hotelService";
import Link from "next/link";

export default async function HotelsPage() {
  const hotels = await getAllHotels(); // SSR call

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Hotels</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Link
            href={`/hotels/${hotel.id}`}
            key={hotel.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition hover:bg-gray-200 bg-white"
          >
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="mt-2 line-clamp-3">{hotel.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
