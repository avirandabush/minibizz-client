import { useParams, useNavigate } from 'react-router-dom'
import { usePayments } from '../hooks/usePayments'
import { useCustomers } from '@/features/customers/hooks/useCustomers'
import { useState, useEffect } from 'react'
import DetailsLayout from '@/shared/components/ItemDetails/DetailsLayout'
import DetailsRow from '@/shared/components/ItemDetails/DetailsRow'
import type { Payment } from '../types'

export default function PaymentDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { customers } = useCustomers()
  const { fetchPayment, updatePayment, deletePayment } = usePayments()

  // State מקומי לתשלום הספציפי
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // שדות עריכה
  const [subtotal, setSubtotal] = useState('')
  const [discount, setDiscount] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')

  useEffect(() => {
    async function loadData() {
      if (!id) return
      setLoading(true)
      try {
        const data = await fetchPayment(id)
        if (data) {
          setPayment(data)
          // עדכון שדות העריכה בנתונים שהגיעו
          setSubtotal(data.summary.subtotal.toString())
          setDiscount(data.summary.discount.toString())
          setSelectedCustomerId(data.customerId)
        }
      } catch (err) {
        console.error("Failed to load payment", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id])

  if (loading) return <div className="p-4 text-center">טוען נתונים...</div>
  if (!payment) return <div className="p-4 text-center">תשלום לא נמצא</div>

  const isValid =
    subtotal.trim().length > 0 &&
    !isNaN(parseFloat(subtotal)) &&
    discount.trim().length > 0 &&
    !isNaN(parseFloat(discount)) &&
    parseFloat(subtotal) >= parseFloat(discount)

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.personal.name || 'לקוח לא ידוע'
  }

  const handleSave = async () => {
    if (!isValid || !payment) return
    setSaving(true)

    try {
      const newSubtotal = parseFloat(subtotal)
      const newDiscount = parseFloat(discount)

      const updatedData = {
        summary: {
          subtotal: newSubtotal,
          discount: newDiscount,
          total: newSubtotal - newDiscount,
        },
        customerId: selectedCustomerId
      }

      await updatePayment(payment.id, updatedData)

      // עדכון ה-State המקומי כדי שהתצוגה תתעדכן
      setPayment({
        ...payment,
        ...updatedData,
        summary: { ...updatedData.summary }
      })

      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setSubtotal(payment.summary.subtotal.toString())
    setDiscount(payment.summary.discount.toString())
    setSelectedCustomerId(payment.customerId)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (!payment) return
    const confirmDelete = confirm('האם אתה בטוח שברצונך למחוק תשלום זה?')
    if (!confirmDelete) return

    await deletePayment(payment.id)
    navigate('/payments')
  }

  return (
    <DetailsLayout
      title={`פרטי תשלום: ${payment.referenceNumber}`}
      leftAction={
        !isEditing ? (
          payment.status === 'COMPLETED' ? (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              תשלום הושלם
            </span>
          ) : (
            <button className="secondary-btn" onClick={() => setIsEditing(true)}>
              עריכה
            </button>
          )
        ) : (
          <div className="flex gap-2">
            <button className="text-btn" onClick={handleCancel}>ביטול</button>
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
        <div className="space-y-4">
          <DetailsRow label="לקוח" value={getCustomerName(payment.customerId)} />
          <DetailsRow label="סכום (לפני הנחה)" value={`₪${payment.summary.subtotal.toFixed(2)}`} />
          <DetailsRow label="הנחה" value={`₪${payment.summary.discount.toFixed(2)}`} />
          <DetailsRow label="סה״כ לתשלום" value={`₪${payment.summary.total.toFixed(2)}`} />
          <DetailsRow label="אמצעי תשלום" value={payment.method} />
          <DetailsRow
            label="תאריך"
            value={new Date(payment.date).toLocaleDateString('he-IL')}
          />
        </div>
      ) : (
        <div className="space-y-4">

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">לקוח</label>
            <select
              value={selectedCustomerId}
              onChange={e => setSelectedCustomerId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.personal.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">סכום בסיס (₪) *</label>
            <input
              type="number"
              value={subtotal}
              onChange={e => setSubtotal(e.target.value)}
              className={`w-full p-2 border rounded ${!isValid ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">הנחה (₪) *</label>
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.value)}
              className={`w-full p-2 border rounded ${!isValid ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="pt-6 border-t mt-6">
            <button className="w-full p-2 text-red-600 border border-red-200 rounded hover:bg-red-50" onClick={handleDelete}>
              מחק תשלום
            </button>
          </div>
        </div>
      )}
    </DetailsLayout>
  )
}