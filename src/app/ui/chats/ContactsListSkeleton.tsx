import React from 'react'

function ContactListBox() {
    return (

        <div className="flex px-8 gap-3">
            <div className='bg-gray-100 w-8 h-8 rounded-full'></div>
            <div className="flex flex-col w-full h-8 bg-gray-100">

            </div>
        </div>
    )
}

function ContactsListSkeleton() {
    return (
        <div className='flex flex-col gap-6 py-5'>
            <ContactListBox />
            <ContactListBox />
            <ContactListBox />
            <ContactListBox />
            <ContactListBox />
            <ContactListBox />
  
        </div>
    )
}

export default ContactsListSkeleton