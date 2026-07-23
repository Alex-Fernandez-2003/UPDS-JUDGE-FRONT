import { endpoints, httpClient } from '@/lib/api'

import type {
  GetMySubmissionsParams,
  GetMySubmissionsResponse,
} from './submissionTypes'

const buildQueryString = (params?: GetMySubmissionsParams) => {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  if (params.resultado) {
    searchParams.set('resultado', params.resultado)
  }

  if (params.concursoCodigo) {
    searchParams.set('concursoCodigo', params.concursoCodigo)
  }

  if (params.inciso) {
    searchParams.set('inciso', params.inciso)
  }

  if (params.pagina !== undefined) {
    searchParams.set('pagina', String(params.pagina))
  }

  if (params.tamanoPagina !== undefined) {
    searchParams.set('tamanoPagina', String(params.tamanoPagina))
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export const submissionsService = {
  getMySubmissions(params?: GetMySubmissionsParams) {
    const query = buildQueryString(params)

    return httpClient.get<GetMySubmissionsResponse>(
      `${endpoints.submissions.mine}${query}`
    )
  },
}