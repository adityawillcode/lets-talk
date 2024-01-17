
import {  z} from 'zod'
export type signupFormType=z.infer<typeof signupFormSchema>
export type loginFormType=z.infer<typeof loginFormSchema>
export const signupFormSchema  =z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6).max(15),
    confirmPassword:z.string().min(6).max(15),
    
}).refine((data)=> data.password=== data.confirmPassword,{
    message:'both password and confirm password must match',
    path:["confirmPassword"]
})

export const loginFormSchema=z.object({
    email:z.string().email({message:'enter valid email'}),
    password:z.string().min(6,{message:'password must be atleast of 6 characters'}).max(20,{message:'password must be atmost of 20 characters'}),
})
export type Session ={
    user?: sessionUser,
    expires: string
  }
export type ClientSession={
  data:Session,
  status:'loading'| 'authenticated',
  update:any
}

export type sessionUser ={
    myId: string; 
    name: string | null;
    image: string | null;
    email:string | null;
  }

export type User ={
    id: string; 
    name: string | null;
    image: string | null;
  }
export type message={
  id:string;
  body:string;
  sender:User
}
 export  type conversationType={
  id:string;
  users:User[];
  createdAt:string;
  messages:message[]
  }

  export type MessageDataType={
   sender:User;
   body:string;
   roomId:string
  }


