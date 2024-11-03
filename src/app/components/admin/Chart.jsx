import React from 'react';
import { Bar } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';

// Register all required components including scales
Chart.register(...registerables);

const ChartComponent = ({ data = { totalOrders: 0, totalUsers: 0, totalProducts: 0, totalAuctions: 0,totalFeedback: 0 } }) => {
  const chartData = {
    labels: ['Total Orders', 'Total Users', 'Total Products', 'Total Auctions', 'Total Feedback'],
    datasets: [
      {
        label: 'Totals',
        data: [
          data.totalOrders,
          data.totalUsers,
          data.totalProducts,
          data.totalAuctions,
          data.totalFeedback,
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
       <h2 className="text-2xl font-bold mb-4 items-center">Admin Dashboard</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
