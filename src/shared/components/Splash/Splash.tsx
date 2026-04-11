import { useEffect } from 'react'
import { useAppUser } from '@/features/user/providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/AuthContext'
import './Splash.css'

function Splash() {
    const { user } = useAuth();
    const { initialized, userProfile, loading: userLoading } = useAppUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (initialized && !userLoading) {
            if (userProfile) {
                navigate('/payments', { replace: true });
            } else if (user) {
                navigate('/setup', { replace: true });
            }
        }
    }, [initialized, userLoading, userProfile, user, navigate]);

    return (
        <div className="splash">
            <div className="splash-content">
                <img src="/MiniBizz_Logo.svg" alt="MiniBizz Logo" className="splash-logo" />
                <h1 className="splash-title">MiniBizz</h1>
                <p className="splash-loading">טוען נתונים...</p>
            </div>
        </div>
    );
}

export default Splash