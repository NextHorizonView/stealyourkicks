"use client";
import React, { useEffect, useState } from 'react';
import { SidebarComp } from '../components/header/SideBar';
import withAdminAuth from '../lib/contexts/AdminAuth';
import { Bar } from 'react-chartjs-2'; // Import Bar chart
import { Chart, registerables } from 'chart.js';
import { db } from '../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

Chart.register(...registerables); // Register necessary components

const AdminPage = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalAuctions: 0,
  });

  useEffect(() => {
    // Fetch your totals from Firestore
    const fetchData = async () => {
      try {
        const ordersCount = await getCountFromServer(collection(db, 'Orders'));
        const usersCount = await getCountFromServer(collection(db, 'Users'));
        const productsCount = await getCountFromServer(collection(db, 'Products'));
        const auctionsCount = await getCountFromServer(collection(db, 'Auctions'));

        setData({
          totalOrders: ordersCount.data().count,
          totalUsers: usersCount.data().count,
          totalProducts: productsCount.data().count,
          totalAuctions: auctionsCount.data().count,
        });
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };
    
    fetchData();
  }, []);

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
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex">
      <SidebarComp />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="bg-white p-4 rounded shadow">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(AdminPage);
