import Common "common";

module {
  public type UserId = Common.UserId;
  public type VideoId = Common.VideoId;
  public type Timestamp = Common.Timestamp;

  public type PlatformStats = {
    totalCreators : Nat;
    totalViewers : Nat;
    totalAdvertisers : Nat;
    totalAdmins : Nat;
    totalVideos : Nat;
    totalAdRevenue : Nat;
    totalRewardsPaid : Nat;
    totalCreatorPayouts : Nat;
    platformBalance : Nat;
  };

  public type CreatorPayout = {
    creatorId : UserId;
    amount : Nat;
    timestamp : Timestamp;
    videoId : ?VideoId;
  };

  public type ViewerRewardPayout = {
    viewerId : UserId;
    amount : Nat;
    timestamp : Timestamp;
  };

  public type PlatformConfig = {
    var viewerRewardPercent : Nat;
    var creatorRevenueSharePercent : Nat;
  };
};
