import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_FINNUB_API_KEY as string; 
const FINNUB_API_URL = process.env.NEXT_PUBLIC_FINNUB_API_URL as string;
const MAX_DATA = 5

export const fetchStocksData = async () => {
  try {
    const response = await axios.get(`${FINNUB_API_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    const symbols = response.data.slice(0, MAX_DATA); 

    // Fetch detailed data for each stock
    const detailedDataPromises = symbols.map(async (stock: { symbol: string }) => {
      const stockDetailResponse = await axios.get(`${FINNUB_API_URL}/quote?symbol=${stock.symbol}&token=${API_KEY}`);
      return {
        symbol: stock.symbol,
        ...stockDetailResponse.data,
      };
    });

    const detailedData = await Promise.all(detailedDataPromises);
    return detailedData;
  } catch (error) {
    console.error('Error fetching stocks list:', error);
    return [];
  }
};