import React, { useContext, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const LineChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Create a reference to store the chart instance
  const chartRef = useRef(null);

  const labels = transactions.map(transaction => transaction.text);
  const dataPoints = transactions.map(transaction => transaction.amount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses/Income Over Time',
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();  // Destroy the chart instance
      }
    };
  }, []);

  return (
    <div className="chart-container">
      <h3>Transaction Chart</h3>
      <Line data={data} ref={chartRef} />
    </div>
  );
};
