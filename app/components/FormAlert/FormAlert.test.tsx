import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormAlert from './FormAlert';

describe('FormAlert', () => {
  const mockSubmit = jest.fn();
  const stockNames = ['AAPL', 'AMZN', 'MSFT'];

  it('renders without crashing and sets default values', () => {
    const { getByLabelText } = render(
      <FormAlert stockNames={stockNames} onSubmit={mockSubmit} />
    );

    const stockSelect = getByLabelText('Select Stock Name:') as HTMLSelectElement;
    const alertPriceInput = getByLabelText('Alert Price:') as HTMLInputElement;

    expect(stockSelect.value).toBe(stockNames[0]);
    expect(alertPriceInput.value).toBe('10');
  });

  it('calls onSubmit with correct data when inputs change', () => {
    const { getByLabelText } = render(
      <FormAlert stockNames={stockNames} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText('Alert Price:') as HTMLInputElement, { target: { value: '20' } });
    fireEvent.change(getByLabelText('Select Stock Name:') as HTMLSelectElement, { target: { value: 'AMZN' } });

    expect(mockSubmit).toHaveBeenCalledWith({ symbol: 'AMZN', alertPrice: 20 });
  });
});
