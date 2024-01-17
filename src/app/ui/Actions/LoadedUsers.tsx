import { ConversationContext } from '@/app/Context/ConversationProvider';
import { createConverastion } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { FaUserPlus } from 'react-icons/fa';

 
 function LoadedUsers({users}:{users:User[] | null}) {

const {session}=useContext(ConversationContext)

const myId=session?.user?.myId
const [errorMessage,setErrorMessage] = useState(null)

  const createNewConversation=async (userId:string)=>{
    const newConversation=await createConverastion(myId!,userId)
    if(newConversation.errorMessage){
      setErrorMessage(errorMessage)
    }
  }
  

 if (users){
} return (
   <div className='h-full w-full border-t py-4 flex flex-col '>
{  
users &&
     users!.map((user,i)=>{
       return(
         <div  key={i} className='flex px-1  py-3 gap-[8rem]'>
          <div className='flex gap-[2rem]'>
          <span><Image src={user.image? user.image: "/Images/defaultProfile.png"} width={20} height={20} alt='profile'/></span>
           <span>{user.name}</span>
          </div>
           <FaUserPlus size={20}  onClick={()=>{createNewConversation(user.id!)}} className='text-gray-500 cursor-pointer hover:text-gray-800'  />
         </div>
       )
     })
     }

    </div>
 )
    
}

export default LoadedUsers