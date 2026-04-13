import { useEffect, useState } from 'react'
import AppRoutes from './routers/router'
import Splash from '@/shared/components/Splash/Splash'
import i18n from './i18n'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateDirection = () => {
      const lang = i18n.language || 'he'
      const dir = lang === 'he' ? 'rtl' : 'ltr'

      document.documentElement.lang = lang
      document.documentElement.dir = dir
      document.documentElement.style.setProperty('--app-direction', dir)
    }

    updateDirection()
    i18n.on('languageChanged', updateDirection)
    return () => i18n.off('languageChanged', updateDirection)
  }, [])

  if (isLoading) {
    return <Splash />
  }

  return (
    <AppRoutes />
  )
}

export default App