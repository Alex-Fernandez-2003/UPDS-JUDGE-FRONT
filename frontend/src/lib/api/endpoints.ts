/** Relative to the configured /api base URL. */
export const endpoints = {
  auth: {
    login: 'Auth/login',
    register: 'Auth/register',
  },
  contests: {
    adminList: 'Concursos/mis-creados',
    adminSummary: 'Concursos/mis-resumen',
    create: 'Concursos/crear',
  },
  submissions: {
    // Genera la ruta: /envios/concurso/div4med (ajusta /envios según tu Controller)
    listByContest: (concursoCodigo: string) => `/envios/concurso/${concursoCodigo}`,
    create: '/envios',
  },
} as const
