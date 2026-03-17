
import { useNavigate } from 'react-router-dom'

function PaymentsPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Payments</h1>

      <button onClick={() => navigate('/payments/new')}>
        Add Payment
      </button>

      <ul>
        <li onClick={() => navigate('/payments/1')}>
          Payment #1
        </li>
      </ul>
    </div>
  )
}

export default PaymentsPage