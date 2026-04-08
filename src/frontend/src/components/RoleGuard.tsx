import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { UserRole } from "../types";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
}: RoleGuardProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { user, isLoading: userLoading } = useCurrentUser();

  if (authLoading || userLoading) return null;

  if (!isAuthenticated || !user) {
    return fallback ? <>{fallback}</> : null;
  }

  if (!allowedRoles.includes(user.role)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
