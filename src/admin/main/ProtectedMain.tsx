import { Outlet } from 'react-router-dom'
import ProtectedSidebar from './sidebar/sidebar'
import backgroundImage from '../../assets/background.jpg'
import { useIsMobile } from '../../utils/use-mobile';

const ProtectedMain = () => {
  const isMobile = useIsMobile()

  return (
    <div className={`min-h-screen ${isMobile ? 'flex flex-col' : 'flex'}`}>
      <ProtectedSidebar />
      <main
        className={`${isMobile ? 'w-full pt-16 px-4 pb-20 py-4' : 'ml-64 pt-0 px-6 py-6 flex-1'}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'fixed',
          backgroundAttachment: 'fixed',
          backgroundClip: 'padding-box'
        }}
      >
        <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ProtectedMain
