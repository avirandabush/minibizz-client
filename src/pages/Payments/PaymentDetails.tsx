import { useParams, useNavigate } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import { useState, useEffect } from 'react'
import DetailsLayout from '../../components/ItemDetails/DetailsLayout'
import DetailsRow from '../../components/ItemDetails/DetailsRow'

export default function PaymentDetailsPage() {
  const { id } = useParams()
  const { customers } = useCustomers()
  const { payments, updatePayment, deletePayment, loading } = usePayments()

  const navigate = useNavigate()

  const payment = payments.find(p => p.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (payment) {
      setName(payment.amount.toString())
      setPhone(payment.customerId || '')
    }
  }, [payment])

  if (loading) return <div>Loading...</div>
  if (!payment) return <div>תשלום לא נמצא</div>

  const isValid = name.trim().length > 0

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.name || 'לא ידוע'
  }

  const handleSave = async () => {
    if (!isValid) return

    setSaving(true)

    try {
      await updatePayment(payment.id, {
        amount: parseFloat(name),
        customerId: phone.trim()
      })

      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName(payment.amount.toString())
    setPhone(payment.customerId || '')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const confirmDelete = confirm('למחוק תשלום?')
    if (!confirmDelete) return

    await deletePayment(payment.id)
    navigate('/payments')
  }

  return (
    <DetailsLayout
      title="פרטי תשלום"
      leftAction={
        !isEditing ? (
          <button onClick={() => setIsEditing(true)}>עריכה</button>
        ) : (
          <div className="actions-row">
            <button onClick={handleCancel}>ביטול</button>
            <button
              onClick={handleSave}
              disabled={!isValid || saving}
              className="primary-btn"
            >
              {saving ? 'שומר...' : 'שמור'}
            </button>
          </div>
        )
      }
    >
      {!isEditing ? (
        <>
          <DetailsRow label="לקוח" value={getCustomerName(payment.customerId)} />
          <DetailsRow label="סכום" value={payment.amount.toFixed(2)} />
          <DetailsRow
            label="נוצר בתאריך"
            value={new Date(payment.date).toLocaleDateString('he-IL')}
          />
        </>
      ) : (
        <>
          <div className="form-group">
            <label>שם *</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className={!isValid ? 'input-error' : ''}
            />
          </div>

          <div className="form-group">
            <label>טלפון</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            מחק לקוח
          </button>
        </>
      )}
    </DetailsLayout>
  )
}