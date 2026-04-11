import { useState } from 'react'
import { usersApi } from '../services/users.api'
import type { User } from '../types/'

export function useUser() {
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const data = await usersApi.getMe()
      setUserProfile(data)
    }
    catch (err: any) {
      if (err.status === 404 || err.message.includes('404')) {
        setUserProfile(null)
      } else {
        console.error('שגיאה בטעינת משתמש:', err.message)
      }
    } finally {
      setLoading(false)
      setInitialized(true)
    }
  }

  const updateUser = async (data: Partial<User>) => {
    const updated = await usersApi.updateMe(data)
    setUserProfile(updated)
  }

  return {
    userProfile,
    setUserProfile,
    setInitialized,
    loading,
    initialized,
    fetchUser,
    updateUser,
  }
}
