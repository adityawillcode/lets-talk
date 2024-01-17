"use client"
import { SessionProvider } from "next-auth/react"
import { Session } from "../lib/definitions"


function ServerSessionProvider({children,session}:{children:React.ReactNode,session:Session}) {
  return (
   <SessionProvider session={session}>
    {children}
   </SessionProvider>
  )
}

export default ServerSessionProvider