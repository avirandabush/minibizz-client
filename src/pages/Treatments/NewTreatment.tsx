import { useNavigate } from 'react-router-dom'

function NewTreatment() {
    const navigate = useNavigate()
  return (
    <div>
      <h1>New Treatment</h1>
      {/* form יבוא בהמשך */}
        <button onClick={() => navigate(-1)}>חזור</button>
    </div>
  )
}

export default NewTreatment