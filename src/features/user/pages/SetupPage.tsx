import { useNavigate } from "react-router-dom"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useAppUser } from "../providers/UserProvider"
import { usersApi } from "../services/users.api"
import { DealerType, UserPlan, UserStatus } from "../types"
import { useState } from "react"

export default function SetupPage() {
    const { user } = useAuth()
    const { setUserProfile } = useAppUser()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        dealerType: DealerType,
        address: '',
        professionalField: ''
    });

    const handleSubmit = async () => {
        const created = await usersApi.create({
            authId: user!.uid,
            plan: UserPlan.SILVER,
            status: UserStatus.ACTIVE,
            name: formData.name,
            contact: {
                email: user?.email || '',
                phone: formData.phone,
                alternatePhone: undefined
            },
            business: {
                name: formData.businessName,
                legalName: "",
                dealerNo: "",
                dealerType: "EXEMPT",
                professionalField: formData.professionalField,
                address: formData.address,
                website: undefined,
                logoUrl: undefined
            },
            preferences: {
                language: "he",
                darkMode: false
            }
        })

        setUserProfile(created)
        navigate('/payments')
    }

    return (
        <div>
            <h2>השלמת פרטים</h2>
            {/* טופס */}
            <input placeholder="שם מלא"
                onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input placeholder="שם העסק"
                onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
            <input placeholder="טלפון"
                onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <input placeholder="כתובת"
                onChange={e => setFormData({ ...formData, address: e.target.value })} />
            <input placeholder="תחום עיסוק"
                onChange={e => setFormData({ ...formData, professionalField: e.target.value })} />
            <button onClick={handleSubmit}>סיום</button>
        </div>
    )
}