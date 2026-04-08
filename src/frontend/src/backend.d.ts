import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ViewerRewardPayout {
    viewerId: UserId;
    timestamp: Timestamp;
    amount: bigint;
}
export interface WatchEvent {
    watchSeconds: bigint;
    videoId: VideoId;
}
export interface UserPublic {
    id: UserId;
    status: UserStatus;
    username: string;
    balance: bigint;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export interface PostCommentRequest {
    text: string;
    videoId: VideoId;
}
export interface AdPurchaseRequest {
    durationDays: bigint;
    name: string;
    targetUrl: string;
    logoUrl: string;
    slotType: AdSlotType;
}
export interface AdPublic {
    id: AdId;
    durationDays: bigint;
    endDate: Timestamp;
    name: string;
    createdAt: Timestamp;
    totalCost: bigint;
    targetUrl: string;
    isActive: boolean;
    logoUrl: string;
    slotType: AdSlotType;
    advertiserId: UserId;
    startDate: Timestamp;
}
export type LiveStreamId = bigint;
export interface UpdateProfileRequest {
    username?: string;
    email?: string;
}
export interface Page {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<VideoPublic>;
}
export interface VideoUploadRequest {
    title: string;
    thumbnailUrl: string;
    tags: Array<string>;
    description: string;
    category: string;
    videoUrl: string;
}
export interface VideoPublic {
    id: VideoId;
    status: VideoStatus;
    title: string;
    thumbnailUrl: string;
    createdAt: Timestamp;
    tags: Array<string>;
    creatorId: UserId;
    description: string;
    viewCount: bigint;
    totalWatchSeconds: bigint;
    category: string;
    videoUrl: string;
}
export type VideoId = bigint;
export interface RegisterRequest {
    username: string;
    role: UserRole;
    email: string;
}
export interface PlatformStats {
    totalAdRevenue: bigint;
    totalRewardsPaid: bigint;
    totalViewers: bigint;
    totalCreators: bigint;
    totalAdmins: bigint;
    platformBalance: bigint;
    totalCreatorPayouts: bigint;
    totalAdvertisers: bigint;
    totalVideos: bigint;
}
export type AdId = bigint;
export interface CreatorEarningsPublic {
    videoEarnings: Array<[VideoId, bigint]>;
    creatorId: UserId;
    totalEarnings: bigint;
}
export type CommentId = bigint;
export interface CreatorPayout {
    creatorId: UserId;
    timestamp: Timestamp;
    amount: bigint;
    videoId?: VideoId;
}
export interface CommentPublic {
    id: CommentId;
    isDeleted: boolean;
    authorId: UserId;
    createdAt: Timestamp;
    text: string;
    authorName: string;
    videoId: VideoId;
}
export interface LiveStreamPublic {
    id: LiveStreamId;
    status: LiveStreamStatus;
    title: string;
    startedAt?: Timestamp;
    endedAt?: Timestamp;
    creatorId: UserId;
    description: string;
    creatorName: string;
    archivedVideoId?: VideoId;
    viewerCount: bigint;
    scheduledAt: Timestamp;
}
export type UserId = Principal;
export interface RewardSummary {
    pendingReward: bigint;
    dailyWatchSeconds: bigint;
    balance: bigint;
    totalEarned: bigint;
}
export interface StartLiveStreamRequest {
    title: string;
    description: string;
    scheduledAt: Timestamp;
}
export enum AdSlotType {
    homepage_banner = "homepage_banner",
    sidebar = "sidebar",
    pre_roll = "pre_roll"
}
export enum LiveStreamStatus {
    scheduled = "scheduled",
    active = "active",
    ended = "ended",
    archived = "archived"
}
export enum UserRole {
    creator = "creator",
    admin = "admin",
    advertiser = "advertiser",
    viewer = "viewer"
}
export enum UserStatus {
    active = "active",
    suspended = "suspended",
    flagged = "flagged"
}
export enum VideoStatus {
    published = "published",
    unpublished = "unpublished",
    flagged = "flagged",
    draft = "draft"
}
export interface backendInterface {
    approveUser(userId: UserId): Promise<void>;
    archiveLiveStream(streamId: LiveStreamId, videoUrl: string): Promise<{
        __kind__: "ok";
        ok: LiveStreamPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    claimDailyReward(): Promise<bigint>;
    deleteComment(commentId: CommentId, videoId: VideoId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    endLiveStream(streamId: LiveStreamId): Promise<{
        __kind__: "ok";
        ok: LiveStreamPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    flagUser(userId: UserId): Promise<void>;
    flagVideo(videoId: VideoId): Promise<void>;
    getActiveAds(slotType: AdSlotType): Promise<Array<AdPublic>>;
    getAdSlotPricing(): Promise<Array<[AdSlotType, bigint]>>;
    getCreatorEarnings(creatorId: UserId): Promise<CreatorEarningsPublic | null>;
    getLikeCount(videoId: VideoId): Promise<bigint>;
    getLiveStream(id: LiveStreamId): Promise<LiveStreamPublic | null>;
    getMyAdCampaigns(): Promise<Array<AdPublic>>;
    getMyCreatorEarnings(): Promise<CreatorEarningsPublic | null>;
    getMyProfile(): Promise<UserPublic | null>;
    getMyRewardSummary(): Promise<RewardSummary>;
    getPlatformStats(): Promise<PlatformStats>;
    getRecommendedVideos(limit: bigint): Promise<Array<VideoPublic>>;
    getRelatedVideos(videoId: VideoId, limit: bigint): Promise<Array<VideoPublic>>;
    getTrendingVideos(limit: bigint): Promise<Array<VideoPublic>>;
    getUserProfile(userId: UserId): Promise<UserPublic | null>;
    getVideo(videoId: VideoId): Promise<VideoPublic | null>;
    goLive(streamId: LiveStreamId): Promise<{
        __kind__: "ok";
        ok: LiveStreamPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    hasLiked(videoId: VideoId): Promise<boolean>;
    joinLiveStream(id: LiveStreamId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    leaveLiveStream(id: LiveStreamId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    listActiveLiveStreams(): Promise<Array<LiveStreamPublic>>;
    listAllCreatorPayouts(): Promise<Array<CreatorPayout>>;
    listAllViewerRewardPayouts(): Promise<Array<ViewerRewardPayout>>;
    listComments(videoId: VideoId): Promise<Array<CommentPublic>>;
    listPublishedVideos(offset: bigint, limit: bigint): Promise<Page>;
    listVideosByCreator(creatorId: UserId): Promise<Array<VideoPublic>>;
    postComment(req: PostCommentRequest): Promise<{
        __kind__: "ok";
        ok: CommentPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    publishVideo(videoId: VideoId): Promise<VideoPublic>;
    purchaseAdSlot(req: AdPurchaseRequest): Promise<AdPublic>;
    recordWatchTime(event: WatchEvent): Promise<void>;
    register(req: RegisterRequest): Promise<UserPublic>;
    searchVideos(term: string): Promise<Array<VideoPublic>>;
    setAdSlotPricing(slotType: AdSlotType, dailyPrice: bigint): Promise<void>;
    setCreatorRevenueSharePercent(percent: bigint): Promise<void>;
    setViewerRewardPercent(percent: bigint): Promise<void>;
    startLiveStream(req: StartLiveStreamRequest): Promise<{
        __kind__: "ok";
        ok: LiveStreamPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    toggleLike(videoId: VideoId): Promise<boolean>;
    unpublishVideo(videoId: VideoId): Promise<VideoPublic>;
    updateProfile(req: UpdateProfileRequest): Promise<UserPublic>;
    uploadVideo(req: VideoUploadRequest): Promise<VideoPublic>;
}
