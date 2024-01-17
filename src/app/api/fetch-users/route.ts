

import prisma from "@/app/lib/prismadb";
import {  NextRequest, NextResponse as res } from "next/server";

export const GET =async (req:NextRequest)=>{
  const name=req.nextUrl.searchParams.get('name')!
  try {
            const users = await prisma.user.findMany(
                {
                where: {
                  name: {
                    contains: name,
                    mode: 'insensitive', 
                  },
                },
                select:{
                  name:true,image:true,id:true
                }
              }
              );
              if(users) return res.json(users)
              else return res.json([])
        } catch (error) {
            
         return   res.json([])
        }
    
}