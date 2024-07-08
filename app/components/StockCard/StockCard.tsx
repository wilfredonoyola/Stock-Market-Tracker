'use client';


import { StockQuote } from 'app/share/types';
import React from 'react';


interface StockCardProps extends StockQuote {
  alertPrice: number;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, currentPrice, percentChange, alertPrice }) => {
  const cardColor = currentPrice < alertPrice ? 'text-red-500' : 'text-green-500';

  return (
    <div className={`rounded-md overflow-hidden shadow-lg bg-slate-900 p-3`}>
      <div className="font-bold text-md mb-2">
        {symbol}
        <span className="text-white font-normal ml-3 text-xs">
          {currentPrice?.toFixed(2)}
        </span>
      </div>
      <p className={`text-base text-center  ${cardColor}`}>
        {percentChange?.toFixed(2)}%
      </p>
    </div>
  );
};

export default StockCard;
