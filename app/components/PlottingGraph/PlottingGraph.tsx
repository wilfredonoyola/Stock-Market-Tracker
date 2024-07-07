'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface StockData {
  name: string;
  price: number;
}

interface PlottingGraphProps {
  stocks: StockData[];
}

const PlottingGraph: React.FC<PlottingGraphProps> = ({ stocks }) => {
  const data = {
    labels: stocks.map(stock => stock.name),
    datasets: [
      {
        label: 'Stock Prices',
        data: stocks.map(stock => stock.price),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price in USD',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Stocks',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Stock Prices Over Time',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PlottingGraph;
