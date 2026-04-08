import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserPublic } from "../backend.d";
import { useAuth } from "./useAuth";

export function useCurrentUser() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  const query = useQuery<UserPublic | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMyProfile();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 30_000,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
