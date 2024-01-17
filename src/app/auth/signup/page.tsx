
import SignupForm from "@/app/ui/landing-page/auth/SignupForm"
import SocialLogin from "@/app/ui/landing-page/auth/SocialLogin"
export default function Page() {
  return (
    <div className='h-screen flex justify-center items-center w-screen'>
      <div className="w-[40rem] border py-[4rem] px-[1rem]">
        <h1 className="w-full text-center">Signup</h1>
        <SignupForm />
        <SocialLogin/>
      </div>
    </div>
  )
}

