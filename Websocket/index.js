const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clients = new Map();
let clientIdCounter = 0;

wss.on("connection", function connection(ws) {
  console.log("A new client connected");

  // Assign unique ID for this connection
  clientIdCounter++;
  const currentClientId = clientIdCounter;

  // Store client with ws object
  clients.set(currentClientId, {
    ws: ws,
    id: currentClientId,
    username: null,
    joinTime: Date.now(),
  });

  console.log("Client ID:", currentClientId, "Total clients:", clients.size);

  // Send welcome message to this client
  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Welcome to server",
      user: {
        id: currentClientId,
        username: null,
        joinTime: Date.now(),
      },
    })
  );

  ws.on("message", function incoming(message) {
    console.log("Received from client %s: %s", currentClientId, message);

    const data = JSON.parse(message);

    if (data.type === "join") {
      // User setting username
      const client = clients.get(currentClientId);
      client.username = data.username;

      console.log(`Client ${currentClientId} is now ${data.username}`);

      // Broadcast to everyone that someone joined
      const joinMessage = JSON.stringify({
        type: "system",
        message: `${data.username} joined the chat`,
        timestamp: Date.now(),
      });

      wss.clients.forEach(function (clientWs) {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(joinMessage);
        }
      });
    } else if (data.type === "message") {
      // User sent a chat message
      const client = clients.get(currentClientId);

      if (!client.username) {
        // Send error if no username set
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Please set username first",
          })
        );
        return;
      }

      // Create message object
      const messageData = JSON.stringify({
        type: "message",
        username: client.username,
        message: data.message,
        timestamp: Date.now(),
      });

      // BROADCAST TO EVERYONE!
      console.log(
        `Broadcasting message from ${client.username} to ${wss.clients.size} clients`
      );

      wss.clients.forEach(function (clientWs) {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(messageData);
        }
      });
    }

    console.log(
      "Current clients:",
      Array.from(clients.values()).map((c) => ({
        id: c.id,
        username: c.username,
      }))
    );
  });

  console.log("hello ", wss.clients);

  ws.on("close", function close() {
    const client = clients.get(currentClientId);
    console.log(`Client ${currentClientId} disconnected`);

    // Notify others if user had a username
    if (client && client.username) {
      const leaveMessage = JSON.stringify({
        type: "system",
        message: `${client.username} left the chat`,
        timestamp: Date.now(),
      });

      wss.clients.forEach(function (clientWs) {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(leaveMessage);
        }
      });
    }

    // Remove from map
    clients.delete(currentClientId);
    console.log(`Total clients remaining: ${clients.size}`);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
