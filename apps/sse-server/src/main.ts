import express from 'express';
import { Server } from 'ws';
import { createServer } from 'http';

const app = express();
const PORT = 3000;
const server = createServer(app);
const wss = new Server({ server });

// Data Structure to Track Subscriptions
const subscriptions = {};

// Store the interval ID
let tickerIntervalId;

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'subscribe' && typeof data.ticker === 'string') {
        if (!subscriptions[data.ticker]) {
          subscriptions[data.ticker] = [];
        }
        subscriptions[data.ticker].push(ws);
        console.log(`Client subscribed to ${data.ticker}`);
      }
    } catch (error) {
      console.error('Error handling subscription:', error);
    }
  });

  ws.on('close', () => {
    for (const ticker in subscriptions) {
      const clientIndex = subscriptions[ticker].indexOf(ws);
      if (clientIndex > -1) {
        subscriptions[ticker].splice(clientIndex, 1);
      }
    }
    console.log('Client disconnected');
  });
});

function broadcastTickerData(ticker, data) {
  const subscribers = subscriptions[ticker] || [];
  for (const client of [...subscribers]) {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ ticker, ...data }));
    }
  }
}

// Start the interval AFTER the server is listening
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  tickerIntervalId = setInterval(() => {
    const tickers = ['AAPL', 'GOOG', 'MSFT'];
    const randomTicker = tickers[Math.floor(Math.random() * tickers.length)];
    const tickerData = {
      value: 40_979_990_197 + Math.random() * 1,
      timestamp: Date.now(),
    };
    broadcastTickerData(randomTicker, tickerData);
  }, 2000);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  clearInterval(tickerIntervalId);
  console.log('Ticker interval cleared. Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});
