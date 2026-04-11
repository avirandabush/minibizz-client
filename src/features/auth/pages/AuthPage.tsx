import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const navigate = useNavigate()
  const { login, register, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async () => {
    if (isLogin) {
      await login(email, password)
    } else {
      await register(email, password)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="page-container">
      <h2>{isLogin ? 'התחברות' : 'הרשמה'}</h2>

      <input
        placeholder="אימייל"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isLogin ? 'התחבר' : 'הירשם'}
      </button>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'אין חשבון? הירשם' : 'יש חשבון? התחבר'}
      </button>
    </div>
  )
}