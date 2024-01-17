import React from 'react'
import { overPass } from '@/app/fonts'
import { FaVideo } from 'react-icons/fa'
function VideoCallBox() {
    return (
        <div className='bg-[#051923] h-full flex  px-4 py-4 text-white rounded-lg items-center '>
            <FaVideo size={150} />
            <div className='px-6'>
                <h1 className=' font-bold text-[2rem] mb-3'>Smooth Video Calling</h1>
                <p className={overPass.className}>

                    Embark on a new era of communication with our cutting-edge video calling feature integrated into our chat app. Elevating the traditional messaging experience, our app brings face-to-face interactions to the forefront, enabling you to connect with your loved ones or colleagues seamlessly.
                </p>
            </div>
        </div>

    )
}

export default VideoCallBox