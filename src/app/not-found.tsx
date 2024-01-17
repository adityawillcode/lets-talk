import React from 'react'
import Image from 'next/image'

function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
        <Image src={'/Images/OOPS.png'} width={150} height={150} alt='not-found'/>
        <h1 className='text-[3rem] font-bold '>404</h1>
    </div>
  )
}

export default NotFound