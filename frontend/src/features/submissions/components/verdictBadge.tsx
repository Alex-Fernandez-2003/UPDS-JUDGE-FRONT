import { CheckCircle2, XCircle, AlertTriangle, Hourglass } from 'lucide-react'
import { Badge } from '@/components/common'
import type { SubmissionVerdict } from '../Types/submissionTypes'

interface Props {
  verdict: SubmissionVerdict
}

export function VerdictBadge({ verdict }: Props) {
  switch (verdict) {
    case 'Accepted':
      return (
        <Badge tone="success" className="gap-1 font-bold">
          <CheckCircle2 className="size-3" />
          ACCEPTED
        </Badge>
      )

    case 'Wrong Answer':
      return (
        <Badge tone="danger" className="gap-1 font-bold">
          <XCircle className="size-3" />
          WRONG ANSWER
        </Badge>
      )

    case 'Time Limit Exceeded':
    case 'Memory Limit Exceeded':
      return (
        <Badge tone="warning" className="gap-1 font-bold">
          <Hourglass className="size-3" />
          {verdict.toUpperCase()}
        </Badge>
      )

    case 'Compilation Error':
    case 'Runtime Error':
      return (
        <Badge tone="danger" className="gap-1 font-bold">
          <AlertTriangle className="size-3" />
          {verdict.toUpperCase()}
        </Badge>
      )

    case 'En Cola':
    case 'Procesando':
    case 'Evaluando':
      return (
        <Badge tone="warning" className="gap-1 font-bold">
          <Hourglass className="size-3 animate-pulse" />
          EN PROGRESO
        </Badge>
      )

    default:
      return <Badge>{verdict}</Badge>
  }
}
