import { AuctionCard } from '@/app/AuctionFlow/AuctionCards'
import Footer from '@/app/components/footer/Footer'
import Navbar from '@/app/components/header/Navbar'
import React from 'react'

const page = () => {
  return (

    <div>
        <Navbar/>
        <AuctionCard/>
        <Footer/>
        </div>
  )
}
export default page