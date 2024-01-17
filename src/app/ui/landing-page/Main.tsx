import React from 'react'
import SecureChatBox from './SecureChatBox'
import VideoCallBox from './VideoCallBox'
import UpiSupportBox from './UpiSupport'
import Image from 'next/image'


function Main() {
    return (
        <div className='bg-[#ffb703]  md:flex w-full py-[2rem] px-[2rem] '>
            <div className='flex gap-[2rem] flex-col'>
                <div className='flex gap-5 '>
                    <SecureChatBox />
          <Image src="/Animations/AnimationCHATTING.gif" className='hidden lg:block' width={250} height={50} alt="" />
                </div>
                <div className='flex gap-5'>
                    <VideoCallBox/>
          <Image src="/Animations/AnimationVC.gif" className='hidden lg:block' width={250} height={50} alt="" />
                </div>
                <div className='flex gap-5 '>
                    <UpiSupportBox />
          <Image src="/Animations/AnimationUPI.gif" className='hidden lg:block' width={250} height={50} alt="" />
                </div>
            </div>

        </div>
    )
}

export default Main