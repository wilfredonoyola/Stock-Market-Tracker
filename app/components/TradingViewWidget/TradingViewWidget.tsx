import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) {
      return; // If container is not available, do nothing
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol ? symbol.toUpperCase() : "NASDAQ:AAPL"}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.innerHTML = ''; // Clear previous script
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Clean up on unmount
      }
    };
  }, [symbol]); // Depend on symbol to reload the script when it changes

  return (
    <div className="tradingview-widget-container h-128 w-full" ref={container}>
      <div className="tradingview-widget-container__widget h-[calc(100%-32px)] w-full"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="text-blue-500">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
