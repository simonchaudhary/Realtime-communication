import { useSSE } from "@/hooks/useSSE";
import React from "react";

function SSE() {
  const { data, isConnected } = useSSE("http://localhost:3000/api/events");

  return (
    <div style={{ padding: "20px" }}>
      <h1>SSE Demo</h1>
      <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      <div>
        {data.map((item, i) => (
          <pre key={i}>{JSON.stringify(item, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
}

export default SSE;
