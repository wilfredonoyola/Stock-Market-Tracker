'use client';

import StockCard from "./components/StockCard";
import TopBar from "./components/TopBar";
import FormAlert from "./components/FormAlert";
import { useEffect, useState } from "react";
import { fetchStocksData } from "./utils/finnhub-client";
import { FormDataAlert, StockQuote } from 'app/share/types';
import TradingViewWidget from "./components/TradingViewWidget";
import SkeletonLoader from "./components/SkeletonLoader";

export default function Home() {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [selectedStocks, setSelectedStocks] = useState<string>('');
  const [priceAlert, setPriceAlert] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStocks = async () => {
      const data = await fetchStocksData();
      setStocks(data);
      
    };

    fetchStocks().then((stocks: any) => {
      setLoading(false);
    });
  }, []);

  const handleFormSubmit = (formData: FormDataAlert) => {
    setSelectedStocks(formData.symbol)
    setPriceAlert(formData.alertPrice);
  };

  if(loading){
    return <SkeletonLoader></SkeletonLoader>;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-start">
      {/* <TopBar>
        {stocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            percentChange={stock.percentChange}
            currentPrice={stock.currentPrice || 0}
            symbol={stock.symbol}
            alertPrice={priceAlert}
          />
        ))}
      </TopBar> */}
       <TopBar  alertPrice={priceAlert} stocks={stocks}/>

      <div className="flex justify-center w-full h-[500px]">
        <div className="w-full lg:w-1/5 p-4">
          <FormAlert
            onSubmit={handleFormSubmit}
            stockNames={stocks.map((stock) => stock.symbol)}
          />
        </div>
        <div className="hidden lg:block w-full lg:w-4/5 mt-4 mr-3">
        <TradingViewWidget symbol={selectedStocks} />
        </div>
      </div>
    </main>
  );
}
