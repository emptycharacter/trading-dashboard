// src/lib/tdAmeritrade.ts
import axios from "axios";

const TD_AMERITRADE_API_URL = "https://api.tdameritrade.com/v1/marketdata";
const TD_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TD_ACCESS_TOKEN; // Store in .env.local

// Function to get stock quotes
export async function getStockQuote(symbol: string) {
  try {
    const response = await axios.get(`${TD_AMERITRADE_API_URL}/quotes`, {
      params: {
        apikey: TD_ACCESS_TOKEN,
        symbol,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
}

// Function to get option chain data
export async function getOptionChain(symbol: string) {
  try {
    const response = await axios.get(`${TD_AMERITRADE_API_URL}/chains`, {
      params: {
        apikey: TD_ACCESS_TOKEN,
        symbol,
        contractType: "ALL",
        strikeCount: 10,
        includeQuotes: "TRUE",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching option chain:", error);
    return null;
  }
}
