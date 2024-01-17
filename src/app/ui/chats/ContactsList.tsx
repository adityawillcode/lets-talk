import ContactBox from './ContactBox'
import ContactsListSkeleton from './ContactsListSkeleton'
import { Session } from '@/app/lib/definitions'
async function ContactsList({session,conversations}:{session:Session,conversations:any}) {
  return (
    <main className='hide-scrollbar' style={{ overflowY: 'auto', height: '725px' }}>
      {
        conversations?.length == 0 ?
          <h1 className=' w-full flex justify-center items-center'>No Converastions</h1> :
          !!conversations ?
            conversations.map((conversation: any, i: number) => {
              return (
                <ContactBox key={i} myId={session?.user?.myId!} conversation={conversation} />
              )
            })
            : <ContactsListSkeleton />

      }

    </main>
  )

}

export default ContactsList