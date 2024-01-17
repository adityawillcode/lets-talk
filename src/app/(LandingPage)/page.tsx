import { redirect } from "next/navigation"
import serverSession from "../lib/session/session"
import Footer from "../ui/landing-page/Footer"
import Main from "../ui/landing-page/Main"
import Navbar from "../ui/landing-page/Navbar"

export default async function Home() {
const session=await serverSession()
if(session){
  redirect('/chat')
}

  return (
   <div className=''>
    <Navbar />
    <div className="pt-[5rem]">
    <Main />
    </div>
    <Footer  />
   </div>
  )
}
