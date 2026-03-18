import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../hooks/useCustomers'
import './NewCustomer.css'

export default function NewCustomer() {
  const navigate = useNavigate()
  const { createCustomer } = useCustomers()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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
      await createCustomer({
        name: name.trim(),
        phone: phone.trim(),
      })

      navigate('/customers')
    } catch (e) {
      setError('שגיאה בשמירה')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <h2>לקוח חדש</h2>

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
        <label>טלפון</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="לא חובה"
        />
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