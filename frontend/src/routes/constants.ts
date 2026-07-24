export const routes = {
  login: '/login',
  register: '/register',
  dashboard: '/admin/dashboard',
  legacyDashboard: '/dashboard',
  contests: '/admin/contests',
  newContest: '/admin/contests/new',
  devUi: '/dev/ui',
  problems: '/admin/problem/:codigo',
  problemsPath: (codigo: string) => `/admin/problem/${codigo}`,
} as const
