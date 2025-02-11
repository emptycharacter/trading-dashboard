import axios from "axios";

const POLYGON_API_URL = "https://api.polygon.io";
const POLYGON_API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

// Function to get stock quote (already exists)
export async function getStockQuote(symbol: string) {
  try {
    const response = await axios.get(
      `${POLYGON_API_URL}/v2/aggs/ticker/${symbol}/prev?apiKey=${POLYGON_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error.response?.data || error);
    return null;
  }
}

// Function to fetch options contracts for a given stock
export async function getOptionChain(symbol: string) {
  try {
    const response = await axios.get(
      `${POLYGON_API_URL}/v3/reference/options/contracts?underlying_ticker=${symbol}&apiKey=${POLYGON_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching option chain:", error.response?.data || error);
    return null;
  }
}
