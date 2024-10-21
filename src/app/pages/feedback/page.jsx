import { FeedbackForm } from '@/app/components/feedback/form'
import Footer from '@/app/components/footer/Footer'
import Navbar from '@/app/components/header/Navbar'
import React from 'react'

const page = () => {
  return (
    <div><Navbar/>
    <FeedbackForm/>
    <Footer/></div>
  )
}

export default page