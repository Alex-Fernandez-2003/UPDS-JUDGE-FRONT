export const routes = {
  login: '/login',
  register: '/register',
  studentHome: '/student',
  studentListCompetitions: '/student/concursos',
  studentContestProblems: (contestCode: string) =>
    `/student/contests/${encodeURIComponent(contestCode)}/problems`,
  studentContestSubmissions: (contestCode: string) =>
    `/student/contests/${encodeURIComponent(contestCode)}/submissions`,
  submissions: '/submissions',
  dashboard: '/admin/dashboard',
  legacyDashboard: '/dashboard',
  contests: '/admin/contests',
  newContest: '/admin/contests/new',
  devUi: '/dev/ui',
} as const
