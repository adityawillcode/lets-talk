
import LoginForm from "@/app/ui/landing-page/auth/LoginForm"
import SocialLogin from "@/app/ui/landing-page/auth/SocialLogin"
export default function Page() {
  return (
    <div className='h-screen flex justify-center items-center w-screen'>
      <div className="w-[40rem] border py-[4rem] px-[1rem]">
        <h1 className="w-full text-center">login</h1>
        <LoginForm />
        <SocialLogin/>
      </div>
    </div>
  )
}

