'use client'
import ConversationProvider from "@/app/Context/ConversationProvider"
import Contacts from "./Contacts"
import Chat from "./Chat"
import { Session } from "@/app/lib/definitions"
import SocketIoProvider from "@/app/Context/SocketIoProvider"
import Actions from "../Actions/Actions"
import { fetchConversations } from "@/app/lib/actions"
import { useEffect, useState } from "react"

function ParentChatComponent({ session,myConversations }: { session: Session ,myConversations:any}) {
    const [conversations, setConversations] = useState<any[] | null>(null)
    // const getConversations = async (myId:string) => {
    //   const data = await fetchConversations(myId)
    //  if(data){
    //   setConversations(data.conversations)
    //  }
    // }
    // useEffect(()=>{
    //   if(session && !conversations){
    //     getConversations(session?.user!.myId)
    //   }
    // },[session])
useEffect(()=>{
    if(myConversations){
        setConversations(myConversations)
    }
},[myConversations])



    return (
        <SocketIoProvider>
            <ConversationProvider>
                <div className="flex w-full h-full relative">
                <Contacts session={session} conversations={conversations}/>
                <Chat session={session} />
                <Actions/>
                </div>
            </ConversationProvider>
        </SocketIoProvider>
    )
}

export default ParentChatComponent