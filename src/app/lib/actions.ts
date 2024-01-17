import { MessageDataType, signupFormType } from "./definitions";
import prisma from "./prismadb";
import {io}  from 'socket.io-client'
export const registerUser = async (formData:signupFormType) => {
    console.log('this is data from signup form', formData);
    const { name, email, password } = formData

    const result = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST', body: JSON.stringify({
            name, email, password
        })
    })
    const response = await result.json();
    console.log('this is data from response', response);
}

export const fetchUsers = async (text: string) => {

  try {
    const result=await fetch(`http://localhost:3000/api/fetch-users?name=${text}`)
    const users=await result.json()
    if(users.length > 0) {
      return users
    }else{
      return  []
    }
  } catch (error) {
    console.log('Error fetching users:', error);
    console.log('else statement');
  } 
  return []
};


export const fetchConversations = async (myId:string) => {
  const myConversations=await (await fetch(`http://localhost:3000/api/fetch-conversations?myId=${myId}`)).json()
  if(myConversations.errorMessage || myConversations.length==0){return null}
else{
  return myConversations
}} 

// add conversations


export const createConverastion = async (myId:string,userId:string)=>{
  console.log({myId,userId});
  
  const result=(await fetch(`http://localhost:3000/api/create-conversation`,{
    method: 'POST',body:JSON.stringify({myId,userId}),headers:{'Content-Type': 'application/json'}
  }))
  const newConversationResponse=await  result.json()
  
  console.log(newConversationResponse);
  
  return newConversationResponse
}

export const fetchMessages=async (conversationId:string)=>{
try {
  const messages=await (await fetch(`http://localhost:3000/api/fetch-selected-conversation?conversationId=${conversationId}`)).json()

  if(messages) {
    return messages
  }
  else return []
} catch (error) {
  console.log(error);
  
}
return []
}
  


export const updateConversations=async (conversationId:string,messageData:any)=>{
  try {
    const convToUpdate=await (await fetch(`http://localhost:3000/api/update-conversation`,{
    body: JSON.stringify({conversationId,messageData}),headers:{ 
      'Content-Type': 'application/json'
    },method: 'POST'
    })).json()
  } catch (error) {
      }
}

  export const updateUserData =async (data:any)=>{
    console.log(data);
    
    // data={newName,newEmail,lastSeen,myId}
     const update=await fetch('http://localhost:3000/api/update-user',{
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
     }
     )
     const result = await update.json()
     if(result){
      console.log(result);
     }
     else{
      console.log('error in fetching data');
      
     }
     



  }
