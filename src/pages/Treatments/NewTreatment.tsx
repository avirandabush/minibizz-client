import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTreatments } from '../../hooks/useTreatments'
import { TreatmentStatus, TreatmentColor } from '../../types/index'
// import './NewCustomer.css'

export default function NewTreatment() {
  const navigate = useNavigate()
  const { createTreatment } = useTreatments()

  const [name, setName] = useState('')
  const [status, setStatus] = useState<TreatmentStatus>(TreatmentStatus.ACTIVE)
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!name.trim()) {
      setError('חובה להזין שם')
      return
    }

    setLoading(true)
    setError('')

    try {
      await createTreatment({ 
        name: name.trim(),
        status: status,
        price: price,
        durationMinutes: 60,
        color: TreatmentColor.BLUE,
        description: '',
      })

      navigate('/treatments')
    } catch (e) {
      setError('שגיאה בשמירה')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>טיפול חדש</h2>

      <div className="form-group">
        <label>שם</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="הכנס שם"
        />
      </div>

      <div className="form-group">
        <label>מחיר</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="לא חובה"
        />
      </div>

      <div className="form-group">
        <label>סטטוס</label>
        <select value={status} onChange={e => setStatus(e.target.value as TreatmentStatus)}>
          <option value={TreatmentStatus.ACTIVE}>פעיל</option>
          <option value={TreatmentStatus.INACTIVE}>לא פעיל</option>
        </select>
      </div>

      {error && <div className="error-text">{error}</div>}

      <div className="form-actions">
        <button onClick={() => navigate(-1)}>ביטול</button>

        <button onClick={handleSave} disabled={loading}>
          {loading ? 'שומר...' : 'שמור'}
        </button>
      </div>
    </div>
  )
}