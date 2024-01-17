


import { ConversationContext } from '@/app/Context/ConversationProvider'
import { MessageDataType, Session } from '@/app/lib/definitions';
import Swal from 'sweetalert2';
import React, { useContext, useEffect, useState,useRef, useCallback } from 'react'
import { BsCameraVideoFill } from 'react-icons/bs'
import Messages from './Messages';
import { IoIosSend } from 'react-icons/io';
import { SocketIoContext } from '@/app/Context/SocketIoProvider';
import { fetchMessages, updateConversations, updateUserData } from '@/app/lib/actions';
import CallingLobby from './CallingLobby';

function Chat({ session }: { session: Session }) {
  const { setSession, selectedConversation } = useContext(ConversationContext)
  const { socket,setSocketSession } = useContext(SocketIoContext)
  const [messages, setMessages] = useState<any[]>([])
  const [message, setMessage] = useState<string | null>('')
  const [makeCall,setmakeCall]=useState(false)
  const [sdp,setSdp]=useState<any | null>(null)
  useEffect(() => {
    if (selectedConversation) {
     fetchConversationMessages()
      const dataToStore=JSON.stringify(selectedConversation)
     sessionStorage.setItem('selected-conversation',dataToStore)
    }
  }, [selectedConversation])
 

  setSession(session)
  setSocketSession(session)
  const fetchConversationMessages = async () => {
    const convMessages = await fetchMessages(selectedConversation.id)
    if (convMessages) {
      setMessages(convMessages)
    }
  }



  function sendMessage() {
    const messageData: MessageDataType = {
      sender: {
        name: session.user?.name!,
        id: session.user?.myId!,
        image: session.user?.image!
      },
      body: message!,
      roomId:selectedConversation.id
    }
    socket?.emit('message', messageData)
    updateConversations(selectedConversation?.id!, messageData)
    setMessage('')
  }
    



    const handleMessageResponse=(message:any)=>{
      setMessages([...messages, { body: message.body, sender: message.sender }])
    }

    
    const handleUserConnected=async ({ myId }: { myId: string }) => {
      const now = new Date();
      const formattedDateTime = now.toISOString();
      const data = {
          lastSeen: formattedDateTime,
          myId
      }
     await updateUserData(data)
  }


  const handleCallUser=({callTo,callFrom,offer}:{callTo:any,callFrom:any,offer:any})=>{
    Swal.fire({
      position:'top-right',
      title: `Call from ${callFrom.name}`,
      text: `You will be redirected to Calling lobby`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pick up the call",
      cancelButtonText:'Cancel',
      showConfirmButton:true,
    })
    .then((result) => {
     if(result.dismiss==Swal.DismissReason.cancel){
      socket?.emit('call-cancel',{callFrom,callTo,errorMessage:'user is busy'})
     }
      if (result.isConfirmed) {
      setSdp({callFrom,callTo,offer})
       setmakeCall(true)
      } 
    });


  }


// useEffect(()=>{
//   socket?.on('message-response', handleMessageResponse)
//   socket?.on('user-connected',handleUserConnected)
//   socket?.on('call-user',handleCallUser)

//  return ()=>{
//   socket?.off('message-response', handleMessageResponse)
//   socket?.off('user-connected',handleUserConnected),
//   socket?.on('call-user',handleCallUser)
//  }
// },[])


socket?.on('message-response', handleMessageResponse)
socket?.on('user-connected',handleUserConnected)
socket?.on('call-user',handleCallUser)


  







if(makeCall){
  return(
    <CallingLobby sdp={sdp} selectedConversation={selectedConversation} setmakeCall={setmakeCall}  />
  )
}

  return (
    <div className='hidden  flex-col w-full md:flex pr-[3.4rem] '>

      <nav className='h-16 border-b  flex justify-between items-center px-7 text-gray-500 '>
        <div> {selectedConversation?.user.name} </div>
        <BsCameraVideoFill onClick={()=>{setmakeCall(!makeCall)}}  className='p-2 transition-all duration-100 hover:bg-gray-100 hover:text-gray-700 cursor-pointer rounded-full' size={50} />
      </nav>

      <div className='relative h-full '>
        <div>

          {
            selectedConversation ?
              <div> 
                <div>
                  <Messages myId={session.user?.myId!} messages={messages}  />

                <form  onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
                  <div className='px-14 w-full py-3 absolute bottom-0 ' >
                    <div className="bg-white rounded-md flex pr-8 py-1">
                      <input type="text" autoFocus onChange={(e) => { setMessage(e.target.value) }} value={message!} placeholder='Search Conversations' className='bg-transparent placeholder:text-gray-600 outline-none py-2 px-4 h-[2rem] w-full' />
                      <button type='submit'><IoIosSend size={25} /></button>
                    </div>
                  </div>
                </form>
                </div>
              </div>

              : <h1 className='h-[50vh] font-bold text-[1.4rem] text-gray-500 w-full flex justify-center item-center' >Select A Conversation</h1>
          }
        </div>
      </div>
    </div>
  )
}

export default Chat