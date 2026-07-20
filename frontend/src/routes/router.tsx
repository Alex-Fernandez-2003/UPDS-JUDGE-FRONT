import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Spinner } from '@/components/common'
import { isDevelopment } from '@/config/env'
import { CreateContestPage } from '@/features/contests/CreateContestPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { routes } from './constants'

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
    { path: routes.login, element: <Placeholder title="Login" /> },
    { path: routes.register, element: <Placeholder title="Register" /> },
    { path: routes.contests, element: <Placeholder title="Contests" /> },
    {
      path: routes.newContest,
      element: (
        <AdminLayout>
          <CreateContestPage />
        </AdminLayout>
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
