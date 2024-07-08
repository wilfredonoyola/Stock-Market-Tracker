import React from 'react';
import { render } from '@testing-library/react';
import TradingViewWidget from './TradingViewWidget';

describe('TradingViewWidget', () => {
  it('renders without crashing', () => {
    const { container } = render(<TradingViewWidget symbol="AAPL" />);
    expect(container).toBeInTheDocument();
  });

  it('contains the TradingView script', () => {
    const { container } = render(<TradingViewWidget symbol="AAPL" />);
    const script = container.querySelector('script');
    expect(script).toBeInTheDocument();
  });
});
