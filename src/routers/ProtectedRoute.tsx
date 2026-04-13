import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/AuthContext'
import { useAppUser } from '@/features/user/providers/UserProvider'

export default function ProtectedRoute({ children }: any) {
    const { user, loading: authLoading } = useAuth()
    const { userProfile, loading: userLoading, initialized } = useAppUser()

    if (authLoading || userLoading || !initialized) return <Navigate to="/splash" replace />

    if (!user) return <Navigate to="/auth" replace />

    if (!userProfile && initialized) {
        if (window.location.pathname !== '/setup') {
            return <Navigate to="/setup" replace />
        }
    }

    return children
}
