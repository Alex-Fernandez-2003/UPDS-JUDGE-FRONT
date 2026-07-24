import { Card } from '@/components/common'
import { cn } from '@/lib/utils/cn'

type UserWelcomeProps = {
  name?: string
  className?: string
}

export function UserWelcome({ name, className }: UserWelcomeProps) {
  const normalizedName = name?.trim()

  return (
    <Card className={cn('space-y-2', className)}>
      <h1 className="text-2xl font-bold sm:text-3xl">
        {normalizedName
          ? `Bienvenido de nuevo, ${normalizedName}`
          : 'Bienvenido de nuevo'}
      </h1>
      <p className="text-[var(--text-secondary)]">
        Consulta tus concursos, estadísticas y envíos recientes.
      </p>
    </Card>
  )
}
