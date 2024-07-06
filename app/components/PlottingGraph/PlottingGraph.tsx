"use client";

import React from 'react';
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
} from "chart.js";
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface StockData {
  name: string;
  price: number;
}

interface StockChartProps {
  stocks?: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ stocks = [] }) => {
  const data = React.useMemo(() => {
    const labels: string[] = [];
    const totalValues: number[] = [];
    let totalPortfolioValue = 0;

    if (stocks && Array.isArray(stocks)) {
      stocks.forEach((stock) => {
        totalPortfolioValue += stock.price;
        totalValues.push(totalPortfolioValue);
        labels.push(stock.name);
      });
    }

    return {
      labels,
      datasets: [
        {
          label: 'Total Portfolio Value in USD',
          data: totalValues,
          borderColor: 'blue',
          backgroundColor: 'rgba(75,192,192,0.4)',
        },
      ],
    };
  }, [stocks]);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value in USD',
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
        text: 'Total Portfolio Value Over Time',
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

  return (
    <div className="stock-chart" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <h2>Total Portfolio Value Chart</h2>
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default StockChart;
