import { createContext, useContext, useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import { useAuth } from '@/features/auth/context/AuthContext'
import i18n from '@/i18n'

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

    useEffect(() => {
        if (userState.userProfile?.preferences?.language) {
            i18n.changeLanguage(userState.userProfile.preferences.language)
        }
    }, [userState.userProfile])

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