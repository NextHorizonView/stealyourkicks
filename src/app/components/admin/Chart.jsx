import React from 'react';
import { Bar } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';

// Register all required components including scales
Chart.register(...registerables);

const ChartComponent = ({ data = { totalOrders: 0, totalUsers: 0, totalProducts: 0, totalAuctions: 0 } }) => {
  const chartData = {
    labels: ['Total Orders', 'Total Users', 'Total Products', 'Total Auctions'],
    datasets: [
      {
        label: 'Totals',
        data: [
          data.totalOrders,
          data.totalUsers,
          data.totalProducts,
          data.totalAuctions,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: 'linear', // Explicitly define the scale
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;