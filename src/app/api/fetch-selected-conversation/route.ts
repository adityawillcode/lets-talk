import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse as res } from "next/server";

export const GET = async (req: NextRequest) => {
    const conversationId = req.nextUrl.searchParams.get('conversationId')!
    try {
        
  const conversationData=await prisma.message.findMany({
    where:{
      conversationId:conversationId!
    },
        select:{
          createdAt:true,
          id:true,
          body:true,
          sender:{
            select:{
              id:true,
              name:true,
              image:true
            }
          }
        }
     
  })
if (conversationData){
  return  res.json(conversationData)
}
return res.json({errorMessage:'failed to fetch messages'},{status:404})
    } catch (error) {
        console.log('there is error in fetching the convesations');

        console.log(error)
        return res.json({ errorMessage: 'Unable to Load message' })

    }


}