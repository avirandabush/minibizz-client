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
    } catch (err) {
      console.error('fetchUser failed', err)
      setUserProfile(null)
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
