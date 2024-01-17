import React from 'react'
import {overPass} from '@/app/fonts'
import {FaRupeeSign} from 'react-icons/fa'
function UpiSupportBox
() {
  return (
    <div className='bg-[#023e8a] flex relative text-white px-4 py-4 items-center rounded-lg'>
    <FaRupeeSign size={140} className='md:text-gray-200'/>
    <div className='px-6 '> 
    <h1 className=' font-bold text-[2rem] mb-3'>Secure Payments</h1>
        <p className={overPass.className}>
     
Introducing seamless and secure payments in our new app through UPI (Unified Payments Interface). Your transactions are shielded with advanced encryption, ensuring that your financial information remains confidential and protected. 
        </p>
    </div>
  </div>
  
  )
}

export default UpiSupportBox
