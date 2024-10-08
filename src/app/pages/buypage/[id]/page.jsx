import BuyPage from '@/app/BuyingFlow/BuyPage';
import { HomePageCards } from '@/app/components/cards/HomePageCards';
import React from 'react';

const Page = () => {
  return (
    <>
      {/* BuyPage Section */}
      <div>
        <BuyPage />
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
