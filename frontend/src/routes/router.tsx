import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spinner } from '@/components/common'
import { isDevelopment } from '@/config/env'
import LoginPage from '@/features/auth/Pages/LoginPage'
import RegisterPage from '@/features/auth/Pages/RegisterPage'
import { CreateContestPage } from '@/features/contests/CreateContestPage'
import AdminContestsPage from '@/features/contests/pages/AdminContestsPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { routes } from './constants'
import ContestProblemsPage from '@/features/problems/pages/ContestProblemsPage'

export const createAppRouter = (development = isDevelopment) => {
  const DevUi = development ? lazy(() => import('@/dev/ui/DevUi')) : null
  const NotFound = () => (
    <main className="p-8">
      <h1>404</h1>
      <p>The requested page was not found.</p>
    </main>
  )

  return createBrowserRouter([
    { path: '/', element: <Navigate to={routes.login} replace /> },
    { path: routes.login, element: <LoginPage /> },
    { path: routes.register, element: <RegisterPage /> },
    {
      path: routes.legacyDashboard,
      element: <Navigate to={routes.dashboard} replace />,
    },
    {
      path: routes.dashboard,
      element: (
        <ProtectedRoute>
          <AdminContestsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: routes.contests,
      element: (
        <ProtectedRoute>
          <AdminContestsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: routes.problems, // ahora es '/admin/problem/:codigo'
      element: (
        <ProtectedRoute>
          <AdminLayout>
            <ContestProblemsPage />
          </AdminLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: routes.newContest,
      element: (
        <ProtectedRoute>
          <AdminLayout>
            <CreateContestPage />
          </AdminLayout>
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
