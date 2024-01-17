import { useEffect, useRef, useState } from "react"

function Messages({ messages,myId }: { messages: any,myId:string }) {
  const [scroll,setScroll]=useState<boolean>(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    
    if (messagesContainerRef.current) {
      
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  
    }
  }, [messages]);

  return (
    <div ref={messagesContainerRef}  className={` relative  flex flex-col gap-[4rem]  py-8 pb-[4rem] px-5 h-[100vh] hide-scrollbar shadow-[inset_0px_0px_83px_10px_#00000024] ${scroll && 'scroll-smooth'}`}>
      {
       messages && messages.map((message:any,index:any)=>{
          return(
             <div key={index} className={` flex w-full ${myId==message.sender.id? 'justify-end':'justify-start'}  `}>
               <span className={`px-3 flex flex-col  py-2  rounded-md ${myId==message.sender.id? 'bg-blue-500 text-white':'bg-white text-black  '}`}>
               <span className="text-[10px] font-sans">{message.sender.name}</span>
               <span className="font-semibold "> {message.body}</span>

              </span>
             </div>
          )
        })
      }


    </div>
  )
}

export default Messages