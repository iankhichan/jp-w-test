/* TODO:
 - need to work on animation ux.
 */
import { useState, useEffect } from 'react';
import { AnimatedNumber } from './animated-number';

export const TickerDisplay = () => {
  const [tickerData, setTickerData] = useState({
    AAPL: { value: 0, timestamp: Date.now() },
    GOOG: { value: 0, timestamp: Date.now() },
  });
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    const subscribedTickers = ['AAPL', 'GOOG'];

    // Function to send subscriptions (no longer needs pendingSubscriptions)
    const sendSubscriptions = () => {
      subscribedTickers.forEach((ticker) => {
        socket.send(JSON.stringify({ type: 'subscribe', ticker }));
      });
    };

    socket.addEventListener('open', () => {
      console.log('Connected to WebSocket server!');
      setConnectionStatus('connected');
      sendSubscriptions();
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.ticker) {
          setTickerData((prevData) => ({
            ...prevData,
            [data.ticker]: {
              value: data.value,
              timestamp: data.timestamp,
            },
          }));
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        setConnectionStatus('error');
      }
    });

    socket.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      setConnectionStatus('disconnected');
    });

    socket.addEventListener('error', () => {
      console.error('Error with WebSocket connection');
      setConnectionStatus('error');
    });

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);
  // useEffect(() => {
  //   const socket = new WebSocket('ws://localhost:3000');

  //   socket.addEventListener('open', () => {
  //     console.log('Connected to WebSocket server!');
  //   });

  //   socket.addEventListener('message', (event) => {
  //     console.log('msg recieved', event);
  //     const data = JSON.parse(event.data);

  //     setTickerData(data);
  //   });

  //   // Cleanup function to close the connection when the component unmounts
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // //   useEffect(() => {

  //     const eventSource = new EventSource('http://localhost:3000/events');

  //     eventSource.onopen = () => {
  //       setConnectionStatus('connected');
  //     };

  //     eventSource.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);

  //         // Check if it's the initial connection message
  //         if (data.connection) {
  //           console.log('SSE Connection established');
  //           return;
  //         }

  //         setTickerData(data);
  //       } catch (error) {
  //         console.error('Error parsing SSE data:', error);
  //       }
  //     };

  //     eventSource.onerror = (error) => {
  //       console.error('SSE Error:', error);
  //       setConnectionStatus('error');
  //       eventSource.close();
  //     };

  //     // Cleanup on component unmount
  //     return () => {
  //       eventSource.close();
  //     };
  //   }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Connection Status */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Live Ticker Data</h1>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              connectionStatus === 'connected'
                ? 'bg-green-100 text-green-800'
                : connectionStatus === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {connectionStatus}
          </div>
        </div>

        {/* Ticker Cards */}
        <div className="space-y-6">
          {/* Ticker 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Ticker 1
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="text-4xl font-bold text-indigo-600">
                <AnimatedNumber value={tickerData['AAPL'].value} />
              </div>
            </div>
          </div>

          {/* Ticker 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Ticker 2
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="text-4xl font-bold text-indigo-600">
                {/* <AnimatedNumber value={tickerData.ticker2Value} /> */}
                <AnimatedNumber value={tickerData['GOOG'].value} />
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="text-center text-sm text-gray-500">
            Last updated:{' '}
            {new Date(tickerData['GOOG'].timestamp).toLocaleString()}
          </div>
        </div>

        {/* Error Message */}
        {connectionStatus === 'error' && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Connection lost. Please refresh the page to reconnect.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
