import serverSession from '@/app/lib/session/session'
import { specialElite } from '@/app/fonts';
import LogoutButton from '../landing-page/auth/LogoutButton';
import { TbLogout } from 'react-icons/tb';
async function ChatNavBar() {
  const session = await serverSession()
  return (
    <div className='w-full h-24 border-b px-10 py-5 flex items-center justify-between'>
      <span className={`${specialElite.className} font-semibold text-lg `}>{session?.user?.name}</span>
      <div>
        <LogoutButton>
          <TbLogout size={25} className='text-gray-500' />
        </LogoutButton>
      </div>
    </div>
  )
}

export default ChatNavBar