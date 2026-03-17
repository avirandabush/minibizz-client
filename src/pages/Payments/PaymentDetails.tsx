import { useParams, useNavigate } from 'react-router-dom'

function PaymentDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Payment Details</h1>
      <p>ID: {id}</p>
      <button onClick={() => navigate(-1)}>חזור</button>
    </div>
  )
}

export default PaymentDetailsPage