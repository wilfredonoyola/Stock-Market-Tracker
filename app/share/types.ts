export interface SymbolResponse {
    symbol: string;
  }
  
export interface QuoteResponse {
    c: number; // Current price
    dp: number; // Percent change
    d: number;  // Change
    h: number;  // High price of the day
    l: number;  // Low price of the day
    o: number;  // Open price of the day
    pc: number; // Previous close price
}

export interface StockData {
    s: string; // Symbol of the stock
    c: number; // Current price
    dp: number; // Percent change
}
  
export interface StockQuote {
    symbol: string;
    currentPrice: number;
    percentChange: number;
}
  
export interface FormDataAlert {
    stockName: string;
    alertPrice: number;
}

  