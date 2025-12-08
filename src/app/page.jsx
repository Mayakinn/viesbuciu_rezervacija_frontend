export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">Welcome to Hotel Reviews!</h1>
      <p className="mt-4 text-lg">Explore all hotels below.</p>

      <a
        href="/hotels"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Browse Hotels →
      </a>
    </div>
  );
}
