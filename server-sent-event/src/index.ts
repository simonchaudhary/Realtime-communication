import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/events": async (req) => {
      let intervalId: Timer | undefined;

      const stream = new ReadableStream({
        start(controller) {
          // Send initial connection message
          controller.enqueue("data: Connected to SSE\n\n");

          // Send updates every 1 second
          intervalId = setInterval(() => {
            try {
              const message = JSON.stringify({
                time: new Date().toISOString(),
                message: "Hello from server!",
                random: Math.floor(Math.random() * 100),
              });
              controller.enqueue(`data: ${message}\n\n`);
            } catch (error) {
              console.error("Error sending SSE message:", error);
              clearInterval(intervalId);
              controller.close();
            }
          }, 1000);
        },
        cancel() {
          // Clean up when client disconnects
          if (intervalId) {
            clearInterval(intervalId);
            console.log("Client disconnected, interval cleared");
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
