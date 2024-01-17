import Link from 'next/link'
import React from 'react'
import {BsInstagram,BsTwitter,BsFacebook,BsGithub} from 'react-icons/bs'
import {FaUserAlt} from 'react-icons/fa'
function Footer() {
  const social=[
    {
      icon:BsInstagram,href:'https://www.instagram.com'
    },
    {
      icon:BsFacebook,href:'https://www.facebook.com'
    },
    {
      icon:BsTwitter,href:'https://www.twitter.com'
    },
    {
      icon:BsGithub,href:'https://www.github.com'
    },
    {
      icon:FaUserAlt,href:''
    },
  ]
  return (
    <div className=' flex w-screen justify-center items-center  h-[5rem] bg-black/90 text-white'>
       <div className='flex gap-[4rem] text-gray-400 '>
      {
        social.map((element,index)=>{
          const Icon=element.icon
          return(
            <Link key={index} href={element.href} ><Icon/></Link>
          )
        })
      }
       </div>
    </div>
  )
}

export default Footer