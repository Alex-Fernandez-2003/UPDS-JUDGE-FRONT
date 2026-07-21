import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate} from 'react-router-dom'
import { Spinner } from '@/components/common'
import { isDevelopment } from '@/config/env'
import { routes } from './constants'
import LoginPage from '@/features/auth/Pages/LoginPage';
import RegisterPage from '@/features/auth/Pages/RegisterPage';
import DashboardPage from '@/features/auth/Pages/DashboardPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

export const createAppRouter = (development = isDevelopment) => {
  const DevUi = development ? lazy(() => import('@/dev/ui/DevUi')) : null
  const Placeholder = ({ title }: { title: string }) => (
    <main className="p-8">
      <h1>{title}</h1>
      <p>This route is reserved for a later approved change.</p>
    </main>
  )
  const NotFound = () => (
    <main className="p-8">
      <h1>404</h1>
      <p>The requested page was not found.</p>
    </main>
  )
  return createBrowserRouter([
    { path: '/', element: <Navigate to={routes.login} replace /> },
    { path: routes.login, element: <LoginPage /> },
    { path: routes.dashboard,element: (<ProtectedRoute><DashboardPage /></ProtectedRoute>),},
    { path: routes.register, element: <RegisterPage /> },
    { path: routes.contests, element: <Placeholder title="Contests" /> },
    { path: routes.newContest, element: <Placeholder title="New contest" /> },
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
