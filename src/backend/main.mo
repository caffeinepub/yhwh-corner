import UserTypes "types/users";
import VideoTypes "types/videos";
import RewardTypes "types/rewards";
import AdTypes "types/ads";
import AdminTypes "types/admin";
import EngagementTypes "types/engagement";
import Common "types/common";
import Map "mo:core/Map";
import List "mo:core/List";

import UsersApi "mixins/users-api";
import VideosApi "mixins/videos-api";
import RewardsApi "mixins/rewards-api";
import AdsApi "mixins/ads-api";
import AdminApi "mixins/admin-api";
import EngagementApi "mixins/engagement-api";

actor {
  // Users state
  let users = Map.empty<Common.UserId, UserTypes.User>();

  // Videos state
  let videos = Map.empty<Common.VideoId, VideoTypes.Video>();
  // Counter wrapped in a record so mixin can mutate it via var field
  let videoCounter = { var next : Nat = 1 };

  // Ads state
  let ads = Map.empty<Common.AdId, AdTypes.Ad>();
  let slotPricing = Map.empty<Text, AdTypes.SlotPricing>();
  let adCounter = { var next : Nat = 1 };

  // Rewards state
  let watchRecords = Map.empty<Common.UserId, RewardTypes.ViewerWatchRecord>();
  let creatorEarnings = Map.empty<Common.UserId, RewardTypes.CreatorEarnings>();
  let platformLedger = List.empty<RewardTypes.PlatformLedgerEntry>();
  let ledgerCounter = { var next : Nat = 1 };

  // Engagement state
  let comments = Map.empty<EngagementTypes.CommentId, EngagementTypes.Comment>();
  let commentCounter = { var count : Nat = 0 };
  let likes = Map.empty<Text, EngagementTypes.Like>();
  let liveStreams = Map.empty<EngagementTypes.LiveStreamId, EngagementTypes.LiveStream>();
  let streamCounter = { var count : Nat = 0 };
  let watchHistory = List.empty<EngagementTypes.WatchHistoryEntry>();

  // Admin/creator payouts state
  let creatorPayouts = List.empty<AdminTypes.CreatorPayout>();
  let viewerPayouts = List.empty<AdminTypes.ViewerRewardPayout>();
  let platformConfig : AdminTypes.PlatformConfig = {
    var viewerRewardPercent = 1;
    var creatorRevenueSharePercent = 25;
  };
  // Platform financials wrapped in a record so mixin can mutate via var fields
  let platformFinancials = { var revenue : Nat = 0; var balance : Nat = 0 };

  // Compose mixins
  include UsersApi(users);
  include VideosApi(
    videos,
    videoCounter,
    watchRecords,
    platformFinancials,
    platformConfig,
  );
  include RewardsApi(
    watchRecords,
    creatorEarnings,
    platformLedger,
    viewerPayouts,
    ledgerCounter,
    platformConfig,
  );
  include AdsApi(
    ads,
    slotPricing,
    adCounter,
    platformLedger,
    creatorEarnings,
    creatorPayouts,
    ledgerCounter,
    platformFinancials,
    platformConfig,
  );
  include AdminApi(
    users,
    videos,
    slotPricing,
    creatorPayouts,
    viewerPayouts,
    platformConfig,
    platformFinancials,
  );
  include EngagementApi(
    comments,
    commentCounter,
    likes,
    liveStreams,
    streamCounter,
    watchHistory,
    users,
    videos,
    videoCounter,
  );
};
