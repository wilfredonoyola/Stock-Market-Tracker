'use client';

import StockCard from "./components/StockCard";
import TopBar from "./components/TopBar";
import FormAlert from "./components/FormAlert";
// import PlottingGraph from "./components/PlottingGraph";
import { useEffect, useState } from "react";
import { fetchStocksData } from "./utils/finnhub-client";
import io from 'socket.io-client';
import { StockData, FormDataAlert, StockQuote } from '@/app/share/types';

const WEB_SOCKET_URL = `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL}?token=${process.env.NEXT_PUBLIC_FINNUB_API_KEY}`;

export default function Home() {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [priceAlert, setPriceAlert] = useState<number>(0);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const data = await fetchStocksData();
      setStocks(data);
    };

    fetchStocks().then((stocks: any) => {
      console.log('Stocks : ', stocks);
    });
  }, []);

  // useEffect(() => {
  //   if (selectedStock && WEB_SOCKET_URL) {
  //     console.log(`Subscribing to ${selectedStock}`);
  //     const newSocket = io(WEB_SOCKET_URL, {
  //       transports: ["websocket"], // Use WebSocket only
  //     });
  //     setSocket(newSocket);

  //     newSocket.emit('subscribe', { symbol: selectedStock });

  //     newSocket.on('trade', (data: StockData) => {
  //       console.log('Received stock data: ', data);
  //       setStocks((prevStocks) => {
  //         const newStocks = [...prevStocks];
  //         const stockIndex = newStocks.findIndex(stock => stock.symbol === data.s);
  //         if (stockIndex > -1) {
  //           newStocks[stockIndex] = { symbol: data.s, currentPrice: data.c, percentChange: data.dp };
  //         } else {
  //           newStocks.push({ symbol: data.s, currentPrice: data.c, percentChange: data.dp });
  //         }
  //         return newStocks.slice(0, 5); 
  //       });
  //     });

  //     return () => {
  //       console.log(`Unsubscribing from ${selectedStock}`);
  //       newSocket.emit('unsubscribe', { symbol: selectedStock });
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [selectedStock]);

  const handleFormSubmit = (formData: FormDataAlert) => {
    setSelectedStock(formData.stockName);
    setPriceAlert(formData.alertPrice);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-start">
      <TopBar>
        {stocks.map(stock => (
          <StockCard
            key={stock.symbol}
            percentChange={stock.percentChange}
            currentPrice={stock.currentPrice}  // Proveer un valor por defecto
            symbol={stock.symbol}
            alertPrice={priceAlert}
          />
        ))}
      </TopBar>

      <div className="flex justify-center w-full">
        <div className="w-full lg:w-1/5 p-4">
          <FormAlert
            onSubmit={handleFormSubmit}
            stockNames={stocks.map(stock => stock.symbol)}
          />
        </div>
        {/* <div className="hidden lg:block w-full lg:w-4/5 p-4">
          <PlottingGraph stocks={stocks} />
        </div> */}
      </div>
    </main>
  );
}
