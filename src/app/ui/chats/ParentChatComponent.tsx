'use client'
import ConversationProvider from "@/app/Context/ConversationProvider"
import Contacts from "./Contacts"
import Chat from "./Chat"
import { Session } from "@/app/lib/definitions"
import SocketIoProvider from "@/app/Context/SocketIoProvider"
import Actions from "../Actions/Actions"
import { useEffect, useState } from "react"
import CallingLobby from "./CallingLobby"

function ParentChatComponent({ session, myConversations }: { session: Session, myConversations: any }) {
    const [conversations, setConversations] = useState<any[] | null>(null)
    const [isInCall,setIsInCall]=useState(false)

    useEffect(() => {
        if (myConversations) {
            setConversations(myConversations)
        }
    }, [myConversations])



    return (
        <SocketIoProvider>
            <ConversationProvider>
                <div className="flex w-full h-full relative">
                    <Contacts session={session} conversations={conversations} />
                    <Chat session={session} />
                    <Actions />
                 
                </div>
            </ConversationProvider>
        </SocketIoProvider>
    )
}

export default ParentChatComponent