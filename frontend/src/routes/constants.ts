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
  adminUserContests: '/admin/user-access/contests',
  adminUserContestProblems: (contestCode: string) =>
    `/admin/user-access/contests/${encodeURIComponent(contestCode)}/problems`,
  adminUserContestSubmissions: (contestCode: string) =>
    `/admin/user-access/contests/${encodeURIComponent(contestCode)}/submissions`,
  dashboard: '/admin/dashboard',
  legacyDashboard: '/dashboard',
  contests: '/admin/contests',
  newContest: '/admin/contests/new',
  devUi: '/dev/ui',


  adminRoleList: '/admin/roles',


} as const
