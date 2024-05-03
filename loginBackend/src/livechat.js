// Initialize a new WebSocket connection
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  // WebSocket connection established

  ws.on('message', (message) => {
    // Handle incoming messages from clients
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});