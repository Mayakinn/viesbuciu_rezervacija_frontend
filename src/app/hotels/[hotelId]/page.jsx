import { getHotelById } from "@/services/hotelService";
import Link from "next/link";
import {
  MapPinIcon,
  PhoneIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default async function HotelPage({ params }) {
  const { hotelId } = await params;
  const hotel = await getHotelById(hotelId);

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm border">

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{hotel.name}</h1>
        <p className="text-gray-500 mt-1 text-lg">{hotel.city}</p>
      </div>

      {/* Contact + Address */}
      <div className="space-y-2 text-gray-700">

        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-blue-600" />
          <span>{hotel.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-red-600" />
          <span>
            {hotel.street} {hotel.streetNumber}
          </span>
        </div>

      </div>

      {/* Description Box */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">About this hotel</h2>
        <p className="leading-relaxed text-gray-700">{hotel.description}</p>
      </div>

      {/* CTA */}
      <Link
        href={`/hotels/${hotelId}/rooms`}
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow"
      >
        <HomeIcon className="w-5 h-5" />
        View Rooms →
      </Link>

    </div>
  );
}
