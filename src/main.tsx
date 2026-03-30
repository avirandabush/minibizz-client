import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './app/AuthContext'
import { UserProvider } from './app/UserProvider'
import App from './app/App'
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