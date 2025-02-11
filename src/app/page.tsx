// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to TradeX</h1>
        <p className="text-gray-600 mb-6">
          A real-time trading platform for options traders.
        </p>

        {/* Buttons to Navigate */}
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Enter Dashboard
            </button>
          </Link>
          <Link href="/login">
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700">
              Login
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
