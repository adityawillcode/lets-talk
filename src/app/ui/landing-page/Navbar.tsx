
import React from 'react'
import Button from './Button'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import LogoutButton from './auth/LogoutButton'
import Image from 'next/image'
const links=[
    {
    buttonName:'Sign Up',
    href:'/auth/signup'
    },
    {
    buttonName:'Sign In',
    href:'/auth/login'
    }
]
export default async function Navbar() {
const session=await getServerSession(authOptions)
  return (
    <main className='bg-[#001d3d] w-full fixed z-10 items-center h-[5rem] flex justify-between px-5 gap-3 py-5 text-white'>
      <div className='text-white '><Image src={'/Images/santaIcon.png'} width={50} height={50} alt='logo'/></div>
    <div className='flex gap-4  '>
   
    {  session ?
    <LogoutButton >logout</LogoutButton>:links.map((link,index)=>{
            return (
                <Button  key={index} href={link.href} className='border-[1px] transition-all duration-75 hover:bg-white hover:text-black font-bold rounded-md  px-3 py-2  border-white/80'>{link.buttonName}</Button>
            )
        })
     }
    </div>
    </main>
  )
}
