import { NextRequest, NextRequest as req, NextResponse as res } from "next/server";
import prisma from "../../../lib/prismadb";
const bcryptjs=require('bcryptjs')
export  async function POST(req:NextRequest ){
    const bodyData=await req.json()
    const {name,email,password}=bodyData

// check user exists?  
const user = await prisma.user.findFirst({
    where: {
      email: email
    },
  });

  if (user) {
    return res.json({ errorMessage: 'User already exists' });
  }
// if not!
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=await bcryptjs.hash(password,salt)
   const newUser= await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name:name
}})
if(newUser){
    return res.json({
        sucessMessage:'user added sucessfully',
        user:{...newUser}
    })
}else{
    return res.json({
        errorMessage:'something went wrong'
    })
}
    
}