'use client'

import BuyNow from '@/app/BuyingFlow/BuyNow'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const size = searchParams.get('size')

  console.log("id at buynow",id);
  console.log("size at buynow",size);

  return (
    <div><BuyNow shoeid={id} size={size}/></div>
  )
}

export default Page