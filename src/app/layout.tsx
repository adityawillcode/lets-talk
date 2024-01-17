import '../app/global.css'
import { Session } from 'next-auth'
import ServerSessionProvider from './Context/SessionProvider'



export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-screen'>
        <ServerSessionProvider>

        {children}
        </ServerSessionProvider>
        </body>
    </html>
  )
}
