"use client"
import React, { useEffect, useState } from 'react'
import { Socket,io } from 'socket.io-client';

export const SocketIoContext = React.createContext<{socket:Socket | null;setSocket: React.Dispatch<React.SetStateAction<Socket | null>>,setSocketSession: React.Dispatch<React.SetStateAction<any | null>>,socketSession:any | null}>({
socket:null,
setSocket:() => {},
setSocketSession:() => {},
socketSession:null
})

function SocketIoProvider({children}:{children:React.ReactNode}) {
    const [socket,setSocket]=useState<Socket |null>( null)
    const [socketSession,setSocketSession]=useState<any |null>(null)
    useEffect(()=>{
        if(!socket && socketSession){        
            const newSocket=io('http://localhost:5000',{
                query:{
                  userData:JSON.stringify( { name:socketSession.user.name,id:socketSession.user.myId})
                }
            })
            if(newSocket){
                setSocket(newSocket)
            }
        }
        return ()=>{
            socket?.disconnect()
        }
    },[socket,socketSession])


    
  return (
    <SocketIoContext.Provider value={{socket,setSocket,setSocketSession,socketSession}}>
        {children}
    </SocketIoContext.Provider>
    
  )
}

export default SocketIoProvider