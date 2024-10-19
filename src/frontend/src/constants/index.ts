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
};

export const globals = {
  appName: "Daatelli",
};

export const serverRoutes = {
  login: `login`,
  logout: `logout`,
  users: `users`,
  userFindings: `user-findings`,
  me: `users/me`,
  associations: `users/associations`,
  health: `health`,
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
