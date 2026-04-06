import { Outlet } from 'react-router-dom'
import NavBar from '@/shared/components/NavBar/NavBar'

function Layout() {
  return (
    <div style={{ paddingBottom: '64px' }}>
      <main>
        <Outlet />
      </main>

      <NavBar />
    </div>
  )
}

export default Layout