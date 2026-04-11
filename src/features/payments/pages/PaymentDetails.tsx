import { useParams, useNavigate } from 'react-router-dom'
import { usePayments } from '../hooks/usePayments'
import { useCustomers } from '@/features/customers/hooks/useCustomers'
import { useState, useEffect } from 'react'
import DetailsLayout from '@/shared/components/ItemDetails/DetailsLayout'
import DetailsRow from '@/shared/components/ItemDetails/DetailsRow'
import { type Payment, PaymentMethod } from '../types'

export default function PaymentDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { customers } = useCustomers()
  const { fetchPayment, updatePayment, deletePayment } = usePayments()

  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    customerId: '',
    subtotal: 0,
    discount: 0,
    method: '' as PaymentMethod,
    date: ''
  })

  useEffect(() => {
    async function loadData() {
      if (!id) return
      try {
        const data = await fetchPayment(id)
        if (data) {
          setPayment(data)
          setForm({
            customerId: data.customerId,
            subtotal: data.summary.subtotal,
            discount: data.summary.discount,
            method: data.method,
            date: new Date(data.date).toISOString().split('T')[0]
          })
        }
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) return <div className="loading-state">טוען...</div>
  if (!payment) return <div className="error-state">תשלום לא נמצא</div>

  const total = Math.max(form.subtotal - form.discount, 0)

  const handleSave = async () => {
    if (!form.customerId) return alert('חובה לבחור לקוח')
    setSaving(true)

    try {
      const updatedData = {
        customerId: form.customerId,
        method: form.method,
        date: new Date(form.date).toISOString(),
        summary: {
          subtotal: form.subtotal,
          discount: form.discount,
          total: total
        }
      }

      await updatePayment(payment.id, updatedData)
      setPayment(prev => prev ? { ...prev, ...updatedData } : null)
      setIsEditing(false)
    } catch (err) {
      alert('שגיאה בעדכון התשלום')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DetailsLayout
      title={`${payment.referenceNumber}`}
      leftAction={
        !isEditing ? (
          <button className="secondary-btn" onClick={() => setIsEditing(true)}>עריכה</button>
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
          <DetailsRow label="לקוח" value={customers.find(c => c.id === payment.customerId)?.personal.name || 'לקוח לא ידוע'} />
          <DetailsRow label="תאריך" value={new Date(payment.date).toLocaleDateString('he-IL')} />
          <DetailsRow label="אמצעי תשלום" value={payment.method} />
          <hr />
          <div className="items-list" style={{ margin: '15px 0' }}>
            <strong>פירוט טיפולים:</strong>
            {payment.items.map((item, idx) => (
              <div key={idx} className="item-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>{item.name} (x{item.quantity})</span>
                <span>₪{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <DetailsRow label="סה״כ לפני הנחה" value={`₪${payment.summary.subtotal.toFixed(2)}`} />
          <DetailsRow label="הנחה" value={`₪${payment.summary.discount.toFixed(2)}`} />
          <DetailsRow label="סה״כ שולם" value={<strong>₪{payment.summary.total.toFixed(2)}</strong>} />
        </div>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label>לקוח</label>
            <select value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })}>
              {customers.map(c => <option key={c.id} value={c.id}>{c.personal.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>תאריך</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>

          <div className="form-group">
            <label>סכום בסיס</label>
            <input type="number" value={form.subtotal} onChange={e => setForm({ ...form, subtotal: Number(e.target.value) })} />
          </div>

          <div className="form-group">
            <label>הנחה</label>
            <input type="number" value={form.discount} onChange={e => setForm({ ...form, discount: Number(e.target.value) })} />
          </div>

          <div className="form-group">
            <label>אמצעי תשלום</label>
            <select value={form.method} onChange={e => setForm({ ...form, method: e.target.value as PaymentMethod })}>
              {Object.values(PaymentMethod).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="total-preview" style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
            סה״כ חדש: <strong>₪{total}</strong>
          </div>

          <button className="delete-btn" onClick={() => { if (confirm('למחוק?')) { deletePayment(payment.id); navigate('/payments'); } }}>
            מחק תשלום
          </button>
        </div>
      )}
    </DetailsLayout>
  )
}