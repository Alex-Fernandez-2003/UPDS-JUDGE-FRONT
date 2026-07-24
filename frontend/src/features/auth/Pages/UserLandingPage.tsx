import { LinkButton } from '@/components/common'
import { routes } from '@/routes/constants'
import { RecentSubmissionsSection } from '@/features/contests/user/RecentSubmissionsSection'
import { UserContestStatsSection } from '@/features/contests/user/UserContestStatsSection'

export default function UserLandingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Área de usuario</h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Consultá el resumen de tu actividad y tus envíos recientes.
          </p>
        </div>
        <LinkButton href={routes.studentListCompetitions}>
          Ver concursos
        </LinkButton>
      </div>

      <div className="space-y-6">
        <UserContestStatsSection />
        <RecentSubmissionsSection />
      </div>
    </div>
  )
}
