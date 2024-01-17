'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
interface ButtonProps{
    children:React.ReactNode,
    className:string,
    href:string,
}
const Button : React.FC<ButtonProps>= ({children,className,href}) =>{

  return (
     <Link href={href}  className={className}>
      {children}
     </Link>
    
  )
}

export default Button