

import ConversationProvider from "../Context/ConversationProvider"
import { fetchConversations } from "../lib/actions"
import serverSession from "../lib/session/session"
import ChatNavBar from "../ui/chats/ChatNavBar"
import ParentChatComponent from "../ui/chats/ParentChatComponent"
async function page() {
  const session = await serverSession()
  const data=await fetchConversations(session?.user.myId)
  let myConversations;
 if(data){
   myConversations=await data.conversations
 }
  return (
    <div className="flex flex-col h-[100%] bg-white ">
      <div className="  ">
        <ChatNavBar />
      </div>
      <div className="overflow-hidden flex w-full h-full ">
        <ConversationProvider>
        <ParentChatComponent session={session!} myConversations={myConversations} />
        </ConversationProvider>
      </div>

    </div>


  )
}

export default page