import prisma from "@/app/lib/prismadb";
import { NextRequest, NextResponse as res } from "next/server";

export const PUT = async (req: NextRequest) => {
    
    const userData=await req.json()
    const {newName,newEmail,lastSeen,myId}=userData
    
    
    const updateData:any={}
    if(newName){
        updateData.name=newName
    }
    if(newEmail){
        updateData.email=newEmail
    }
    if(lastSeen){
        updateData.lastSeen=lastSeen
    }

    const myProfile=await prisma.user.update({
        where:{
            id: myId!
        },
        data:updateData
    })

    if(myProfile){
        return res.json({sucessMessage:'profile updated successfully'},{status:200})
    }
   return res.json({errorMessage:'profile update failed'},{status:404})
}