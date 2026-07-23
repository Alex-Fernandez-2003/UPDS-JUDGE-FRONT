import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spinner } from '@/components/common'
import { isDevelopment } from '@/config/env'
import LoginPage from '@/features/auth/Pages/LoginPage'
import RegisterPage from '@/features/auth/Pages/RegisterPage'
import UserLandingPage from '@/features/auth/Pages/UserLandingPage'
import { CreateContestPage } from '@/features/contests/admin/CreateContestPage'
import AdminContestsPage from '@/features/contests/admin/pages/AdminContestsPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { UserLayout } from '@/layouts/UserLayout'
import { roles } from '@/lib/auth/identity'
import { forbiddenRoute } from '@/lib/auth/session'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { RoleRoute } from '@/routes/RoleRoute'
import { routes } from './constants'

const Forbidden = () => (
  <main className="p-8">
    <h1>Acceso denegado</h1>
    <p>No tenés permisos para acceder a esta sección.</p>
  </main>
)

export const createAppRouter = (development = isDevelopment) => {
  const DevUi = development ? lazy(() => import('@/dev/ui/DevUi')) : null
  const NotFound = () => (
    <main className="p-8">
      <h1>404</h1>
      <p>The requested page was not found.</p>
    </main>
  )
  const adminRoles = [roles.contestsAdmin, roles.rolesAdmin]

  return createBrowserRouter([
    { path: '/', element: <Navigate to={routes.login} replace /> },
    { path: routes.login, element: <LoginPage /> },
    { path: routes.register, element: <RegisterPage /> },
    {
      path: routes.studentHome,
      element: (
        <ProtectedRoute>
          <RoleRoute allowedRoles={[roles.user]}>
            <UserLayout>
              <UserLandingPage />
            </UserLayout>
          </RoleRoute>
        </ProtectedRoute>
      ),
    },
    { path: forbiddenRoute, element: <Forbidden /> },
    {
      path: routes.legacyDashboard,
      element: <Navigate to={routes.dashboard} replace />,
    },
    {
      path: routes.dashboard,
      element: (
        <ProtectedRoute>
          <RoleRoute allowedRoles={adminRoles}>
            <AdminContestsPage />
          </RoleRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: routes.contests,
      element: (
        <ProtectedRoute>
          <RoleRoute allowedRoles={[roles.contestsAdmin]}>
            <AdminContestsPage />
          </RoleRoute>
        </ProtectedRoute>
      ),
    },
    {
      path: routes.newContest,
      element: (
        <ProtectedRoute>
          <RoleRoute allowedRoles={[roles.contestsAdmin]}>
            <AdminLayout>
              <CreateContestPage />
            </AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      ),
    },
    ...(DevUi
      ? [
          {
            path: routes.devUi,
            element: (
              <Suspense fallback={<Spinner />}>
                <DevUi />
              </Suspense>
            ),
          },
        ]
      : []),
    { path: '*', element: <NotFound /> },
  ])
}

export const router = createAppRouter()
