import { useParams } from 'react-router'
import UserContestsPage from '@/features/contests/user/pages/UserContestsPage'
import { ContestProblemsContent } from '@/features/problems/pages/ContestProblemsPage'
import { ContestSubmissionsContent } from '@/features/submissions/Pages/SubmissionsPage'
import { AdminLayout } from '@/layouts/AdminLayout'
import { routes } from '@/routes/constants'

const navigationItems = (contestCode: string) => [
  {
    id: 'problems' as const,
    label: 'Problemas',
    to: routes.adminUserContestProblems(contestCode),
  },
  {
    id: 'submissions' as const,
    label: 'Mis envíos',
    to: routes.adminUserContestSubmissions(contestCode),
  },
]

export function AdminUserContestsPage() {
  return (
    <AdminLayout>
      <UserContestsPage
        problemsPath={routes.adminUserContestProblems}
        submissionsPath={routes.adminUserContestSubmissions}
        homePath={routes.adminUserContests}
      />
    </AdminLayout>
  )
}

export function AdminUserContestProblemsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  return (
    <AdminLayout>
      <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <ContestProblemsContent
          contestCode={contestCode}
          navigationItems={navigationItems(contestCode ?? '')}
        />
      </main>
    </AdminLayout>
  )
}

export function AdminUserContestSubmissionsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  return (
    <AdminLayout>
      <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <ContestSubmissionsContent
          contestCode={contestCode}
          navigationItems={navigationItems(contestCode ?? '')}
        />
      </main>
    </AdminLayout>
  )
}
