"use client";
import { useEffect, useState } from "react";

export default function JournalPage() {
  const [trades, setTrades] = useState(null);
  const [formData, setFormData] = useState({
    symbol: "",
    entryPrice: "",
    exitPrice: "",
    strategy: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/journal")
      .then((res) => res.json())
      .then((data) => {
        console.log("📡 Received API Data:", data); // Debug log
        setTrades(data);
      })
      .catch((err) => console.error("🚨 API Fetch Error:", err));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/journal", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setTrades([...trades, await res.json()]);
      setFormData({ symbol: "", entryPrice: "", exitPrice: "", strategy: "", notes: "" });
    }
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Trading Journal</h1>

      {/* New Trade Entry */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-6">
        <input
          type="text"
          placeholder="Symbol (e.g., AAPL)"
          value={formData.symbol}
          onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="number"
          placeholder="Entry Price"
          value={formData.entryPrice}
          onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="number"
          placeholder="Exit Price (Optional)"
          value={formData.exitPrice}
          onChange={(e) => setFormData({ ...formData, exitPrice: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <input
          type="text"
          placeholder="Strategy"
          value={formData.strategy}
          onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Trade</button>
      </form>

      {/* Display Logged Trades */}
      <h2 className="text-xl font-semibold mb-2">Previous Trades</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {trades.length === 0 ? (
          <p>No trades logged yet.</p>
        ) : (
          <ul>
            {trades.map((trade, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  <strong>{trade.symbol}</strong> - Entry: ${trade.entryPrice}, Exit: {trade.exitPrice ? `$${trade.exitPrice}` : "Open"}, P/L: {trade.profitLoss !== null ? `$${trade.profitLoss}` : "Pending"}
                </p>
                <p className="text-sm text-gray-500">{trade.strategy} - {trade.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
