

import { Badge } from '@/components/common'
import { X } from 'lucide-react'
import { roleTone } from '../../administration/format'

interface AdminRoleBadgeProps {
  role: string
  onRemove?: () => void
}

export function AdminRoleBadge({ role, onRemove }: AdminRoleBadgeProps) {
  return (
    <Badge
      tone={roleTone[role] ?? 'neutral'}
      className="flex items-center gap-1"
    >
      {role}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full hover:bg-black/10 transition-colors"
          title={`Quitar rol ${role}`}
        >
          <X className="size-3" />
        </button>
      )}
    </Badge>
  )
}
