// src/app/charts/page.tsx
"use client";
import { AdvancedChart } from "react-tradingview-embed";

export default function Charts() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Live Market Charts</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {/* TradingView Chart */}
        <AdvancedChart
          widgetProps={{
            theme: "light",
            symbol: "NASDAQ:AAPL",
            width: "100%",
            height: 500,
          }}
        />
      </div>
    </main>
  );
}
