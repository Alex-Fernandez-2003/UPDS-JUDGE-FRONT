/** Relative to the configured /api base URL. */
//comentando
export const endpoints = {
  auth: {
    login: 'Auth/login',
    register: 'Auth/register',
  },
  contests: {
    adminList: 'Concursos/mis-creados',
    adminSummary: 'Concursos/mis-resumen',
    create: 'Concursos/crear',
    userStats: 'ParticipanteConcursos/stats-contest',
    userSubmissions: 'Envios/mis-envios',
    userListCompetition: 'Concursos',
    join: 'ParticipanteConcursos/unirse',
    dashboard: (contestCode: string) =>
      `Concursos/dashboard/${encodeURIComponent(contestCode)}`,
  },
  submissions: {
    // Genera la ruta: /envios/concurso/div4med (ajusta /envios según tu Controller)
    listByContest: (concursoCodigo: string) =>
      `/envios/concurso/${concursoCodigo}`,
    create: '/envios',
  },
  roles: {
    list: 'Roles',
    users: 'Roles/usuarios',
    assign: 'Roles/agregar',
    remove: 'Roles/quitar',
  },
} as const
