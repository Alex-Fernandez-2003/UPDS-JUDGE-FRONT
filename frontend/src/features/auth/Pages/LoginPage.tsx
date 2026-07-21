import { useNavigate } from 'react-router-dom'
import LoginForm from '@/features/auth/Components/LoginForm'
import type { LoginResponse } from '@/features/auth/authTypes'
import AuthTemplate from '@/features/auth/templates/AuthTemplate'
import { routes } from '@/routes/constants'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLoginSuccess = (res: LoginResponse) => {
    sessionStorage.setItem('token', res.token)
    navigate(routes.dashboard)
  }

  return (
    <AuthTemplate mode="login">
      <LoginForm
        onToggleMode={() => navigate(routes.register)}
        onLoginSuccess={handleLoginSuccess}
      />
    </AuthTemplate>
  )
}
