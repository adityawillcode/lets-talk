'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RxCross1 } from 'react-icons/rx'
import { create } from 'domain';
function CallingLobby({ isInCall, setIsInCall, socket, session, selectedConversation, incomingCallData }) {

  let localPeerConnection;
  let remotePeerConnection;
  const [localStream, setLocalStream] = useState(null)
  let localIceCandidates = []
  let remoteStream;
  const localVidRef = useRef()
  const remoteVidRef = useRef()
  const servers = {

    iceServers: [
      {
        urls: ["stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"]
      }
    ]
  }


  const handleOutgoingCall = async () => {
    localPeerConnection = new RTCPeerConnection(servers)

    await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(async (stream) => {
      
      localVidRef.current.srcObject = stream
     
     stream.getTracks().forEach((track)=>{
        localPeerConnection.addTrack(track,stream)
      })
  
    })
    socket?.on('get-answer', handleAnswer)
    const offer = await createOffer(localPeerConnection)
    if (offer) {
      socket?.emit('call-user', {
        offer, callFrom: { name: session.user.name, id: session.user.myId }, callTo: { name: selectedConversation.user.name, id: selectedConversation.user.id }
      })
    }

    // sharing ice candidates




    socket?.on('ice-candidates', (data) => {

      if (data.iceCandidate) {
        localPeerConnection.addIceCandidate(data.iceCandidate)
      }
    })


    

    localPeerConnection.onnegotiationneeded=(e)=>{
      console.log('negotiation needed');
      localPeerConnection.createOffer().then((offer)=>{
        console.log('offer done');
        localPeerConnection.setLocalDescription(offer).then(()=>{
          console.log('done');
          socket.emit('negotiation-offer',{offer,callTo:{id:selectedConversation.user.id},callFrom:{id:session.user.myId}})
        })
     
      })
      socket.on('negotiation-answer',(data)=>{
        localPeerConnection.setRemoteDescription(data.answer)
      })
    }


    localPeerConnection.ontrack = (event) => {
      console.log('ontrack function for 1');
      remoteStream=event.streams[0]
      remoteVidRef.current.srcObject=event.streams[0]
    }

    localPeerConnection.onicecandidate = (e) => {
      console.log('ice candidate of user 1:', e.candidate);
      if (e.candidate) {
        localIceCandidates.push(e.candidate)
      }
    }
  }


  const openMedia = async (pc) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {

      localVidRef.current.srcObject = stream
      setLocalStream(stream)
    })
    return localStream
  }

  const removeMedia = () => {
    localStream?.getVideoTracks()[0].stop()
    localStream?.getAudioTracks()[0].stop()
  }



  const createOffer = async () => {
    try {
      if (localPeerConnection) {
        const offer = await localPeerConnection.createOffer()
        if (offer) {
          await localPeerConnection.setLocalDescription(new RTCSessionDescription(offer))
          // console.log('this is offer:', offer);
          return offer
        }
      }

    } catch (error) {
      alert('offer:error')
      console.log(error)
    }
  }
  const createAnswer = async () => {
    try {
      if (remotePeerConnection) {
        const answer = await remotePeerConnection.createAnswer(incomingCallData.offer)
        if (answer) {
          await remotePeerConnection.setLocalDescription(new RTCSessionDescription(answer))
          return answer
        }
      }
    } catch (error) {
      alert('answer:error')
      console.log(error)
    }
  }





  const handleAnswer = async (data) => {
    navigator.mediaDevices.getUserMedia({audio:true,video:true}).then((stream)=>{
      localVidRef.current.srcObject=stream
      stream.getTracks().forEach((track)=>{
        localPeerConnection.addTrack(track,stream)
      })
    })
    localIceCandidates.forEach((candidate) => {
      socket.emit('ice-candidates', { candidateTo: selectedConversation.user, candidateFrom: { name: session.user.name, id: session.user.myId }, iceCandidate: candidate })
    })

   

    

    // console.log('this is data at user 1 abo?ut answer:', data);
    // console.log('this  is localPeerConnectio?n before setting answer:', localPeerConnection);

    if (typeof localPeerConnection == 'object') {
      await localPeerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))

    }
    // await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //   localVidRef.current.srcObject = stream
     
    //  stream.getTracks().forEach((track)=>{
    //     localPeerConnection.addTrack(track,stream)
    //   })
    // })

  }

  useEffect(() => {

    return () => {
      removeMedia()

    }
  }, [])





  const handlePickIncomingCall = async () => {
    remotePeerConnection = new RTCPeerConnection(servers)

    await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((secondStream) => {
      secondStream.getTracks().forEach((track) => {
        remotePeerConnection.addTrack(track, secondStream)
      })
      localVidRef.current.srcObject = secondStream;

    })


    await remotePeerConnection.setRemoteDescription(new RTCSessionDescription(incomingCallData.offer))
    if (remotePeerConnection.remoteDescription) {
      const answer = await createAnswer()
      if (answer && remotePeerConnection.localDescription) {
        socket?.emit('send-answer', { answer, callFrom: incomingCallData.callFrom, callTo: incomingCallData.callTo })
      }
    }


    remotePeerConnection.ontrack =async (event) => {
     
      console.log('ontrack for 2');
      remoteStream=event.streams[0]
      remoteVidRef.current.srcObject=event.streams[0]
    }


    remotePeerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('ice-candidates', { candidateTo: incomingCallData.callFrom, candidateFrom: incomingCallData.callTo, iceCandidate: e.candidate })
      }
    }



    socket?.on('ice-candidates',async (data) => {
      
      if (data.iceCandidate) {
        remotePeerConnection.addIceCandidate(data.iceCandidate)
      }
    })
    socket?.on('negotiation-offer', (data) => {
      
      remotePeerConnection.setRemoteDescription(data.offer).then(()=>{
        remotePeerConnection.createAnswer(data.offer).then((answer)=>{
          socket.emit('negotiation-answer',{answer,callFrom:data.callFrom,callTo:data.callTo})
        })  
      })

    })



  }


  return (
    <div className='relative h-[40rem] bg-black'>
      <AnimatePresence>
        {isInCall.outgoingCall | isInCall.incomingCall &&
          <motion.div initial={{ x: '100%' }} transition={{ duration: 0.1 }} animate={{ x: '0%' }} exit={{ x: '100%' }} className='absolute z-10  right-0 flex flex-col gap-[2rem] items-center bottom-[9rem] top-[3rem] bg-white rounded-md py-12 px-4 border border-dashed w-[70rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
            <RxCross1 className=' absolute left-[2rem] text-[1.4rem] top-[1rem] cursor-pointer' onClick={() => { setIsInCall(false) }} />
            {incomingCallData && <h1>{incomingCallData.callFrom.name} is Calling</h1>}
            <div className='relative w-full flex justify-center items-center gap-[5rem]'>

              <div className='h-[20rem] w-[20rem] border border-1 rounded-lg shadow-[3px_2px_14px_2px_#00000024] flex justify-center items-center'><video src="" ref={localVidRef} autoPlay></video></div>
              <div className='h-[20rem] w-[20rem] border border-1 rounded-lg shadow-[3px_2px_14px_2px_#00000024] flex justify-center items-center'><video src="" ref={remoteVidRef} autoPlay></video></div>
            </div>
            <div className='absolute right-0 top-0 flex flex-col justify-around py-[2rem] items-center  bottom-0 w-[8rem] border-l border-1'>
              {isInCall.incomingCall ?
                <button className='px-4 py-2 border border-1 hover:bg-gray-200  hover:border-black rounded-md' onClick={handlePickIncomingCall}>Pick up the call</button> :
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