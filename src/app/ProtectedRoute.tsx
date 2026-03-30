import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useAppUser } from './UserProvider'

export default function ProtectedRoute({ children }: any) {
    const { user, loading: authLoading } = useAuth()
    const { userProfile, loading: userLoading, initialized } = useAppUser()

    if (authLoading || (userLoading && !initialized)) return <div>Loading...</div>

    if (!user) return <Navigate to="/auth" replace />

    if (!userProfile) return <Navigate to="/settings" replace />

    return children
}