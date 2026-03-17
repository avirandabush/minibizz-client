import { useNavigate } from 'react-router-dom'

function NewClient() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>New Customer</h1>
      {/* form יבוא בהמשך */}
      <button onClick={() => navigate(-1)}>חזור</button>
    </div>
  )
}

export default NewClient