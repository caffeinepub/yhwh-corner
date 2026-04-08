import RewardTypes "../types/rewards";
import AdminTypes "../types/admin";
import Common "../types/common";
import RewardLib "../lib/rewards";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  watchRecords : Map.Map<Common.UserId, RewardTypes.ViewerWatchRecord>,
  creatorEarnings : Map.Map<Common.UserId, RewardTypes.CreatorEarnings>,
  platformLedger : List.List<RewardTypes.PlatformLedgerEntry>,
  viewerPayouts : List.List<AdminTypes.ViewerRewardPayout>,
  ledgerCounter : { var next : Nat },
  platformConfig : AdminTypes.PlatformConfig,
) {
  public shared query ({ caller }) func getMyRewardSummary() : async RewardTypes.RewardSummary {
    RewardLib.getRewardSummary(watchRecords, caller);
  };

  public shared ({ caller }) func claimDailyReward() : async Nat {
    let reward = RewardLib.claimDailyReward(
      watchRecords,
      viewerPayouts,
      platformLedger,
      ledgerCounter.next,
      caller,
    );
    ledgerCounter.next += 1;
    reward;
  };

  public shared query ({ caller }) func getMyCreatorEarnings() : async ?RewardTypes.CreatorEarningsPublic {
    RewardLib.getCreatorEarnings(creatorEarnings, caller);
  };

  public query func getCreatorEarnings(creatorId : Common.UserId) : async ?RewardTypes.CreatorEarningsPublic {
    RewardLib.getCreatorEarnings(creatorEarnings, creatorId);
  };
};
