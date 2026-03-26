import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTreatments } from '../../hooks/useTreatments'
import { TreatmentStatus, TreatmentColor } from '../../types'
import '../NewForm.css'

export default function NewTreatment() {
  const navigate = useNavigate()
  const { createTreatment } = useTreatments()

  const [form, setForm] = useState({
    name: '',
    price: '',
    durationMinutes: 60,
    status: TreatmentStatus.ACTIVE,
    color: TreatmentColor.BLUE,
    description: '',
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

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = 'מחיר חייב להיות גדול מ-0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      await createTreatment({
        name: form.name.trim(),
        price: Number(form.price),
        durationMinutes: form.durationMinutes,
        status: form.status,
        color: form.color,
        description: form.description.trim(),
      })

      navigate('/treatments')
    } catch {
      setErrors({ general: 'שגיאה בשמירה' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>טיפול חדש</h2>

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

      {/* מחיר */}
      <div className="form-group">
        <label>מחיר *</label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={form.price}
          onChange={e => updateField('price', e.target.value)}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>

      {/* משך */}
      <div className="form-group">
        <label>משך (דקות)</label>
        <select
          value={form.durationMinutes}
          onChange={e => updateField('durationMinutes', Number(e.target.value))}
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
          <option value={60}>60</option>
          <option value={90}>90</option>
        </select>
      </div>

      {/* סטטוס */}
      <div className="form-group">
        <label>סטטוס</label>
        <select
          value={form.status}
          onChange={e => updateField('status', e.target.value)}
        >
          <option value={TreatmentStatus.ACTIVE}>פעיל</option>
          <option value={TreatmentStatus.INACTIVE}>לא פעיל</option>
        </select>
      </div>

      {/* צבע */}
      <div className="form-group">
        <label>צבע</label>
        <div className="color-picker">
          {Object.values(TreatmentColor).map(color => (
            <button
              key={color}
              type="button"
              className={`color ${color} ${form.color === color ? 'selected' : ''}`}
              onClick={() => updateField('color', color)}
            />
          ))}
        </div>
      </div>

      {/* תיאור */}
      <div className="form-group">
        <label>תיאור</label>
        <textarea
          value={form.description}
          onChange={e => updateField('description', e.target.value)}
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