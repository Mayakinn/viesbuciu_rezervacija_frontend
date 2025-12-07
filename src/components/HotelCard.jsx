export default function HotelCard({ hotel }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{hotel.name}</h2>
      <p className="text-gray-600">{hotel.description}</p>

      <a
        href={`/hotels/${hotel.id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        View Rooms →
      </a>
    </div>
  );
}
