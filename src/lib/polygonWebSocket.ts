const POLYGON_WS_URL = "wss://socket.polygon.io/stocks";
const POLYGON_API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

export function connectWebSocket(symbol: string, onMessage: (data: any) => void) {
  if (!POLYGON_API_KEY) {
    console.error("❌ Missing Polygon API Key.");
    return null;
  }

  const ws = new WebSocket(POLYGON_WS_URL);

  ws.onopen = () => {
    console.log("✅ WebSocket Connected");

    // Authenticate
    ws.send(JSON.stringify({ action: "auth", params: POLYGON_API_KEY }));

    // Subscribe to stock updates
    //ws.send(JSON.stringify({ action: "subscribe", params: `T.${symbol}` }));
    ws.send(JSON.stringify({ action: "subscribe", params: `T.${symbol}-AFT` })); // Use after-hours symbol

  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📡 Incoming Data:", data);

    if (data[0]?.ev === "status" && data[0]?.status === "error") {
      console.error("🚨 WebSocket Error Response:", data);
      return;
    }
    
    if (data[0]?.ev === "T") {
      onMessage(data[0]); // Pass trade updates only
    }
  };

  ws.onerror = (error) => {
    console.error("🚨 WebSocket Connection Error:", error);
  };

  ws.onclose = (event) => {
    console.log("❌ WebSocket Closed:", event.reason || "No reason provided");
  };

  return ws;
}
