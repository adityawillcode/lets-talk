'use client'
import { ConversationContext } from "@/app/Context/ConversationProvider"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { SocketIoContext } from "@/app/Context/SocketIoProvider"
interface onlineUsers {
    id: string, socketId: string, name: string
}


function ContactBox({ conversation, myId }: { conversation: any, myId: string }) {
    const { setSelectedConversation, selectedConversation } = useContext(ConversationContext)
    const [previousConversation, setPreviousConversation] = useState<any | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])
    const { socket } = useContext(SocketIoContext)


    const user = conversation.users.find((userOfConversation: any) => {
        return userOfConversation.id !== myId
    })



    const handleSelectedConversation = async (id: string, user: any) => {
        socket?.emit('join-room', { roomId: id })
        setPreviousConversation(selectedConversation)
        setSelectedConversation({ id, user })
    }

    

    useEffect(() => {
        if (!selectedConversation) {
            const savedSelectedConversation = JSON.parse(sessionStorage.getItem('selected-conversation')!)
            if (savedSelectedConversation) {
                setSelectedConversation(savedSelectedConversation)
                joinConversation(savedSelectedConversation.id)
            }

        }
        if (selectedConversation && previousConversation) {
            leavePrevConversation(previousConversation.id)
            joinConversation(selectedConversation?.id)
        }
    }, [selectedConversation])


   
   
    socket?.on('online-users', (users) => {
        setOnlineUsers(users.users)
    })

     const leavePrevConversation = (roomId: string) => {
        socket?.emit('leave-room', { roomId })
    }
    const joinConversation = (roomId: string) => {
        socket?.emit('join-room', { roomId })
    }

    const online = onlineUsers.length > 0 && onlineUsers.find(onlineUser => {
        return onlineUser.id == user.id
    })

    function convertTimestamp(timestamp:any) {
      
        const dt = new Date(timestamp);
      
        const hours = dt.getHours();
  const minutes = dt.getMinutes();

  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${hours>12?' PM' : ' AM'}`;

  return formattedTime
      }
      
 

    return (
        <div onClick={() => { handleSelectedConversation(conversation.id, user) }} className={`hover:bg-gray-100 cursor-pointer transition-all duration-75 px-5 h-16 flex border-b  items-center  ${selectedConversation?.id === conversation.id && 'bg-gray-200'}`} >
            <div className="flex">
                <div className="relative h-[30px] w-[30px]">{online && <div className=" absolute right-[-4px] bottom-[-10px] w-2 h-2 rounded-full bg-green-400 "></div>} <Image src={'/Images/defaultProfile.png'} alt="user" width={30} height={30} /></div>
                <div className="flex flex-col px-10">
                    <span className=" text-lg">{user.name}</span>
                    <span className={`text-[10px] ${online && 'font-semibold'}`}>{online ? `online` : convertTimestamp(user.lastSeen) }</span>
                </div>
            </div>
        </div>
    )
}

export default ContactBox

