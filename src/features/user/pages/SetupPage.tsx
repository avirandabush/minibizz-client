import { useNavigate } from "react-router-dom"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useAppUser } from "../providers/UserProvider"
import { usersApi } from "../services/users.api"
import { AppLanguage, DealerType, UserPlan, UserStatus } from "../types"
import { useState } from "react"
import i18n from "@/i18n"

export default function SetupPage() {
    const { user } = useAuth()
    const { setUserProfile } = useAppUser()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        dealerType: DealerType,
        dealerNo: '',
        address: '',
        professionalField: '',
        language: AppLanguage.HE
    });

    const isValid = formData.name && formData.businessName && formData.phone;

    const handleSubmit = async () => {
        if (!isValid) return alert("אנא מלא את כל שדות החובה");

        setLoading(true);

        try {
            const created = await usersApi.create({
                name: formData.name,
                plan: UserPlan.SILVER,
                status: UserStatus.ACTIVE,
                contact: {
                    email: user?.email || '',
                    phone: formData.phone,
                },
                business: {
                    name: formData.businessName,
                    legalName: formData.businessName,
                    dealerNo: formData.dealerNo,
                    dealerType: DealerType.EXEMPT,
                    professionalField: formData.professionalField,
                    address: formData.address,
                },
                preferences: {
                    language: formData.language,
                    darkMode: false
                }
            });

            i18n.changeLanguage(formData.language)
            setUserProfile(created);
            navigate('/payments');
        } catch (error) {
            alert("אירעה שגיאה ביצירת הפרופיל. אנא נסה שוב.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h2>ברוכים הבאים! בוא נקים את העסק שלך</h2>

            <div className="form-group">
                <input placeholder="שם מלא *" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
                <input placeholder="שם העסק *" value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })} />
            </div>
            <div className="form-group">
                <input placeholder="מספר עוסק *" value={formData.dealerNo}
                    onChange={e => setFormData({ ...formData, dealerNo: e.target.value })} />
            </div>
            <div className="form-group">
                <input placeholder="טלפון *" value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="form-group">
                <input placeholder="כתובת" value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })} />
            </div>
            <div className="form-group">
                <input placeholder="תחום עיסוק (למשל: קוסמטיקה)" value={formData.professionalField}
                    onChange={e => setFormData({ ...formData, professionalField: e.target.value })} />
            </div>
            <div className="form-actions">
                <button onClick={handleSubmit} disabled={!isValid || loading}>
                    {loading ? 'מגדיר...' : 'סיום והתחלת עבודה'}
                </button>
            </div>
        </div>
    )
}