import { useEffect, useState } from 'react'
import AppRoutes from './routers/router'
import Splash from '@/shared/components/Splash/Splash'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Splash />
  }

  return (
    <AppRoutes />
  )
}

export default App