import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdSlotType, createActor } from "../backend";
import type {
  AdPublic,
  CommentPublic,
  CreatorEarningsPublic,
  CreatorPayout,
  LiveStreamPublic,
  PlatformStats,
  PostCommentRequest,
  RewardSummary,
  StartLiveStreamRequest,
  VideoPublic,
  ViewerRewardPayout,
} from "../backend.d";
import { useAuth } from "./useAuth";

// Re-export convenience types for pages
export type {
  CommentPublic,
  CreatorPayout,
  LiveStreamPublic,
  PostCommentRequest,
  StartLiveStreamRequest,
  ViewerRewardPayout,
  PlatformStats,
};
export { AdSlotType };

// ─── Videos ────────────────────────────────────────────────────────────────

export function usePublishedVideos(offset = 0n, limit = 20n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "published", offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const page = await actor.listPublishedVideos(offset, limit);
        return page.items;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVideosByCreator(creatorId?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "creator", creatorId],
    queryFn: async () => {
      if (!actor || !creatorId) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await actor.listVideosByCreator(creatorId as any);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!creatorId,
  });
}

export function useVideo(id?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic | null>({
    queryKey: ["video", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      try {
        return await actor.getVideo(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSearchVideos(query: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      try {
        return await actor.searchVideos(query);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && query.trim().length > 0,
  });
}

export function useUploadVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      thumbnailUrl: string;
      videoUrl: string;
      category: string;
      tags: string[];
    }) => {
      return actor?.uploadVideo(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function usePublishVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: bigint) => {
      return actor?.publishVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useUnpublishVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: bigint) => {
      return actor?.unpublishVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useRecordWatchTime() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: { videoId: bigint; seconds: bigint }) => {
      return actor?.recordWatchTime({
        videoId: data.videoId,
        watchSeconds: data.seconds,
      });
    },
  });
}

// ─── Rewards ───────────────────────────────────────────────────────────────

export function useMyRewardSummary() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<RewardSummary | null>({
    queryKey: ["rewards", "summary"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMyRewardSummary();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useClaimDailyReward() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return actor?.claimDailyReward();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rewards"] }),
  });
}

// ─── Creator Earnings ──────────────────────────────────────────────────────

export function useMyCreatorEarnings() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<CreatorEarningsPublic | null>({
    queryKey: ["earnings", "my"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMyCreatorEarnings();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

// ─── Ads ───────────────────────────────────────────────────────────────────

export function useActiveAds(slotType?: AdSlotType) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdPublic[]>({
    queryKey: ["ads", "active", slotType ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        if (!slotType) {
          const results = await Promise.all([
            actor.getActiveAds(AdSlotType.homepage_banner),
            actor.getActiveAds(AdSlotType.pre_roll),
            actor.getActiveAds(AdSlotType.sidebar),
          ]);
          return results.flat();
        }
        return await actor.getActiveAds(slotType);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyAdCampaigns() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<AdPublic[]>({
    queryKey: ["ads", "my"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyAdCampaigns();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useAdSlotPricing() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<[AdSlotType, bigint][]>({
    queryKey: ["ads", "pricing"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAdSlotPricing();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePurchaseAdSlot() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      logoUrl: string;
      targetUrl: string;
      slotType: AdSlotType;
      durationDays: bigint;
    }) => {
      return actor?.purchaseAdSlot(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads"] }),
  });
}

// ─── Platform Stats ────────────────────────────────────────────────────────

export function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PlatformStats | null>({
    queryKey: ["platform", "stats"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getPlatformStats();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Admin ─────────────────────────────────────────────────────────────────

export function useListAllCreatorPayouts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<CreatorPayout[]>({
    queryKey: ["admin", "creator-payouts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listAllCreatorPayouts();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useListAllViewerRewardPayouts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<ViewerRewardPayout[]>({
    queryKey: ["admin", "viewer-payouts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listAllViewerRewardPayouts();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      role: string;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actor?.register({
        username: data.username,
        email: data.email,
        role: data.role as any,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}

export function useUpdateProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { username?: string; email?: string }) => {
      return actor?.updateProfile(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] }),
  });
}

export function useApproveUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actor?.approveUser(userId as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
}

export function useFlagUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return actor?.flagUser(userId as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
}

export function useFlagVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: bigint) => {
      return actor?.flagVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useSetAdSlotPricing() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { slotType: AdSlotType; dailyPrice: bigint }) => {
      return actor?.setAdSlotPricing(data.slotType, data.dailyPrice);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads", "pricing"] }),
  });
}

export function useSetViewerRewardPercent() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (percent: bigint) => {
      return actor?.setViewerRewardPercent(percent);
    },
  });
}

export function useSetCreatorRevenueSharePercent() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (percent: bigint) => {
      return actor?.setCreatorRevenueSharePercent(percent);
    },
  });
}

// ─── Comments ──────────────────────────────────────────────────────────────

export function useListComments(videoId?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CommentPublic[]>({
    queryKey: ["comments", videoId?.toString()],
    queryFn: async () => {
      if (!actor || videoId === undefined) return [];
      try {
        return await actor.listComments(videoId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && videoId !== undefined,
  });
}

export function usePostComment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: PostCommentRequest) => {
      const result = await actor?.postComment(req);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return result?.__kind__ === "ok" ? result.ok : null;
    },
    onSuccess: (_data, req) => {
      qc.invalidateQueries({ queryKey: ["comments", req.videoId.toString()] });
    },
  });
}

export function useDeleteComment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      videoId,
    }: { commentId: bigint; videoId: bigint }) => {
      const result = await actor?.deleteComment(commentId, videoId);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, { videoId }) => {
      qc.invalidateQueries({ queryKey: ["comments", videoId.toString()] });
    },
  });
}

// ─── Likes ─────────────────────────────────────────────────────────────────

export function useToggleLike() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: bigint) => {
      return actor?.toggleLike(videoId);
    },
    onSuccess: (_data, videoId) => {
      qc.invalidateQueries({ queryKey: ["likes", videoId.toString()] });
    },
  });
}

export function useGetLikeCount(videoId?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["likes", videoId?.toString(), "count"],
    queryFn: async () => {
      if (!actor || videoId === undefined) return 0n;
      try {
        return await actor.getLikeCount(videoId);
      } catch {
        return 0n;
      }
    },
    enabled: !!actor && !isFetching && videoId !== undefined,
  });
}

export function useHasLiked(videoId?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery<boolean>({
    queryKey: ["likes", videoId?.toString(), "hasLiked"],
    queryFn: async () => {
      if (!actor || videoId === undefined) return false;
      try {
        return await actor.hasLiked(videoId);
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated && videoId !== undefined,
  });
}

// ─── Live Streams ──────────────────────────────────────────────────────────

export function useActiveLiveStreams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LiveStreamPublic[]>({
    queryKey: ["livestreams", "active"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listActiveLiveStreams();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useGetLiveStream(id?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LiveStreamPublic | null>({
    queryKey: ["livestream", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      try {
        return await actor.getLiveStream(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== undefined,
    refetchInterval: 15_000,
  });
}

export function useStartLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: StartLiveStreamRequest) => {
      const result = await actor?.startLiveStream(req);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return result?.__kind__ === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] }),
  });
}

export function useGoLive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (streamId: bigint) => {
      const result = await actor?.goLive(streamId);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return result?.__kind__ === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] }),
  });
}

export function useEndLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (streamId: bigint) => {
      const result = await actor?.endLiveStream(streamId);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return result?.__kind__ === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] }),
  });
}

export function useArchiveLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      streamId,
      videoUrl,
    }: { streamId: bigint; videoUrl: string }) => {
      const result = await actor?.archiveLiveStream(streamId, videoUrl);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return result?.__kind__ === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] }),
  });
}

export function useJoinLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const result = await actor?.joinLiveStream(id);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["livestream", id.toString()] });
    },
  });
}

export function useLeaveLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const result = await actor?.leaveLiveStream(id);
      if (result?.__kind__ === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["livestream", id.toString()] });
    },
  });
}

// ─── Recommendations ───────────────────────────────────────────────────────

export function useRecommendedVideos(limit = 12n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "recommended", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRecommendedVideos(limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTrendingVideos(limit = 12n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "trending", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTrendingVideos(limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRelatedVideos(videoId?: bigint, limit = 8n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoPublic[]>({
    queryKey: ["videos", "related", videoId?.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor || videoId === undefined) return [];
      try {
        return await actor.getRelatedVideos(videoId, limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && videoId !== undefined,
  });
}
