import axios from 'axios';
import { StockQuote, SymbolResponse, QuoteResponse } from '../share/types';

// Get the API key and base URL from environment variables
const API_KEY = process.env.NEXT_PUBLIC_FINNUB_API_KEY as string; 
const FINNUB_API_URL = process.env.NEXT_PUBLIC_FINNUB_API_URL as string;
const MAX_DATA = 5;

/**
 * Function to fetch stock data from the Finnhub API.
 * 
 * @returns {Promise<StockQuote[]>} A promise that resolves to a list of stock quotes.
 */
export const fetchStocksData = async (): Promise<StockQuote[]> => {
  try {
    // Perform a GET request to get a list of US stock symbols
    const response = await axios.get<SymbolResponse[]>(`${FINNUB_API_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    
    // Take the first MAX_DATA symbols from the response, for now, we will use a few stocks to minimize API consumption.
    // Later, we need to optimize the way we make requests, possibly with pagination or similar to avoid too many requests.
    const symbols = response.data.slice(0, MAX_DATA); 

    // Manually add additional well-known stocks
    // This is a test, and we want it to look like 'finnhub.io'. I've added some well-known stocks.
    const additionalSymbols = [
      { symbol: "AAPL" },
      { symbol: "AMZN" },
      { symbol: "MSFT" },
      { symbol: "TSLA" },
    ];
    // Combine the additional symbols with the symbols obtained from the API
    const allSymbols = [ ...additionalSymbols, ...symbols];

    // Fetch detailed data for each stock
    const detailedDataPromises = allSymbols.map(async (stock) => {
      const stockDetailResponse = await axios.get<QuoteResponse>(`${FINNUB_API_URL}/quote?symbol=${stock.symbol}&token=${API_KEY}`);
      return {
        symbol: stock.symbol,
        currentPrice: stockDetailResponse.data.c ?? 0,
        percentChange: stockDetailResponse.data.dp ?? 0.0,
      };
    });

    // Wait for all detailed data requests to complete
    const detailedData = await Promise.all(detailedDataPromises);
    return detailedData;
  } catch (error) {
    // Error handling: log the error and return an empty list
    console.error('Error fetching stocks list:', error);
    return [];
  }
};
