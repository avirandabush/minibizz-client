import { createContext, useContext, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useAuth } from './AuthContext'

const UserContext = createContext<any>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const userState = useUser()
    const { user, loading } = useAuth()
    const { fetchUser, setUserProfile, setInitialized } = userState

    useEffect(() => {
        if (user) {
            fetchUser()
        } else if (!loading) {
            setUserProfile(null)
            setInitialized(true)
        }
    }, [user, loading])

    return (
        <UserContext.Provider value={userState}>
            {children}
        </UserContext.Provider>
    )
}

export function useAppUser() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error('useAppUser must be used inside UserProvider')
    return ctx
}