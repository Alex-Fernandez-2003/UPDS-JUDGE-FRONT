import { RecentSubmissionsSection } from '@/features/contests/user/RecentSubmissionsSection'
import { UserContestStatsSection } from '@/features/contests/user/UserContestStatsSection'

export default function UserLandingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Área de usuario</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        Consultá el resumen de tu actividad y tus envíos recientes.
      </p>
      <div className="mt-6">
        <UserContestStatsSection />
      </div>
      <RecentSubmissionsSection />
    </div>
  )
}
