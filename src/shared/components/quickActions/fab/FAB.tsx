import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingMenu from '../floatingMenu/FloatingMenu'
import './FAB.css'

export type FabAction = {
  label: string
  path: string
}

export default function FAV() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const actions: FabAction[] = [
    { label: 'הצעת מחיר', path: '/treatments/create' },
    { label: 'טיפול חדש', path: '/treatments/new' },
    { label: 'לקוח חדש', path: '/customers/new' },
    { label: 'תשלום חדש', path: '/payments/new' }
  ]

  const handleActionClick = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      {open && (
        <div
          className="fab-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fab-container">
        <FloatingMenu
          open={open}
          actions={actions}
          onActionClick={handleActionClick}
        />

        <button
          className={`fab ${open ? 'open' : ''}`}
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '✖' : '➕'}
        </button>
      </div>
    </>
  )
}