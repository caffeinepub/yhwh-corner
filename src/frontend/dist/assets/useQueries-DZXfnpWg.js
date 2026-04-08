var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { a5 as Subscribable, a6 as shallowEqualObjects, a7 as hashKey, a8 as getDefaultState, a9 as notifyManager, aa as useQueryClient, r as reactExports, ab as noop, ac as shouldThrowError, ad as useActor, ae as useQuery, u as useAuth, af as createActor, A as AdSlotType } from "./index-CTQZhAh4.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function usePublishedVideos(offset = 0n, limit = 20n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    enabled: !!actor && !isFetching
  });
}
function useVideosByCreator(creatorId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "creator", creatorId],
    queryFn: async () => {
      if (!actor || !creatorId) return [];
      try {
        return await actor.listVideosByCreator(creatorId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!creatorId
  });
}
function useVideo(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["video", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      try {
        return await actor.getVideo(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== void 0
  });
}
function useSearchVideos(query) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      try {
        return await actor.searchVideos(query);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && query.trim().length > 0
  });
}
function useUploadVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return actor == null ? void 0 : actor.uploadVideo(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
    }
  });
}
function usePublishVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId) => {
      return actor == null ? void 0 : actor.publishVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] })
  });
}
function useUnpublishVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId) => {
      return actor == null ? void 0 : actor.unpublishVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] })
  });
}
function useRecordWatchTime() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      return actor == null ? void 0 : actor.recordWatchTime({
        videoId: data.videoId,
        watchSeconds: data.seconds
      });
    }
  });
}
function useMyRewardSummary() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["rewards", "summary"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMyRewardSummary();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useClaimDailyReward() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return actor == null ? void 0 : actor.claimDailyReward();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rewards"] })
  });
}
function useMyCreatorEarnings() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["earnings", "my"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getMyCreatorEarnings();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useActiveAds(slotType) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ads", "active", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        if (!slotType) {
          const results = await Promise.all([
            actor.getActiveAds(AdSlotType.homepage_banner),
            actor.getActiveAds(AdSlotType.pre_roll),
            actor.getActiveAds(AdSlotType.sidebar)
          ]);
          return results.flat();
        }
        return await actor.getActiveAds(slotType);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useMyAdCampaigns() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["ads", "my"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyAdCampaigns();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useAdSlotPricing() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ads", "pricing"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAdSlotPricing();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function usePurchaseAdSlot() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return actor == null ? void 0 : actor.purchaseAdSlot(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads"] })
  });
}
function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["platform", "stats"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getPlatformStats();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useListAllCreatorPayouts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["admin", "creator-payouts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listAllCreatorPayouts();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useListAllViewerRewardPayouts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["admin", "viewer-payouts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.listAllViewerRewardPayouts();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function useRegisterUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return actor == null ? void 0 : actor.register({
        username: data.username,
        email: data.email,
        role: data.role
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUser"] })
  });
}
function useApproveUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      return actor == null ? void 0 : actor.approveUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] })
  });
}
function useFlagUser() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      return actor == null ? void 0 : actor.flagUser(userId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] })
  });
}
function useFlagVideo() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId) => {
      return actor == null ? void 0 : actor.flagVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] })
  });
}
function useSetAdSlotPricing() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return actor == null ? void 0 : actor.setAdSlotPricing(data.slotType, data.dailyPrice);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ads", "pricing"] })
  });
}
function useSetViewerRewardPercent() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (percent) => {
      return actor == null ? void 0 : actor.setViewerRewardPercent(percent);
    }
  });
}
function useSetCreatorRevenueSharePercent() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (percent) => {
      return actor == null ? void 0 : actor.setCreatorRevenueSharePercent(percent);
    }
  });
}
function useListComments(videoId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["comments", videoId == null ? void 0 : videoId.toString()],
    queryFn: async () => {
      if (!actor || videoId === void 0) return [];
      try {
        return await actor.listComments(videoId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && videoId !== void 0
  });
}
function usePostComment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      const result = await (actor == null ? void 0 : actor.postComment(req));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return (result == null ? void 0 : result.__kind__) === "ok" ? result.ok : null;
    },
    onSuccess: (_data, req) => {
      qc.invalidateQueries({ queryKey: ["comments", req.videoId.toString()] });
    }
  });
}
function useDeleteComment() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      videoId
    }) => {
      const result = await (actor == null ? void 0 : actor.deleteComment(commentId, videoId));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, { videoId }) => {
      qc.invalidateQueries({ queryKey: ["comments", videoId.toString()] });
    }
  });
}
function useToggleLike() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId) => {
      return actor == null ? void 0 : actor.toggleLike(videoId);
    },
    onSuccess: (_data, videoId) => {
      qc.invalidateQueries({ queryKey: ["likes", videoId.toString()] });
    }
  });
}
function useGetLikeCount(videoId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["likes", videoId == null ? void 0 : videoId.toString(), "count"],
    queryFn: async () => {
      if (!actor || videoId === void 0) return 0n;
      try {
        return await actor.getLikeCount(videoId);
      } catch {
        return 0n;
      }
    },
    enabled: !!actor && !isFetching && videoId !== void 0
  });
}
function useHasLiked(videoId) {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["likes", videoId == null ? void 0 : videoId.toString(), "hasLiked"],
    queryFn: async () => {
      if (!actor || videoId === void 0) return false;
      try {
        return await actor.hasLiked(videoId);
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated && videoId !== void 0
  });
}
function useActiveLiveStreams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    refetchInterval: 3e4
  });
}
function useGetLiveStream(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["livestream", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      try {
        return await actor.getLiveStream(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && id !== void 0,
    refetchInterval: 15e3
  });
}
function useStartLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      const result = await (actor == null ? void 0 : actor.startLiveStream(req));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return (result == null ? void 0 : result.__kind__) === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] })
  });
}
function useGoLive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (streamId) => {
      const result = await (actor == null ? void 0 : actor.goLive(streamId));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return (result == null ? void 0 : result.__kind__) === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] })
  });
}
function useEndLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (streamId) => {
      const result = await (actor == null ? void 0 : actor.endLiveStream(streamId));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return (result == null ? void 0 : result.__kind__) === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] })
  });
}
function useArchiveLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      streamId,
      videoUrl
    }) => {
      const result = await (actor == null ? void 0 : actor.archiveLiveStream(streamId, videoUrl));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return (result == null ? void 0 : result.__kind__) === "ok" ? result.ok : null;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["livestreams"] })
  });
}
function useJoinLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const result = await (actor == null ? void 0 : actor.joinLiveStream(id));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["livestream", id.toString()] });
    }
  });
}
function useLeaveLiveStream() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const result = await (actor == null ? void 0 : actor.leaveLiveStream(id));
      if ((result == null ? void 0 : result.__kind__) === "err") throw new Error(result.err);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["livestream", id.toString()] });
    }
  });
}
function useRecommendedVideos(limit = 12n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "recommended", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRecommendedVideos(limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useTrendingVideos(limit = 12n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "trending", limit.toString()],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTrendingVideos(limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useRelatedVideos(videoId, limit = 8n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["videos", "related", videoId == null ? void 0 : videoId.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor || videoId === void 0) return [];
      try {
        return await actor.getRelatedVideos(videoId, limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching && videoId !== void 0
  });
}
export {
  useRecordWatchTime as A,
  useGetLikeCount as B,
  useHasLiked as C,
  useToggleLike as D,
  useListComments as E,
  usePostComment as F,
  useRelatedVideos as G,
  useDeleteComment as H,
  useSearchVideos as I,
  useStartLiveStream as J,
  useGoLive as K,
  useEndLiveStream as L,
  useArchiveLiveStream as M,
  useGetLiveStream as N,
  useJoinLiveStream as O,
  useLeaveLiveStream as P,
  useActiveAds as a,
  useActiveLiveStreams as b,
  useTrendingVideos as c,
  useRecommendedVideos as d,
  useRegisterUser as e,
  useUploadVideo as f,
  useMyCreatorEarnings as g,
  useVideosByCreator as h,
  usePublishVideo as i,
  useUnpublishVideo as j,
  useMyRewardSummary as k,
  useClaimDailyReward as l,
  useAdSlotPricing as m,
  usePurchaseAdSlot as n,
  useMyAdCampaigns as o,
  useApproveUser as p,
  useFlagUser as q,
  useFlagVideo as r,
  useSetAdSlotPricing as s,
  useSetViewerRewardPercent as t,
  usePublishedVideos as u,
  useSetCreatorRevenueSharePercent as v,
  usePlatformStats as w,
  useListAllCreatorPayouts as x,
  useListAllViewerRewardPayouts as y,
  useVideo as z
};
