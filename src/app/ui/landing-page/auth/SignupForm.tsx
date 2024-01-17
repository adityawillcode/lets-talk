"use client"
import { useForm } from "react-hook-form"
import {  signupFormSchema, signupFormType} from "@/app/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { registerUser } from "@/app/lib/actions"
function SignupForm() {
  const router=useRouter()
    const {handleSubmit,register,formState } =useForm<signupFormType>({resolver:zodResolver(signupFormSchema)})
const errors=formState.errors
  
 const handleRegister = (formData:any) => {
    console.log(formData);
    
    registerUser(formData)
 }



  return (
    <div>
    <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">
   
    <div className="flex flex-col gap-2">
      <label htmlFor="nameInput" className="px-2">Name</label>
    <div className="flex flex-col">
    <input type="text" id="nameInput" {...register('name')} placeholder="enter Name" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.name && <span>{errors.name.message}</span> }
    </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="emailInput" className="px-2">Email</label>
    <div className="flex flex-col">
    <input type="text" id="emailInput" {...register('email')} placeholder="enter email" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.email && <span>{errors.email.message}</span> }
    </div>
    </div>


    <div className="flex flex-col gap-2">
      <label htmlFor="passwordInput" className="px-2">Password</label>
    <div className="flex flex-col">
    <input type="password" id="passwordInput" {...register('password')} placeholder="enter password" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.password && <span>{errors.password.message}</span> }

    </div>
    </div>
    <div className="flex flex-col gap-2">
      <label htmlFor="confirmPassword" className="px-2">confirm password</label>
    <div className="flex flex-col">
    <input type="password" id="confirmPassword" {...register('confirmPassword')} placeholder="confirm  password" className="outline-none border py-3 px-5 rounded-sm" />
    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span> }

    </div>
    </div>
    <button type="submit" className="w-full border py-2 hover:bg-black hover:text-white transition-all duration-100 rounded-md">submit</button>
  </form>
  </div>
  )
}

export default SignupForm