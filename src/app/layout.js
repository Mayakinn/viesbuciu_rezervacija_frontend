import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Hotel Booking",
  description: "Hotel reservation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-300 text-gray-900">
        
        <Navbar />

        <main className="max-w-5xl mx-auto p-6 pb-24">
          {children}
        </main>

        <footer>
          <div className="p-4 bg-white text-center fixed bottom-0 w-full text-gray-600 shadow-inner">
            &copy; 2025 Maja Vinceviciute
          </div>
        </footer>

      </body>
    </html>
  );
}
