import Common "common";

module {
  public type UserId = Common.UserId;
  public type VideoId = Common.VideoId;
  public type Timestamp = Common.Timestamp;

  public type ViewerWatchRecord = {
    userId : UserId;
    var dailyWatchSeconds : Nat;
    var lastResetDate : Text;
    var pendingReward : Nat;
    var totalEarned : Nat;
    var balance : Nat;
  };

  public type CreatorEarnings = {
    creatorId : UserId;
    var totalEarnings : Nat;
    videoEarnings : [(VideoId, Nat)];
  };

  public type CreatorEarningsPublic = {
    creatorId : UserId;
    totalEarnings : Nat;
    videoEarnings : [(VideoId, Nat)];
  };

  public type RewardSummary = {
    balance : Nat;
    pendingReward : Nat;
    totalEarned : Nat;
    dailyWatchSeconds : Nat;
  };

  public type PlatformLedgerEntry = {
    id : Nat;
    entryType : LedgerEntryType;
    amount : Nat;
    description : Text;
    timestamp : Timestamp;
  };

  public type LedgerEntryType = {
    #adRevenueIn;
    #creatorPayout;
    #viewerRewardOut;
  };
};
