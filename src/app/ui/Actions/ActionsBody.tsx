"use client"
import { useDebouncedCallback } from 'use-debounce'
import { Suspense } from 'react'

import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { fetchUsers } from '../../lib/actions'
import LoadedUsers from './LoadedUsers'
import UserLoadingSkeleton from './UserLoadingSkeleton'
import { User } from '@/app/lib/definitions'

function ActionsBody() {
const [users, setUsers] = useState<User[]>([])
  const getUsers=useDebouncedCallback(
    async ( text:string)=>{
      try {
       if(text.trim().length > 0) {
        const allUsers = await fetchUsers(text);
        setUsers(allUsers);
       }else{
        setUsers([])
       }
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    100)


  return (
    <div className=' h-full py-9 '>
      <div className='bg-gray-200 w-[17em] justify-center items-center py-2 px-2 flex '><input onChange={(e)=>{getUsers(e.target.value)}} type="text" className='  bg-transparent   w-full outline-none' placeholder='Search ' /><IoIosSearch /></div>
 <Suspense fallback={<UserLoadingSkeleton/>}>
<LoadedUsers users={users.length>0 ? users: null }/>
 </Suspense>
    </div>
  )
}

export default ActionsBody


