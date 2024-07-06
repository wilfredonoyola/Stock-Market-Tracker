import React from 'react';

export interface StockInfoCardsProps {
  stockName: string;
  value: number;
  changePercent: number;
}

const StockInfoCards: React.FC<StockInfoCardsProps> = ({ stockName, value, changePercent }) => {
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-indigo-950 p-3">
      <div className="font-bold text-md mb-2">
        {stockName}
        <span className="text-white font-normal ml-3 text-xs">{value.toFixed(2)}</span>
      </div>
      <p
        className={`text-base text-center ${
          changePercent > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {changePercent.toFixed(2)}%
      </p>
    </div>
  );
};

export default StockInfoCards;
