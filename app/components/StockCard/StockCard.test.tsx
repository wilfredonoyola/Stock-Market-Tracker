import React from 'react';
import { render } from '@testing-library/react';
import StockCard from './StockCard';

describe('StockCard', () => {
  it('renders without crashing and displays correct information', () => {
    const stock = {
      symbol: 'AAPL',
      currentPrice: 150,
      percentChange: 1.5,
      alertPrice: 140,
    };

    const { getByText } = render(<StockCard {...stock} />);

    expect(getByText('AAPL')).toBeInTheDocument();
    expect(getByText('150.00')).toBeInTheDocument();
    expect(getByText('1.50%')).toBeInTheDocument();
  });

  it('applies correct class based on price comparison', () => {
    const stock = {
      symbol: 'AAPL',
      currentPrice: 150,
      percentChange: 1.5,
      alertPrice: 140,
    };

    const { getByText } = render(<StockCard {...stock} />);
    expect(getByText('1.50%')).toHaveClass('text-green-500');
  });
});
