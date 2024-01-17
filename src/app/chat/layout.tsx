import BgImage from '../ui/chats/BgImage';

function Layout({ children }:{children:React.ReactNode}) {
  return (

      <div className=' md:px-5 md:py-5 h-screen'> 
       <BgImage/>
        <div className='h-full  w-full relative '> 
          {children}
        </div>
    </div>
  );
}

export default Layout;
