import { useEffect, useState } from "react";

export function useSSE(url: string) {
  const [data, setData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);
    console.log("EventSource created:", eventSource);

    eventSource.onopen = () => {
      console.log("SSE connection opened");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      console.log("Received message:", event.data);
      try {
        const parsed = JSON.parse(event.data);
        setData((prev) => [...prev, parsed]);
      } catch (error) {
        console.log("Non-JSON message received:", event.data);
        setData((prev) => [...prev, event.data]);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      setIsConnected(false);
    };

    return () => {
      console.log("Closing EventSource connection");
      eventSource.close();
    };
  }, [url]);

  return { data, isConnected };
}
