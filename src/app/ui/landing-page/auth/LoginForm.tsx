"use client"
import { useForm } from "react-hook-form"
import { loginFormSchema ,loginFormType} from "@/app/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useState } from "react"
const bcryptjs=require('bcryptjs')


function LoginForm() {
  const [signInError,setSignInError]=useState('')
  const router=useRouter()
    const {handleSubmit,register,formState } =useForm<loginFormType>({resolver:zodResolver(loginFormSchema)})
const errors=formState.errors

const validateFormData=async (formData:loginFormType)=>{
   const signInTransaction=await signIn('credentials',{...formData,redirect:false})
  if(signInTransaction?.error===null && signInTransaction.status==200) {
    router.push('/')
  }else{
    if(signInTransaction?.error==='CredentialsSignin'){
      setSignInError('Please check your Email and Password')
    }
    router.push('/auth/login')
  }
    }
    
  return (
    <div>
    <form onSubmit={handleSubmit(validateFormData)} className="flex flex-col gap-4">
    <div className="flex flex-col gap-2">
      <label htmlFor="emailInput" className="px-2">Email</label>
    <div className="flex flex-col">
    <input type="text" id="emailInput" {...register('email')} placeholder="enter email" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.email && <span className="text-red-600">{errors.email.message}</span> }
    </div>
    </div>


    <div className="flex flex-col gap-2">
      <label htmlFor="passwordInput" className="px-2">Password</label>
    <div className="flex flex-col">
    <input type="password" id="passwordInput" {...register('password')} placeholder="enter password" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.password && <span className="text-red-600">{errors.password.message}</span> }

    </div>
    </div>
  {
    signInError!=='' && <span className="text-red-600">{signInError}</span>
  }
    <button type="submit" className="w-full border py-2 hover:bg-black hover:text-white transition-all duration-100 rounded-md">submit</button>
  </form>
  </div>
  )
}

export default LoginForm