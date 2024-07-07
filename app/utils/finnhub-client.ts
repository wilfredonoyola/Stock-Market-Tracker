import axios from 'axios';
import { StockQuote,SymbolResponse , QuoteResponse} from '../share/types';

const API_KEY = process.env.NEXT_PUBLIC_FINNUB_API_KEY as string; 
const FINNUB_API_URL = process.env.NEXT_PUBLIC_FINNUB_API_URL as string;
const MAX_DATA = 8;


export const fetchStocksData = async (): Promise<StockQuote[]> => {
  try {
    const response = await axios.get<SymbolResponse[]>(`${FINNUB_API_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    const symbols = response.data.slice(0, MAX_DATA); 

    // Manually add additional stocks
    const additionalSymbols = [
      { symbol: "AAPL" },
      { symbol: "AMZN" },
      { symbol: "MSFT" },
      { symbol: "TSLA" },
    ];
    const allSymbols = [ ...additionalSymbols, ...symbols];

    // Fetch detailed data for each stock
    const detailedDataPromises = allSymbols.map(async (stock) => {
      const stockDetailResponse = await axios.get<QuoteResponse>(`${FINNUB_API_URL}/quote?symbol=${stock.symbol}&token=${API_KEY}`);
      console.log('Symbol:', stock.symbol);
      console.log('Stock details:', stockDetailResponse.data);
      return {
        symbol: stock.symbol,
        currentPrice: stockDetailResponse.data.c ?? 0,
        percentChange: stockDetailResponse.data.dp ?? 0.0,
      };
    });

    const detailedData = await Promise.all(detailedDataPromises);
    return detailedData;
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    return [];
  }
};