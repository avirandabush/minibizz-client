import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import { useTreatments } from '../../hooks/useTreatments'
import { usePayments } from '../../hooks/usePayments'
import { PaymentMethod, PaymentStatus, type PaymentTreatmentLine } from '../../types'
import TreatmentSelector from '../../components/TreatmentSelector/TreatmentSelector'
import '../NewForm.css'

type TreatmentSelection = {
  treatmentId: string
  quantity: number
}

export default function NewPayment() {
  const navigate = useNavigate()
  const { customers } = useCustomers()
  const { treatments } = useTreatments()
  const { createPayment } = usePayments()

  const activeTreatments = treatments.filter(
    t => t.isActive === true
  )

  const [form, setForm] = useState({
    customerId: '',
    date: new Date().toISOString().split('T')[0],
    method: PaymentMethod.CASH,
    discount: 0,
  })

  const [selected, setSelected] = useState<TreatmentSelection[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const subtotal = useMemo(() => {
    return selected.reduce((sum, sel) => {
      const t = activeTreatments.find(item => item.id === sel.treatmentId)
      if (!t) return sum
      return sum + (t.specs.price * sel.quantity)
    }, 0)
  }, [selected, activeTreatments])

  const total = Math.max(subtotal - form.discount, 0)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.customerId) {
      newErrors.customerId = 'חובה לבחור לקוח'
    }

    if (selected.length === 0) {
      newErrors.treatments = 'חובה לבחור לפחות טיפול אחד'
    }

    if (selected.some(s => s.quantity <= 0)) {
      newErrors.treatments = 'כמות חייבת להיות גדולה מ-0'
    }

    if (form.discount < 0) {
      newErrors.discount = 'לא יכול להיות שלילי'
    }

    if (form.discount > subtotal) {
      newErrors.discount = 'לא יכול להיות גדול מהסכום'
    }

    const selectedDate = new Date(form.date)
    if (selectedDate > new Date()) {
      newErrors.date = 'לא ניתן לבחור תאריך עתידי'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setLoading(true)

    try {
      const items: PaymentTreatmentLine[] = selected.map(sel => {
        const t = activeTreatments.find(item => item.id === sel.treatmentId)!
        return {
          treatmentId: t.id,
          name: t.name,
          price: t.specs.price,
          quantity: sel.quantity
        }
      })

      await createPayment({
        customerId: form.customerId,
        items,
        summary: {
          subtotal,
          discount: form.discount,
          total
        },
        method: form.method,
        status: PaymentStatus.PENDING,
        date: new Date(form.date).toISOString(),
      })

      navigate('/payments')
    } catch {
      setErrors({ general: 'שגיאה בשמירה' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>תשלום חדש</h2>

      {/* לקוח */}
      <div className="form-group">
        <label>לקוח *</label>
        <select
          value={form.customerId}
          onChange={e => updateField('customerId', e.target.value)}
        >
          <option value="">בחר לקוח</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.personal.name}
            </option>
          ))}
        </select>
        {errors.customerId && <span className="error">{errors.customerId}</span>}
      </div>

      {/* תאריך */}
      <div className="form-group">
        <label>תאריך *</label>
        <input
          type="date"
          value={form.date}
          max={new Date().toISOString().split('T')[0]}
          onChange={e => updateField('date', e.target.value)}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      {/* טיפולים */}
      <div className="form-group">
        <label>טיפולים *</label>

        {activeTreatments.length === 0 && (
          <div className="sub">אין טיפולים פעילים</div>
        )}

        <TreatmentSelector
          treatments={activeTreatments}
          selected={selected}
          onChange={setSelected}
        />

        {errors.treatments && (
          <span className="error">{errors.treatments}</span>
        )}
      </div>

      {/* סכום */}
      <div className="form-group">
        <label>סכום</label>
        <input type="number" value={subtotal} readOnly />
      </div>

      {/* הנחה */}
      <div className="form-group">
        <label>הנחה</label>
        <input
          type="number"
          min={0}
          max={subtotal}
          value={form.discount}
          onChange={e => updateField('discount', Number(e.target.value))}
        />
        {errors.discount && <span className="error">{errors.discount}</span>}
      </div>

      {/* סה״כ */}
      <div className="form-group">
        <label>סה״כ לתשלום</label>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          ₪{total}
        </div>
      </div>

      {/* אמצעי תשלום */}
      <div className="form-group">
        <label>אמצעי תשלום</label>
        <select
          value={form.method}
          onChange={e => updateField('method', e.target.value)}
        >
          <option value={PaymentMethod.CASH}>מזומן</option>
          <option value={PaymentMethod.BIT}>ביט</option>
          <option value={PaymentMethod.PAYBOX}>פייבוקס</option>
          <option value={PaymentMethod.BANK_TRANSFER}>העברה בנקאית</option>
        </select>
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