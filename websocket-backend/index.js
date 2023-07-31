import { createServer } from 'http';
import {  WebSocketServer } from 'ws';
import { Client } from '@stomp/stompjs';

// Create an HTTP server
const server = createServer()

server.on('request',(_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Create a WebSocket server using 'ws' library
const wss = new WebSocketServer({ server });

// Attach the STOMP protocol server to the WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  const stompClient = new Client({
    webSocketFactory: () => ws
  });
  

  stompClient.onConnect = (frame) => {
    console.log('stomp connection established', frame);
    stompClient.subscribe('/topic/test01', (message) => {
      console.log('Received:', message.body);
    });
  };
  
  stompClient.onStompError = (frame) => {
    console.error('Broker reported error:', frame.headers['message']);
    console.error('Additional details:', frame.body);
  };
  
  stompClient.activate(); 

});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

