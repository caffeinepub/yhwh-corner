import { u as useAuth, a as useCurrentUser, j as jsxRuntimeExports } from "./index-CTQZhAh4.js";
function RoleGuard({
  allowedRoles,
  children,
  fallback
}) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { user, isLoading: userLoading } = useCurrentUser();
  if (authLoading || userLoading) return null;
  if (!isAuthenticated || !user) {
    return fallback ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: fallback }) : null;
  }
  if (!allowedRoles.includes(user.role)) {
    return fallback ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: fallback }) : null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  RoleGuard as R
};
