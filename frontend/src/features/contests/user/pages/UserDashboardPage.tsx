import { RecentSubmissionsSection } from '../RecentSubmissionsSection'
import { UserContestStatsSection } from '../UserContestStatsSection'
import { UserWelcome } from '../components/UserWelcome'
import UserContestsPage from './UserContestsPage'

type UserDashboardPageProps = {
  name?: string
}

export default function UserDashboardPage({ name }: UserDashboardPageProps) {
  return (
    <div className="mx-auto w-full space-y-6 lg:relative lg:left-1/2 lg:w-screen lg:max-w-screen-2xl lg:-translate-x-1/2 lg:px-8">
      <UserWelcome name={name} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]">
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
