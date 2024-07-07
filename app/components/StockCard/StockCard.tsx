'use client';

import React from 'react';

interface StockCardProps {
  stockName: string;
  value: number;
  changePercent: number;
  alertPrice: number;
}

const StockCard: React.FC<StockCardProps> = ({ stockName, value, changePercent, alertPrice }) => {
  const cardColor = value < alertPrice ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`rounded-md overflow-hidden shadow-lg ${cardColor} p-3`}>
      <div className="font-bold text-md mb-2">
        {stockName}
        <span className="text-white font-normal ml-3 text-xs">{ value?.toFixed(2)}</span>
      </div>
      <p className={`text-base text-center`}>
        {changePercent?.toFixed(2)}%
      </p>
    </div>
  );
};

export default StockCard;
