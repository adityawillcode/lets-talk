import React, { Suspense } from 'react'
import ContactsList from './ContactsList'
import { SearchConversationInput } from './Input'
import ContactsListSkeleton from './ContactsListSkeleton'
import { Session } from '@/app/lib/definitions'

function Contacts({session,conversations}:{session:Session,conversations:any}) {

  return (
    <div className='w-full md:w-[400px]  md:border-r '>
    <SearchConversationInput />
    <Suspense fallback={<ContactsListSkeleton/>}>
      <ContactsList session={session} conversations={conversations} />
    </Suspense>
    </div>
  )
}

export default Contacts