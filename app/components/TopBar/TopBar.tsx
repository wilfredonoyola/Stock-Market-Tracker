import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import StockCard from '../StockCard';
import useWebSocket from 'app/hooks/useWebSocket';
import { StockQuote, WebSocketMessage } from 'app/share/types';


export interface TopBarProps {
  stocks: StockQuote[];
  alertPrice: number;
}

const TopBar: React.FC<TopBarProps> = ({ stocks, alertPrice }) => {
  const [updatedStocks, setUpdatedStocks] = useState<StockQuote[]>(stocks);

  const handleWebSocketMessage = (data: WebSocketMessage[]) => {
    setUpdatedStocks(prevStocks =>
      prevStocks.map(stock => {
        const update = data.find((d: WebSocketMessage) => d.s === stock.symbol);
        return update
          ? {
              ...stock,
              currentPrice: update.p,
              percentChange: ((update.p - stock.currentPrice) / stock.currentPrice) * 100,
            }
          : stock;
      })
    );
  };

  const symbols = stocks.map(stock => stock.symbol);
  useWebSocket(symbols, handleWebSocketMessage);

  useEffect(() => {
    setUpdatedStocks(stocks);
  }, [stocks]);

  return (
    <div className="w-full overflow-x-auto bg-slate-800 shadow-md z-50">
      <div className={`flex py-1 px-2 space-x-1 relative ${styles["scroll-container"]}`}>
        {updatedStocks.map((stock, index) => (
          <div key={index} className="w-400 text-white">
            <StockCard
              symbol={stock.symbol}
              alertPrice={alertPrice}
              currentPrice={stock.currentPrice}
              percentChange={stock.percentChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
