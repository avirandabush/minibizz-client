import { useNavigate, useLocation } from 'react-router-dom'
import { useAppUser } from '@/features/user/providers/UserProvider'
import './TopBar.css'

type Props = {
    title?: string
}

export default function TopBar({ title }: Props) {
    const navigate = useNavigate()
    const location = useLocation()
    const { userProfile } = useAppUser()

    const logoUrl = userProfile?.logoUrl
    const businessName = userProfile?.businessName || 'ttt'

    const isRoot =
        location.pathname === '/payments' ||
        location.pathname === '/customers' ||
        location.pathname === '/treatments'

    const handleBack = () => {
        navigate(-1)
    }

    const handleProfile = () => {
        navigate('/settings')
    }

    return (
        <header className="top-bar">
            {/* שמאל */}
            <div className="top-bar-left">
                {!isRoot && (
                    <button className="icon-btn" onClick={handleBack}>
                        ←
                    </button>
                )}
            </div>

            {/* מרכז */}
            <div className="top-bar-title">
                {title}
            </div>

            {/* ימין */}
            <div className="top-bar-right">
                <button className="profile-button" onClick={handleProfile}>
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${businessName} logo`} className="profile-image" />
                    ) : (
                        <div className="profile-placeholder">
                            {businessName?.charAt(0) || '👤'}
                        </div>
                    )}
                </button>
            </div>
        </header>
    )
}