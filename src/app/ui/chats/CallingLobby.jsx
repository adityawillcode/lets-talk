'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RxCross1 } from 'react-icons/rx'
import { create } from 'domain';
function CallingLobby({ isInCall, setIsInCall,socket,session , selectedConversation ,incomingCallData}) {
  let remoteStream;
let localPeerConnection;
let remotePeerConnection;
const [localStream,setLocalStream]=useState(null)
const localVidRef=useRef()
const remoteVidRef=useRef()
const servers={
  iceServers:[
    {
      urls: ["stun:stun1.l.google.com:19302",
               "stun:stun2.l.google.com:19302"]
    }
  ]
}


const handleOutgoingCall=async ()=>{
 localPeerConnection=new RTCPeerConnection(servers)
if(typeof localPeerConnection == 'object'){
  localPeerConnection.onicecandidate=(e)=>{
    console.log('icecandidate:',e);
  }
}

    const offer=await createOffer()
  if(offer){
    openMedia()
  }

localStream?.getTracks().forEach((track) => {
  localPeerConnection.addTrack(track, localStream);
});



socket?.emit('call-user',{
  offer,callFrom:{name:session.user.name,id:session.user.myId},callTo:{name:selectedConversation.user.name,id:selectedConversation.user.id}
})

socket?.on('get-answer',handleAnswer)

localPeerConnection.addEventListener("track", (event) => {

  console.log('track',event);
  event.streams[0].getTracks().forEach((track) => {
    remoteStream.addTrack(track);
  });
});

}



const openMedia=()=>{
console.log('open media');
  navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
    localVidRef.current.srcObject=stream
    setLocalStream(stream)
  })
  return localStream
}

const removeMedia=()=>{
  localStream?.getVideoTracks()[0].stop()
  localStream?.getAudioTracks()[0].stop()
}

const createOffer=async ()=>{
  try {
    if(localPeerConnection){
      const offer=await localPeerConnection.createOffer()
  if(offer){
    await localPeerConnection.setLocalDescription(new RTCSessionDescription(offer))
    console.log('this is offer:',offer);
    return offer
  }
    }
  
  } catch (error) {
    alert('offer:error')
    console.log(error)
  }
}
const createAnswer=async ()=>{
  try {
    if(remotePeerConnection){
      const answer=await remotePeerConnection.createAnswer(incomingCallData.offer)
      if(answer){
        await remotePeerConnection.setLocalDescription(new RTCSessionDescription(answer))
        console.log('this is  answer sdp:',answer);
        return answer
      }
    }
  } catch (error) {
    alert('answer:error')
    console.log(error)
  }
}



const handleIceCandidates=(data)=>{
 if(typeof localPeerConnection=='object'){
  localPeerConnection.addIceCandidates(data.iceCandidates)
 }
 if(typeof remotePeerConnection=='object'){
  remotePeerConnection.addIceCandidates(data.iceCandidates)
 }
}

const handleAnswer=async (data)=>{
  console.log('this is data at user 1 about answer:',data);
  console.log('this  is localPeerConnection before setting answer:',localPeerConnection);

  if(typeof localPeerConnection=='object'){
    await localPeerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))
  }
  console.log('this  is localPeerConnection after setting answer:',localPeerConnection);
}

useEffect(()=>{
  socket?.on('icecandidate',handleIceCandidates)

  return ()=>{
    socket?.off('icecandidate',handleIceCandidates)
    socket?.off('get-answer',handleAnswer)
    removeMedia()
    
  }
},[socket,handleIceCandidates,handleAnswer])




const handlePickIncomingCall =async ()=>{
  console.log('handlePickIncomingCall function called');
  remotePeerConnection=new RTCPeerConnection(servers)
  console.log(remotePeerConnection,'pc is made by 2nd user');
  await remotePeerConnection.setRemoteDescription(new RTCSessionDescription(incomingCallData.offer))
  if(remotePeerConnection.remoteDescription){
   const answer=await createAnswer()
  if(answer && remotePeerConnection.localDescription){
    socket?.emit('send-answer',{answer,callFrom:incomingCallData.callFrom,callTo:incomingCallData.callTo})
    setIsInCall({...isInCall,incomingCall:false})
    console.log('this is remotePeerConnection after setting answer to localDescription',remotePeerConnection);
  }
  }
}

  return (
    <div className='relative h-[40rem] bg-black'>
       <AnimatePresence>
      {isInCall.outgoingCall | isInCall.incomingCall &&
        <motion.div initial={{x:'100%'}} transition={{duration:0.1}} animate={{x:'0%'}} exit={{x:'100%'}} className='absolute z-10  right-0 flex flex-col gap-[2rem] items-center bottom-[9rem] top-[3rem] bg-white rounded-md py-12 px-4 border border-dashed w-[70rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
          <RxCross1 className=' absolute left-[2rem] text-[1.4rem] top-[1rem] cursor-pointer' onClick={()=>{setIsInCall(false)}} />
          {incomingCallData &&  <h1>{incomingCallData.callFrom.name} is Calling</h1> }
          <div className='relative w-full flex justify-center items-center gap-[5rem]'>

            <div className='h-[20rem] w-[20rem] border border-1 rounded-lg shadow-[3px_2px_14px_2px_#00000024] flex justify-center items-center'><video src="" ref={localVidRef} autoPlay></video></div>
            <div className='h-[20rem] w-[20rem] border border-1 rounded-lg shadow-[3px_2px_14px_2px_#00000024]'><video src="" ref={remoteVidRef} autoPlay></video></div>
          </div>
            <div className='absolute right-0 top-0 flex flex-col justify-around py-[2rem] items-center  bottom-0 w-[8rem] border-l border-1'>
              {isInCall.incomingCall ?
                <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md' onClick={handlePickIncomingCall}>Pick up the call</button>:
                <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md' onClick={handleOutgoingCall}>call</button>
              }
              <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md' onClick={openMedia}>camera</button>
              <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md'>audio</button>
              <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md'>video</button>
            </div>
        </motion.div>
      }
 </AnimatePresence>
    </div>
  )
}

export default CallingLobby