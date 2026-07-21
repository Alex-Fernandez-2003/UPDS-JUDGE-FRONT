import { Navigate, useNavigate } from 'react-router-dom'
import LoginForm from '@/features/auth/Components/LoginForm'
import type { LoginResponse } from '@/features/auth/authTypes'
import AuthTemplate from '@/features/auth/templates/AuthTemplate'
import { deriveIdentity } from '@/lib/auth/identity'
import { getInitialRoute } from '@/lib/auth/session'
import { routes } from '@/routes/constants'

export default function LoginPage() {
  const navigate = useNavigate()
  const existingToken = sessionStorage.getItem('token')
  const existingIdentity = deriveIdentity(existingToken)

  if (existingIdentity)
    return <Navigate to={getInitialRoute(existingToken)} replace />

  const handleLoginSuccess = (res: LoginResponse) => {
    sessionStorage.setItem('token', res.token)
    navigate(getInitialRoute(res.token), { replace: true })
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
