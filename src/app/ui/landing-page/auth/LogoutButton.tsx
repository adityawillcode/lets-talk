"use client"

import { signOut } from "next-auth/react"

function LogoutButton({children}:{children:React.ReactNode}) {
  return (
    <div>
         <button onClick={()=>{signOut()}} className='border-[1px] transition-all duration-75 hover:bg-white hover:text-black font-bold rounded-md  px-3 py-2  border-white/80'>{children}</button>
    </div>
  )
}

export default LogoutButton