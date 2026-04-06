import { useParams, useNavigate } from 'react-router-dom'
import { useTreatments } from '../hooks/useTreatments'
import { useState, useEffect } from 'react'
import DetailsLayout from '@/shared/components/ItemDetails/DetailsLayout'
import DetailsRow from '@/shared/components/ItemDetails/DetailsRow'

export default function TreatmentDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { treatments, updateTreatment, deleteTreatment, loading } = useTreatments()

  const treatment = treatments.find(t => t.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (treatment) {
      setName(treatment.name)
      setPrice(treatment.specs.price)
    }
  }, [treatment])

  if (loading) return <div>Loading...</div>
  if (!treatment) return <div>טיפול לא נמצא</div>

  const isValid = name.trim().length > 0

  const handleSave = async () => {
    if (!isValid) return

    setSaving(true)

    try {
      await updateTreatment(treatment.id, {
        name: name.trim(),
        specs: {
          price,
          durationMinutes: 0
        }
      })

      setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName(treatment.name)
    setPrice(treatment.specs.price)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const confirmDelete = confirm('למחוק טיפול?')
    if (!confirmDelete) return

    await deleteTreatment(treatment.id)
    navigate('/treatments')
  }

  return (
    <DetailsLayout
      title="פרטי טיפול"
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
          <DetailsRow label="שם" value={treatment.name} />
          <DetailsRow label="מחיר" value={treatment.specs.price.toFixed(2)} />
          <DetailsRow
            label="נוצר בתאריך"
            value={new Date(treatment.createdAt).toLocaleDateString('he-IL')}
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
            <label>מחיר</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
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