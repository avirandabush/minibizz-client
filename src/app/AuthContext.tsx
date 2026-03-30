import { createContext, useContext, useEffect, useState } from 'react'
import { usersApi } from '../service/users.api'
import { auth } from '../lib/firebase'
import { DealerType, UserPlan, UserStatus } from '../types'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)

    const firebaseUser = cred.user

    await usersApi.create({
      authId: firebaseUser.uid,
      name: '',
      contact: {
        email,
        phone: '',
      },
      business: {
        name: '',
        legalName: '',
        dealerNo: '',
        dealerType: DealerType.EXEMPT,
        professionalField: '',
        address: '',
      },
      preferences: {
        language: 'he',
        darkMode: false,
      },
      plan: UserPlan.SILVER,
      status: UserStatus.ACTIVE,
    })
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}