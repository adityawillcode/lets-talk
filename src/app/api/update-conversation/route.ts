import prisma from "@/app/lib/prismadb";
import {  NextRequest, NextResponse as res } from "next/server";

export const POST = async (req:NextRequest) => {
 const {conversationId,messageData}=await req.json()
  
  const conversationData=await prisma.message.create({
    data:{
      
          body:messageData.body,
          senderId:messageData.sender.id,
          conversationId:conversationId
    }
    }
  )

  if(conversationData){
  return  res.json({sucessMessage:'sucess'})
  }
res.json({errorMessage:'error '})

}