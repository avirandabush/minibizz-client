import { useParams, useNavigate } from 'react-router-dom'
import { useTreatments } from '../hooks/useTreatments'
import { useState, useEffect } from 'react'
import DetailsLayout from '@/shared/components/ItemDetails/DetailsLayout'
import DetailsRow from '@/shared/components/ItemDetails/DetailsRow'
import { TreatmentColor } from '../types'

type TreatmentForm = {
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  color: TreatmentColor;
  isActive: boolean;
};

export default function TreatmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { treatments, updateTreatment, deleteTreatment, loading } = useTreatments()

  const treatment = treatments.find(t => t.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState<TreatmentForm>({
    name: '',
    price: 0,
    durationMinutes: 60,
    description: '',
    color: TreatmentColor.BLUE,
    isActive: true
  })

  useEffect(() => {
    if (treatment) {
      setForm({
        name: treatment.name,
        price: treatment.specs.price,
        durationMinutes: treatment.specs.durationMinutes,
        description: treatment.description || '',
        color: treatment.color as TreatmentColor,
        isActive: treatment.isActive ?? true
      })
    }
  }, [treatment, isEditing])

  if (loading) return <div className="loading-state">טוען...</div>
  if (!treatment) return <div className="error-state">טיפול לא נמצא</div>

  const handleSave = async () => {
    if (!form.name.trim()) return alert('שם חובה')

    setSaving(true)
    try {
      await updateTreatment(treatment.id, {
        name: form.name.trim(),
        description: form.description,
        color: form.color,
        isActive: form.isActive,
        specs: {
          price: Number(form.price),
          durationMinutes: Number(form.durationMinutes)
        }
      })
      setIsEditing(false)
    } catch (err) {
      alert('שגיאה בעדכון הטיפול')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('למחוק טיפול זה לצמיתות?')) {
      await deleteTreatment(treatment.id)
      navigate('/treatments')
    }
  }

  return (
    <DetailsLayout
      title={isEditing ? "עריכת טיפול" : treatment.name}
      leftAction={
        !isEditing ? (
          <button onClick={() => setIsEditing(true)}>עריכה</button>
        ) : (
          <div className="actions-row">
            <button onClick={() => setIsEditing(false)}>ביטול</button>
            <button onClick={handleSave} disabled={saving} className="primary-btn">
              {saving ? 'שומר...' : 'שמור'}
            </button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <div className="details-view">
          <DetailsRow label="שם הטיפול" value={treatment.name} />
          <DetailsRow label="מחיר" value={`₪${treatment.specs.price}`} />
          <DetailsRow label="משך זמן" value={`${treatment.specs.durationMinutes} דקות`} />
          <DetailsRow label="סטטוס" value={treatment.isActive ? 'פעיל' : 'לא פעיל'} />
          <DetailsRow label="תיאור" value={treatment.description || 'אין תיאור'} />
          <div className="details-row">
            <span className="label">צבע במערכת:</span>
            <div className={`color-preview ${treatment.color}`} />
          </div>
        </div>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label>שם הטיפול *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>מחיר</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>משך זמן (דקות)</label>
            <select
              value={form.durationMinutes}
              onChange={e => setForm({ ...form, durationMinutes: Number(e.target.value) })}
            >
              {[15, 30, 45, 60, 90, 120].map(m => (
                <option key={m} value={m}>{m} דקות</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>צבע</label>
            <div className="color-picker">
              {Object.values(TreatmentColor).map(c => (
                <button
                  key={c}
                  className={`color ${c} ${form.color === c ? 'selected' : ''}`}
                  onClick={() => setForm({ ...form, color: c })}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>תיאור</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <button className="delete-btn" onClick={handleDelete} style={{ marginTop: '20px' }}>
            מחק טיפול
          </button>
        </div>
      )}
    </DetailsLayout>
  )
}