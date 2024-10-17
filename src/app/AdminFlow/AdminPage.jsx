// pages/AdminPage.js
"use client";
import React, { useEffect, useState } from 'react';
import { SidebarComp } from '../components/header/SideBar';
import withAdminAuth from '../lib/contexts/AdminAuth';
import { db } from '../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import ChartComponent from '../components/admin/Chart';

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

  return (
    <div className="flex">
      <SidebarComp />
      {/* <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        {/* Render the ChartComponent */}
        {/* <ChartComponent data={data} /> */}
      {/* </div> */} 
    </div>
  );
};

export default withAdminAuth(AdminPage);
