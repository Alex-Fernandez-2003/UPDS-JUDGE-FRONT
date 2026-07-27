export const routes = {
  login: '/login',
  register: '/register',
  studentHome: '/student',
  studentListCompetitions: '/student/concursos',
  userHistory: '/student/history',
  studentContestProblems: (contestCode: string) =>
    `/student/contests/${encodeURIComponent(contestCode)}/problems`,
  studentContestSubmissions: (contestCode: string) =>
    `/student/contests/${encodeURIComponent(contestCode)}/submissions`,
  studentContestRanking: (contestCode: string) =>
    `/student/contests/${encodeURIComponent(contestCode)}/ranking`,
  submissions: '/submissions',
  adminUserContests: '/admin/user-access/contests',
  adminUserSubmissions: '/admin/user-access/submissions',
  adminUserContestProblems: (contestCode: string) =>
    `/admin/user-access/contests/${encodeURIComponent(contestCode)}/problems`,
  adminUserContestSubmissions: (contestCode: string) =>
    `/admin/user-access/contests/${encodeURIComponent(contestCode)}/submissions`,
  dashboard: '/admin/dashboard',
  legacyDashboard: '/dashboard',
  contests: '/admin/contests',
  newContest: '/admin/contests/new',
  editContest: (contestCode: string) =>
    `/admin/contests/${encodeURIComponent(contestCode)}/edit`,
  adminRoleList: '/admin/roles',
  devUi: '/dev/ui',
} as const
//comentando
