/** Relative to the configured /api base URL. */
export const endpoints = {
  auth: {
    login: 'Auth/login',
    register: 'Auth/register',
  },
  contests: {
    list: 'Concursos',
    create: 'Concursos/crear',
  },
} as const
