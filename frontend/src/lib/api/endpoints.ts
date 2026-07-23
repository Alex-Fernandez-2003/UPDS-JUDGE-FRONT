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
} as const
