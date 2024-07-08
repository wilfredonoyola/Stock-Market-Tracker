'use client';

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
      <TopBar alertPrice={priceAlert} stocks={stocks} />
      <div className="flex flex-col lg:flex-row justify-start w-full md:h-[500px] h-[800px]">
        <div className="w-full lg:w-1/5 p-4">
          <FormAlert
            onSubmit={handleFormSubmit}
            stockNames={stocks.map((stock) => stock.symbol)}
          />
        </div>
        <div className="sm:w-full md:w-full lg:w-4/5 mt-2 md:mt-4 px-2 sm:px-2 lg:mr-3 h-[300px] md:h-full">
          <TradingViewWidget symbol={selectedStocks} />
        </div>
      </div>
    </main>
  );
}
