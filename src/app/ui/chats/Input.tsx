"use client"
import { IoIosSearch, IoIosSend } from 'react-icons/io'
export const SearchConversationInput = () => {
  return (
    <div className='px-14 py-4 border-b w-full' >
      <div className="bg-gray-200 rounded-md flex pr-8 py-1">
        <input type="text" placeholder='Search Conversations' className='bg-transparent placeholder:text-gray-600 outline-none  px-4 h-[2rem] w-full' />
        <button><IoIosSearch size={25} /></button>
      </div>
    </div>
  )
}


