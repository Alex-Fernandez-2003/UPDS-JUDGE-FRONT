import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common'
import { clearSession } from '@/lib/auth/session'
import { routes } from '@/routes/constants'

export default function UserLandingPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearSession()
    navigate(routes.login, { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Button type="button" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </main>
  )
}
