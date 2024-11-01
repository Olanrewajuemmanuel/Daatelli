export const routesMap = {
  home: "/",
  feed: "/feed",
  register: "/auth/register",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  addFindings: "/findings/create",
  viewFinding: "/findings/view",
  roadmap: "/roadmap",
  about: "/about-daatelli",
  developers: "/developers",
  support: "/support",
  privacyPolicy: "/privacy-policy",
  news: "/news",
  genesis: "/genesis",
  shorts: "shorts",
  communities: "communities",
  topResearchers: "top-researchers",
  trends: "trends",
  hotTopics: "hot-topics",
  collaborativeProjects: "collaborations",
  eventsWebinars: "events",
  achievements: "achievements",
  followers: "activities/followers",
  following: "activities/following",
  messages: "system/messages",
};

export const globals = {
  appName: "Daatelli",
};

export const serverRoutes = {
  login: `login`,
  logout: `logout`,
  users: `users`,
  userFindings: `findings`,
  me: `users/me`,
  associations: `users/associations`,
  health: `health`,
  feed: `feed`,
} as const;

export function getURL(route: keyof typeof serverRoutes) {
  if (route === serverRoutes.login || route === serverRoutes.logout) {
    // Auth routes are prefixed with 'auth'
    return `/api/v1/auth/${route}`;
  } else if (route === serverRoutes.health) {
    return `/health/`;
  } else {
    return `/api/v1/${route}`
  }
}

export const authorizedURLs = [
  serverRoutes.me,
  serverRoutes.associations,
  serverRoutes.userFindings,
];
