import { getRoomsByHotel } from "@/services/roomService";
import Link from "next/link";

export default async function RoomsPage({ params }) {
  const { hotelId } = await params;

  let rooms = [];

  try {
    rooms = await getRoomsByHotel(hotelId);
  } catch (err) {
    console.error("Failed to load rooms:", err);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Rooms</h1>

      {rooms.length === 0 && (
        <div className="text-gray-500 text-lg">
          No rooms available.
        </div>
      )}

      {rooms.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/hotels/${hotelId}/rooms/${room.id}`}
              className="p-4 border rounded-xl text-center bg-white shadow hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">Room #{room.id}</h2>
              <p>Beds: {room.numberOfBeds}</p>
              <p>{room.squareMeters} m²</p>
              <p>Toiletries: {room.toileteries ? "Yes" : "No"}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
