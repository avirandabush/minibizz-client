import { useParams, useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import { useState, useEffect } from 'react'
import DetailsLayout from '../../components/ItemDetails/DetailsLayout'
import DetailsRow from '../../components/ItemDetails/DetailsRow'

export default function CustomerDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { customers, updateCustomer, deleteCustomer, loading } = useCustomers()

  const customer = customers.find(c => c.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (customer) {
      setName(customer.name)
      setPhone(customer.phone || '')
    }
  }, [customer])

  if (loading) return <div>Loading...</div>
  if (!customer) return <div>לקוח לא נמצא</div>

  const isValid = name.trim().length > 0

  const handleSave = async () => {
    if (!isValid) return

    setSaving(true)

    try {
      await updateCustomer(customer.id, {
        name: name.trim(),
        phone: phone.trim(),
      })

      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName(customer.name)
    setPhone(customer.phone || '')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const confirmDelete = confirm('למחוק לקוח?')
    if (!confirmDelete) return

    await deleteCustomer(customer.id)
    navigate('/customers')
  }

  return (
    <DetailsLayout
      title="פרטי לקוח"
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
          <DetailsRow label="שם" value={customer.name} />
          <DetailsRow label="טלפון" value={customer.phone || '-'} />
          <DetailsRow
            label="נוצר בתאריך"
            value={new Date(customer.createdAt).toLocaleDateString('he-IL')}
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