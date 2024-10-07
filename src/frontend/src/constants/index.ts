export const routesMap = {
  home: "/",
  feed: "/feed",
  register: "/auth/register",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  addFindings: "/findings/create",
  viewFinding: "/findings/view",
};

export const globals = {
  appName: "Air-data",
};

export const serverRoutes = {
  login: `login`,
  logout: `logout`,
  userProfiles: `user-profiles`,
  register: `register`,
  userFindings: `user-findings`,
} as const;
