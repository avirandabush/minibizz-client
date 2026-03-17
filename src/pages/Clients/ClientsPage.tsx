

import { useNavigate } from 'react-router-dom'

function ClientsPage() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Customers</h1>

      <button onClick={() => navigate('/clients/new')}>
        Add Customer
      </button>

      <ul>
        <li onClick={() => navigate('/clients/1')}>
          Customer #1
        </li>
      </ul>
    </div>
  )
}

export default ClientsPage