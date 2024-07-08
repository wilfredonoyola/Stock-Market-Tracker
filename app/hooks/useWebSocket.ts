import { useEffect, useRef } from 'react';
import { TradeData } from '../share/types';

const useWebSocket = (symbols: string[], onMessage: (data: TradeData[]) => void) => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<TradeData[] | null>(null);

  const connectWebSocket = (): WebSocket => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}/?token=${process.env.NEXT_PUBLIC_FINNUB_API_KEY}`
    );

    socketRef.current = socket;

    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
      symbols.forEach(symbol => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'subscribe', symbol }));
        }
      });
    });

    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.type === 'trade') {
        const newData = message.data as TradeData[];
        
        if (previousDataRef.current) {
          const hasChanged = !arraysEqual(previousDataRef.current, newData);
          if (hasChanged) {
            console.log('Data has changed:', newData);
          } else {
            console.log('Data has not changed.');
          }
        }

        previousDataRef.current = newData;
        onMessage(newData);
      }
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed. Reconnecting...');
    });

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      socket.close();
    });

    return socket;
  };

  useEffect(() => {
    if (!symbols.length) return;

    const socket = connectWebSocket();

    return () => {
      if (reconnectRef.current) {
        clearTimeout(reconnectRef.current);
      }
      if (socketRef.current) {
        symbols.forEach(symbol => {
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
          }
        });
        socketRef.current.close();
      }
    };
  }, [symbols, onMessage]);

  const arraysEqual = (a: TradeData[], b: TradeData[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].s !== b[i].s || a[i].p !== b[i].p) return false;
    }
    return true;
  };

  return socketRef.current;
};

export default useWebSocket;
