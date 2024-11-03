'use client'

import CartBuyNow from '@/app/BuyingFlow/CartBuyNow'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const searchParams = useSearchParams()
  const sizesParam = searchParams.get('sizes'); // Get the sizes parameter
  const sizeData = {};

  // If sizesParam exists, parse it into an object
  if (sizesParam) {
    sizesParam.split(',').forEach(sizeInfo => {
      const [productId, sizeName] = sizeInfo.split(':'); // Split into ID and size
      sizeData[productId] = sizeName; // Create an object where key is productId and value is sizeName
    });
  }

  console.log("Sizes Data at BuyNow", sizeData); // Check the parsed size data

  return (
    <div>
      <CartBuyNow sizeData={sizeData} /> {/* Pass the sizeData to BuyNow */}
    </div>
  )
}

export default Page;
