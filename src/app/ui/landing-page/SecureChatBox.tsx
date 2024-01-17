import React from 'react'
import { overPass } from '@/app/fonts'
import { FaLock } from 'react-icons/fa'
function SecureChatBox() {
    return (
        <div className='bg-[#00a6fb]   px-4 py-4 flex rounded-lg'>
            <FaLock size={140} className='md:text-blue-200' />
            <div className='px-5'>
                <h1 className=' font-bold text-[2rem] mb-3'>Secure Chats</h1>
                <p className={overPass.className}>
                    Introducing our innovative chat app — a seamless platform designed to elevate your communication experience. Our app prioritizes simplicity, speed, and security, offering a user-friendly interface that ensures effortless navigation
                </p>
            </div>
        </div>

    )
}

export default SecureChatBox