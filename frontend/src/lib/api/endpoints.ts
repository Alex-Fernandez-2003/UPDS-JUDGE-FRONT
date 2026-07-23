/** Relative to the configured /api base URL. */
export const endpoints = {
  auth: {
    login: 'Auth/login',
    register: 'Auth/register',
  },
  contests: {
    list: 'Concursos/mis-creados',
    create: 'Concursos/crear',
  },
  submissions: {
    mine: 'Envios/mis-envios',
  },
} as const
