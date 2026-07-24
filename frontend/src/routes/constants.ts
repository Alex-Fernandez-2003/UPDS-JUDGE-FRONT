export const routes = {
  login: '/login',
  register: '/register',
  studentHome: '/student',
  dashboard: '/admin/dashboard',
  legacyDashboard: '/dashboard',
  contests: '/admin/contests',
  newContest: '/admin/contests/new',
  devUi: '/dev/ui',
  problems: '/problem/:codigo',
  problemsPath: (codigo: string) => `/admin/problem/${codigo}`,
} as const
