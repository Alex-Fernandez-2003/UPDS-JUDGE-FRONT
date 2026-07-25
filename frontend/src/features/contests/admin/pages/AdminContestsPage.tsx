import { ContestsAdminScreen } from '@/features/contests/admin/ContestsAdminScreen'
import { Breadcrumbs } from '@/components/navigation'
import { AdminLayout } from '@/layouts/AdminLayout'

export default function AdminContestsPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <Breadcrumbs
          items={[{ label: 'Administración' }, { label: 'Concursos' }]}
        />
        <ContestsAdminScreen />
      </div>
    </AdminLayout>
  )
}
