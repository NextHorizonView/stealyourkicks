"use client";

import BuyPage from '@/app/BuyingFlow/BuyPage';
import { HomePageCards } from '@/app/components/cards/HomePageCards';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log("id",id);
  
  return (
    <>
      {/* BuyPage Section */}
      <div>
        <p>PosId {id}</p>
        <BuyPage shoeid={id}/>
      </div>

      {/* Similar Items Section */}
      <div>
        <h1 className="text-3xl font-bold ml-28">
          Similar Items
        </h1>

        {/* HomePageCards - Ensure it's responsive */}
        <div>
          <HomePageCards />
        </div>
      </div>
    </>
  );
}

export default Page;
