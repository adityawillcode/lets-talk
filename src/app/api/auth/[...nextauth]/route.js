import NextAuth from "next-auth";
import {z} from 'zod'
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismadb";
import bcrypt from 'bcryptjs'
export const authOptions={
pages:{
  signIn:'/auth/login',
  signOut:'/auth/login'
},
  providers:[
      Credentials({
          async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials)
            const existingUser=await prisma.user.findFirst({
              where:{
                email:parsedCredentials.data.email
              }
            })
            if(!existingUser) return null
            if(existingUser){
              const passwordMatch = await bcrypt.compare(parsedCredentials.data.password, existingUser.password);
              if(!passwordMatch) return null
              if(passwordMatch) {
                return {
                    userDbId:existingUser.id,
                    name:existingUser.name,
                    email:existingUser.email,
                    image:existingUser.image
              }
            }
            }
  
            return credentials
          }
        }),
        
  ],
  callbacks: {
    async jwt({ token, user }) {

      if(user){
        return {...token,userDbId:user.userDbId }
      }
      return token
    },
    async session({ session, user, token }) {

      return {expires:session.expires,user:{...session.user,myId:token.userDbId}}
    }
}
  
  
  } 
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}
