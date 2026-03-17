


import { useNavigate } from 'react-router-dom'

function TreatmentsPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Treatments</h1>

      <button onClick={() => navigate('/treatments/new')}>
        Add Treatment
      </button>

      <ul>
        <li onClick={() => navigate('/treatments/1')}>
          Treatment #1
        </li>
      </ul>
    </div>
  )
}

export default TreatmentsPage