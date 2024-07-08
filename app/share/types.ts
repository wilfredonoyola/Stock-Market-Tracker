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
    symbol: string;
    alertPrice: number;
}

export interface TradeData {
    s: string; // Symbol
    p: number; // Price
    t: number; // Timestamp
    v: number; // Volume
    c: string[]; // Conditions
}

export interface WebSocketMessage {
    s: string; // symbol
    p: number; // current price
  }



  

  