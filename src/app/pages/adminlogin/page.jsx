
import React from 'react'
import { AdminLogin } from '@/app/components/admin/AdminLogin'
import Navbar from '@/app/components/header/Navbar'

const page = () => {
    return (
        <div>
            <div><Navbar />
                <AdminLogin />
            </div>
            </div>
    )
}

export default page