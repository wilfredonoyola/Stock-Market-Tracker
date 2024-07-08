'use client';

import { FormDataAlert } from 'app/share/types';
import React, { useState, useEffect } from 'react';

interface FormAlertProps {
  stockNames: string[];
  onSubmit: (formData: FormDataAlert) => void;
}

const FormAlert: React.FC<FormAlertProps> = ({ stockNames, onSubmit }) => {
  const [selectedStock, setSelectedStock] = useState<string>(stockNames.length > 0 ? stockNames[0] : '');
  const [alertPrice, setAlertPrice] = useState<number>(10);

  useEffect(() => {
    if(stockNames.length > 0){
      onSubmit({alertPrice: alertPrice, symbol:  stockNames[0]})
    }
   
  }, []);

  useEffect(() => {
    if (selectedStock && alertPrice > 0) {
      onSubmit({ symbol: selectedStock, alertPrice });
    }
  }, [selectedStock, alertPrice, onSubmit]);

  useEffect(() => {
    if (stockNames.length > 0 && !selectedStock) {
      setSelectedStock(stockNames[0]);
    }
  }, [stockNames]);

  return (
    <div className="rounded-sm overflow-hidden shadow-lg bg-slate-900 p-3">
      <div className="mb-4">
        <label
          htmlFor="stockName"
          className="block text-white text-sm font-bold mb-2"
        >
          Select Stock Name:
        </label>
        <select
          id="stockName"
          className="block appearance-none w-full bg-slate-800 border border-gray-300 text-white py-2 px-3 rounded leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          required
        >
          <option value="">Seleccione una acción</option>
          {stockNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="alertPrice"
          className="block text-white text-sm font-bold mb-2"
        >
          Alert Price:
        </label>
        <input
          min={0}
          type="number"
          id="alertPrice"
          className="block appearance-none w-full bg-slate-800 border border-gray-300 text-white py-2 px-3 rounded leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500"
          value={alertPrice}
          onChange={(e) => setAlertPrice(parseFloat(e.target.value))}
          required
        />
      </div>
    </div>
  );
};

export default FormAlert;
