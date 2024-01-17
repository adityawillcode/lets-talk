'use client' 
import React from 'react'
import Image from 'next/image';
function BgImage() {
  return (
    <Image
    src="/Images/bg1.jpg"
    layout="fill"
    objectFit="cover"
    alt="Background image"
    className='absolute inset-0 z-0' 
  />
  )
}

export default BgImage