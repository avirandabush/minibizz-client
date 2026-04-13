import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '@/shared/components/NavBar/NavBar'
import TopBar from '@/shared/components/topBar/TopBar'

function Layout() {
  const location = useLocation()

  const getTitle = () => {
    if (location.pathname.startsWith('/payments')) return 'תשלומים'
    if (location.pathname.startsWith('/customers')) return 'לקוחות'
    if (location.pathname.startsWith('/treatments')) return 'טיפולים'
    if (location.pathname.startsWith('/settings')) return 'הגדרות'
    return ''
  }

  return (
    <div style={{ paddingTop: '56px', paddingBottom: '64px' }}>
      <TopBar title={getTitle()} />

      <main>
        <Outlet />
      </main>

      <NavBar />
    </div>
  )
}

export default Layout