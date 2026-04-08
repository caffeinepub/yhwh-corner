// Re-export canonical types from backend bindings
export type {
  AdPublic,
  CommentPublic,
  CreatorEarningsPublic,
  CreatorPayout,
  LiveStreamPublic,
  PlatformStats,
  PostCommentRequest,
  RewardSummary,
  StartLiveStreamRequest,
  UserPublic,
  VideoPublic,
  ViewerRewardPayout,
} from "./backend.d";

export {
  AdSlotType,
  LiveStreamStatus,
  UserRole,
  UserStatus,
  VideoStatus,
} from "./backend";

// Convenience alias for ad pricing (derived from [AdSlotType, bigint][] backend format)
export interface AdSlotPricingMap {
  homepage_banner: bigint;
  pre_roll: bigint;
  sidebar: bigint;
}

// Legacy alias
export type AdSlotPricing = AdSlotPricingMap;

// Legacy CreatorEarnings shape used in older components
export interface CreatorEarnings {
  totalEarned: bigint;
  pendingPayout: bigint;
  lastPayout: bigint;
}
