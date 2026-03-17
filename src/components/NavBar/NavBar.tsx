import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  const getClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-item active' : 'nav-item'

  return (
    <nav className="nav-bar">
      <div className="nav-inner">

        <NavLink to="/payments" className={getClassName}>
          <span className="icon">💳</span>
          <span className="label">תשלומים</span>
        </NavLink>

        <NavLink to="/clients" className={getClassName}>
          <span className="icon">👥</span>
          <span className="label">לקוחות</span>
        </NavLink>

        <NavLink to="/treatments" className={getClassName}>
          <span className="icon">🩺</span>
          <span className="label">טיפולים</span>
        </NavLink>

        <NavLink to="/settings" className={getClassName}>
          <span className="icon">⚙️</span>
          <span className="label">הגדרות</span>
        </NavLink>

      </div>
    </nav>
  )
}
