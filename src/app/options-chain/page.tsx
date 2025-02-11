"use client";
import { useEffect, useState } from "react";
import { getOptionChain } from "@/lib/polygon";

export default function OptionsChain() {
  const [optionsData, setOptionsData] = useState<any>(null);
  const [ticker, setTicker] = useState("AAPL"); // Default to AAPL
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch options chain when ticker changes
  useEffect(() => {
    async function fetchOptionsData() {
      if (ticker) {
        const data = await getOptionChain(ticker.toUpperCase());
        setOptionsData(data);
      }
    }
    fetchOptionsData();
  }, [ticker]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Options Chain</h1>

      {/* Ticker Search */}
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

      {/* Display Options Contracts */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold">Available Options Contracts</h2>
        {optionsData && optionsData.results ? (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Contract</th>
                <th className="border p-2">Expiration</th>
                <th className="border p-2">Strike Price</th>
                <th className="border p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {optionsData.results
                .slice(0, 10)
                .map((option: any, index: number) => (
                  <tr key={index} className="border">
                    <td className="p-2">{option.ticker}</td>
                    <td className="p-2">{option.expiration_date}</td>
                    <td className="p-2">${option.strike_price}</td>
                    <td className="p-2">{option.contract_type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Loading options data...</p>
        )}
      </div>
    </main>
  );
}
