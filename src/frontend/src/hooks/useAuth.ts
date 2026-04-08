import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    login,
    clear,
    loginStatus,
    identity,
    isInitializing,
    isLoginSuccess,
  } = useInternetIdentity();

  // User is authenticated when they have an identity (either loaded or freshly logged in)
  const isAuthenticated = !!identity;
  const isLoading = isInitializing;

  return {
    login,
    logout: clear,
    isAuthenticated,
    isLoading,
    identity,
    loginStatus,
    isLoginSuccess,
  };
}
