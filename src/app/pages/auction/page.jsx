import { AuctionCard } from '@/app/AuctionFlow/AuctionCards'
import Navbar from '@/app/components/header/Navbar'
import Footer from "../../components/Footer/Footer"
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