"use client"
import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdAdd } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'
import ActionsBody from './ActionsBody'

const Actions=()=> {
  const toggle = () => {
    setRightSectionOpen(!rightSectionOpen)
  }
  const [rightSectionOpen, setRightSectionOpen] = useState(false)
  
  
  
  return (
    <div className='w-12 h-screen border-l right-0 bg-white  absolute border-t  flex flex-col items-center  py-6 '>
      <IoMdAdd size={25} onClick={toggle} className=' text-gray-600 hover:text-black cursor-pointer' />
      <AnimatePresence>
        {rightSectionOpen &&
          <motion.div initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }} transition={{ duration: '0.2' }} className='bg-white w-[35rem] px-4 border-l py-4 absolute top-0 bottom-0'>
            <div><RxCross1 onClick={toggle} className=' cursor-pointer' size={20} /></div>
            <ActionsBody />
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Actions