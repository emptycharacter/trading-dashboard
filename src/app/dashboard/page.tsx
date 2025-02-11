"use client";
import { useEffect, useState } from "react";
import { getStockQuote } from "@/lib/polygon";
import { connectWebSocket } from "@/lib/polygonWebSocket";

export default function Dashboard() {
  const [marketData, setMarketData] = useState<any>(null);
  const [ticker, setTicker] = useState("AAPL"); // Default ticker
  const [searchTerm, setSearchTerm] = useState("");
  const [livePrice, setLivePrice] = useState<number | null>(null);

  // Fetch stock data on load
  useEffect(() => {
    async function fetchMarketData() {
      if (ticker) {
        const data = await getStockQuote(ticker.toUpperCase());
        setMarketData(data);
      }
    }
    fetchMarketData();
  }, [ticker]);

  // WebSocket Connection
  useEffect(() => {
    if (!ticker) return;

    const ws = connectWebSocket(ticker, (data) => {
      console.log("🔥 Real-Time Update:", data); // Log real-time updates
      if (data.p) {
        setLivePrice(data.p); // Update live price
      }
    });

    return () => {
      if (ws) ws.close(); // Cleanup WebSocket connection on unmount
    };
  }, [ticker]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Stock Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., TSLA)"
          className="p-2 border rounded-lg mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setTicker(searchTerm)}
        >
          Search
        </button>
      </div>

      {/* Market Data Section */}
      <div className="p-4 bg-white shadow rounded-lg mb-4">
        <h2 className="text-xl font-semibold">Market Data</h2>
        {marketData && marketData.results ? (
          <div className="text-gray-700">
            <p>
              📈 <strong>{marketData.ticker}</strong>
            </p>
            <p>💰 Closing Price: ${marketData.results[0].c}</p>
            <p>📉 High: ${marketData.results[0].h}</p>
            <p>📊 Low: ${marketData.results[0].l}</p>
            <p>🔄 Volume: {marketData.results[0].v.toLocaleString()}</p>
          </div>
        ) : (
          <p>Loading market data...</p>
        )}

        {/* Live Price Updates */}
        {livePrice ? (
          <p className="text-lg mt-4">
            🔥 <strong>Live Price:</strong> ${livePrice.toFixed(2)}
          </p>
        ) : (
          <p>Waiting for real-time updates...</p>
        )}
      </div>
    </main>
  );
}
