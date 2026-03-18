import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import { useTreatments } from '../../hooks/useTreatments'
import { usePayments } from '../../hooks/usePayments'
import { PaymentMethod, PaymentStatus } from '../../types/types'

export default function PaymentCreatePage() {
  const navigate = useNavigate()

  const { customers } = useCustomers()
  const { treatments } = useTreatments()
  const { createPayment } = usePayments()

  const [customerId, setCustomerId] = useState('')
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
  const [amount, setAmount] = useState(0)
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.CASH)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const total = treatments
      .filter(t => selectedTreatments.includes(t.id))
      .reduce((sum, t) => sum + t.price, 0)

    setAmount(total)
  }, [selectedTreatments, treatments])

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    )
  }

  const handleSave = async () => {
    if (!customerId || selectedTreatments.length === 0) return

    setLoading(true)

    try {
      const selected = treatments.filter(t =>
        selectedTreatments.includes(t.id)
      )

      await createPayment({
        date: new Date().toISOString(),
        customerId,
        treatments: selected.map(t => ({
          treatmentId: t.id,
          name: t.name,
          price: t.price,
        })),
        amount,
        method,
        status: PaymentStatus.PENDING,
      })

      navigate('/payments')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>תשלום חדש</h2>

      {/* לקוח */}
      <div className="form-group">
        <label>לקוח</label>
        <select
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
        >
          <option value="">בחר לקוח</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* טיפולים */}
      <div className="form-group">
        <label>טיפולים</label>

        {treatments.map(t => (
          <div key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedTreatments.includes(t.id)}
                onChange={() => toggleTreatment(t.id)}
              />
              {t.name} (₪{t.price})
            </label>
          </div>
        ))}
      </div>

      {/* סכום */}
      <div className="form-group">
        <label>סכום</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </div>

      {/* אמצעי תשלום */}
      <div className="form-group">
        <label>אמצעי תשלום</label>
        <select
          value={method}
          onChange={e => setMethod(e.target.value as PaymentMethod)}
        >
          <option value={PaymentMethod.CASH}>מזומן</option>
          <option value={PaymentMethod.BIT}>ביט</option>
          <option value={PaymentMethod.PAYBOX}>פייבוקס</option>
          <option value={PaymentMethod.BANK_TRANSFER}>העברה בנקאית</option>
        </select>
      </div>

      <div className="form-actions">
        <button onClick={() => navigate(-1)}>ביטול</button>

        <button onClick={handleSave} disabled={loading || !customerId || selectedTreatments.length === 0}>
          {loading ? 'שומר...' : 'שמור'}
        </button>
      </div>
    </div>
  )
}