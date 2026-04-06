import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './features/auth/context/AuthContext'
import { UserProvider } from './features/user/providers/UserProvider'
import App from './App'
import './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
)