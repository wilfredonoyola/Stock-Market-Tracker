"use client"


import React, { useState } from 'react';

interface FormAlertProps {
  stockNames: string[];
  onSubmit: (formData: { stockName: string; alertPrice: number }) => void;
}

const FormAlert: React.FC<FormAlertProps> = ({ stockNames, onSubmit }) => {
  // Verificar si estamos en el cliente antes de usar useState
  const [selectedStock, setSelectedStock] =  useState<string>('') ;
  const [alertPrice, setAlertPrice] =  useState<number>(0) ;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ stockName: selectedStock, alertPrice });
    // // Reset form fields after submission if needed
    // setSelectedStock('');
    // setAlertPrice(0);
  };

  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-slate-900 p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="stockName" className="block text-white text-sm font-bold mb-2">
            Select Stock Name:
          </label>
          <select
            id="stockName"
            className="block appearance-none w-full bg-slate-800 border border-gray-300 text-white py-2 px-3 rounded leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            required
          >
            <option value="all">All</option>
            {stockNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="alertPrice" className="block text-white text-sm font-bold mb-2">
            Alert Price:
          </label>
          <input
            type="number"
            id="alertPrice"
            className="block appearance-none w-full bg-slate-800 border border-gray-300 text-white py-2 px-3 rounded leading-tight focus:outline-none focus:bg-slate-900 focus:border-gray-500"
            value={alertPrice}
            onChange={(e) => setAlertPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-950 hover:bg-indigo-950 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Create Alert
        </button>
      </form>
    </div>
  );
};

export default FormAlert;
