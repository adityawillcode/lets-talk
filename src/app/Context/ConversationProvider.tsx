"use client"
import React, { useEffect, useState } from 'react'
import { Session } from '../lib/definitions';

export const ConversationContext = React.createContext<{ selectedConversation: any | null; setSelectedConversation: React.Dispatch<React.SetStateAction<any | null>>;session : Session | null ; setSession:React.Dispatch<React.SetStateAction<Session | null>>;conversations: any | null; setConversations: React.Dispatch<React.SetStateAction<any | null>>; messages:any[] | null ;setMessages:React.Dispatch<React.SetStateAction<any | null>>}>({
  selectedConversation: null,
  setSelectedConversation: () => {},
  conversations: null,
  setConversations: () => {},
  session: null,
  setSession: () => {},
  messages: [],
  setMessages: () => {}
})

function ConversationProvider({children}:{children:React.ReactNode}) {
  const [conversations,setConversations]=useState<any |null>(null)
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [session,setSession]=useState<Session | null>(null)
  const [messages,setMessages]=useState<any>([])



  return (
    <ConversationContext.Provider value={{selectedConversation,setSelectedConversation,session,setSession,setConversations,conversations,messages,setMessages}}>
        {children}
    </ConversationContext.Provider>
    
  )
}

export default ConversationProvider