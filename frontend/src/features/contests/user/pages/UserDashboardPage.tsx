import { RecentSubmissionsSection } from '../RecentSubmissionsSection'
import { UserContestStatsSection } from '../UserContestStatsSection'
import { UserWelcome } from '../components/UserWelcome'
import UserContestsPage from './UserContestsPage'

type UserDashboardPageProps = {
  name?: string
}

export default function UserDashboardPage({ name }: UserDashboardPageProps) {
  return (
    <div className="w-full min-w-0 space-y-6 px-4 sm:px-6 lg:px-8">
      <UserWelcome name={name} />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <main className="min-w-0 space-y-6">
          <UserContestsPage />
          <RecentSubmissionsSection />
        </main>
        <aside aria-label="Estadísticas del usuario">
          <UserContestStatsSection />
        </aside>
      </div>
    </div>
  )
}
