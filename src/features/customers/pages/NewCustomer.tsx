import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../hooks/useCustomers'
import { LeadSource } from '../types'
import '@/shared/components/ListItem/ListItem.css'
import '@/shared/components/form/NewForm.css'

export default function NewCustomer() {
  const navigate = useNavigate()
  const { createCustomer } = useCustomers()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    alternatePhone: '',
    email: '',
    birthDate: '',
    address: '',
    notes: '',
    medicalNotes: '',
    leadSource: LeadSource.FRIEND,
    isActive: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) {
      newErrors.name = 'שם חובה'
    }

    if (form.phone && !/^[0-9\-+() ]{7,}$/.test(form.phone)) {
      newErrors.phone = 'מספר לא תקין'
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'אימייל לא תקין'
    }

    if (form.birthDate && new Date(form.birthDate) > new Date()) {
      newErrors.birthDate = 'תאריך לא תקין'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      await createCustomer({
        personal: {
          name: form.name.trim(),
          birthDate: form.birthDate || undefined,
          notes: form.notes.trim(),
          medicalNotes: form.medicalNotes.trim(),
        },
        contact: {
          phone: form.phone.trim(),
          alternatePhone: form.alternatePhone.trim(),
          email: form.email.trim().toLowerCase(),
          address: form.address.trim(),
        },
        stats: {
          totalVisits: 0,
          totalSpent: 0,
          averageTicket: 0
        },
        leadSource: form.leadSource,
        isActive: form.isActive,
      })

      navigate('/customers')
    } catch {
      setErrors({ general: 'שגיאה בשמירה' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>לקוח חדש</h2>

      {/* שם */}
      <div className="form-group">
        <label>שם *</label>
        <input
          type="text"
          value={form.name}
          onChange={e => updateField('name', e.target.value)}
          autoFocus
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* טלפון */}
      <div className="form-group">
        <label>טלפון</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => updateField('phone', e.target.value)}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {/* אימייל */}
      <div className="form-group">
        <label>אימייל</label>
        <input
          type="email"
          value={form.email}
          onChange={e => updateField('email', e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* תאריך לידה */}
      <div className="form-group">
        <label>תאריך לידה</label>
        <input
          type="date"
          value={form.birthDate}
          onChange={e => updateField('birthDate', e.target.value)}
        />
        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
      </div>

      {/* כתובת */}
      <div className="form-group">
        <label>כתובת</label>
        <input
          type="text"
          value={form.address}
          onChange={e => updateField('address', e.target.value)}
        />
      </div>

      {/* מקור הגעה */}
      <div className="form-group">
        <label>מקור הגעה</label>
        <select
          value={form.leadSource}
          onChange={e => updateField('leadSource', e.target.value)}
        >
          <option value={LeadSource.FRIEND}>חבר</option>
          <option value={LeadSource.SOCIAL_MEDIA}>רשתות</option>
          <option value={LeadSource.ONLINE_AD}>פרסום</option>
          <option value={LeadSource.WALK_IN}>רחוב</option>
        </select>
      </div>

      {/* פעיל */}
      <div className="form-group-inline">
        <label>פעיל</label>
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={e => updateField('isActive', e.target.checked)}
        />
      </div>

      {/* הערות */}
      <div className="form-group">
        <label>הערות</label>
        <textarea
          value={form.notes}
          onChange={e => updateField('notes', e.target.value)}
        />
      </div>

      {errors.general && <div className="error">{errors.general}</div>}

      <div className="form-actions">
        <button onClick={() => navigate(-1)}>ביטול</button>

        <button onClick={handleSave} disabled={loading}>
          {loading ? 'שומר...' : 'שמור'}
        </button>
      </div>
    </div>
  )
}