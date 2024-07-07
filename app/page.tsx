'use client';

import StockCard from "./components/StockCard";
import TopBar from "./components/TopBar";
import FormAlert from "./components/FormAlert";
import PlottingGraph from "./components/PlottingGraph";
import { useEffect, useState } from "react";
import { fetchStocksData } from "./utils/finnhub-client";
import io from 'socket.io-client';

const WEB_SOCKET_URL = process.env.NEXT_PUBLIC_WEB_SOCKET_URL;
const API_KEY = process.env.NEXT_PUBLIC_FINNUB_API_KEY;

export default function Home() {
  const [stocks, setStocks] = useState<any[]>([]);
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

  useEffect(() => {
    if (selectedStock && WEB_SOCKET_URL && API_KEY) {
      console.log(`Subscribing to ${selectedStock}`);
      const newSocket = io(`${WEB_SOCKET_URL}?token=${API_KEY}`,{});
      setSocket(newSocket);

      newSocket.emit('subscribe', selectedStock);

      newSocket.on('stock data', (data: any) => {
        console.log('Received stock data: ', data);
        setStocks((prevStocks) => {
          const newStocks = [...prevStocks];
          const stockIndex = newStocks.findIndex(stock => stock.symbol === data.symbol);
          if (stockIndex > -1) {
            newStocks[stockIndex] = { ...newStocks[stockIndex], ...data };
          } else {
            newStocks.push(data);
          }
          return newStocks.slice(0, 100); // Asegurar que no pasamos de 100 elementos
        });
      });

      return () => {
        console.log(`Unsubscribing from ${selectedStock}`);
        newSocket.emit('unsubscribe', selectedStock);
        newSocket.disconnect();
      };
    }
  }, [selectedStock]);

  const handleFormSubmit = (formData: { stockName: string; alertPrice: number }) => {
    setSelectedStock(formData.stockName);
    setPriceAlert(formData.alertPrice);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-start">
      <TopBar>
        {stocks.map(stock => (
          <StockCard
            key={stock.symbol}
            changePercent={stock.dp !== undefined ? stock.dp : 0}  // Proveer un valor por defecto
            value={stock.c !== undefined ? stock.c : 0}  // Proveer un valor por defecto
            stockName={stock.symbol}
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
        <div className="hidden lg:block w-full lg:w-4/5 p-4">
          <PlottingGraph stocks={stocks} />
        </div>
      </div>
    </main>
  );
}
