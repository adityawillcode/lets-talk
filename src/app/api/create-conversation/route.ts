import prisma from "@/app/lib/prismadb";

import { NextRequest ,NextResponse as res} from "next/server";

export  async function POST(req:NextRequest ){
   const  {myId,userId}:{myId:string,userId:string}= await req.json()
   console.log({myId,userId});
   
   
   
    try {
        const conversationExists=await prisma.conversation.findFirst({
            where:{
              AND:[
                  {
                    userIds:{
                        has:myId
                    }
                  },
                  {
                    userIds:{
                        has:userId
                    }
                  }
              ]
        
            },select:{id:true}
        })

        if(conversationExists) return res.json({errorMessage:'User is already in your contact'},{status:403})
        
        const newConversation=await prisma.conversation.create({
            data:{
            userIds:[myId,userId],
            }
  })
        if(!newConversation) {
            console.log('failed to add new conversation')
            return res.json({errorMessage:'filed to add new conversation '})
        }

        const userModelUpdate=await prisma.user.update({
           where:{
            id:myId,
           },
           data:{
            conversationIds:{
                push:newConversation.id
            }
           }
        })

        if(!userModelUpdate) return res.json({errorMessage:'failed to create conversation'})
      else{
        return  res.json({successMessage:'conversation created successfully'},{status:200})
    }
        
    } catch (error) {
     console.log(error);
     return res.json({errorMessage:'Failed to create conversation'},{status:404})
        
    }
}