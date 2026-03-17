import { useNavigate } from 'react-router-dom'

function NewPayment() {
  const navigate = useNavigate()


  return (
    <div>
      <h1>New Payment</h1>
      {/* form יבוא בהמשך */}
      <button onClick={() => navigate(-1)}>חזור</button>
    </div>
  )
}

export default NewPayment