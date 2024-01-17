import React from 'react'

function UserLoadingSkeleton() {
  return (
    <div className='w-full h-full flex flex-col'>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
         <div  className='flex px-1 py-3 gap-5'>
          <span className='h-5 w-5 rounded-full bg-gray-400'></span>
          <span className='w-[50px] bg-gray-400'></span>
        </div>
        
    </div>
  )
}

export default UserLoadingSkeleton