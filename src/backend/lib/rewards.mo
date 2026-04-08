import Types "../types/rewards";
import AdminTypes "../types/admin";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

module {
  // Convert nanosecond timestamp to a day number for daily reset tracking
  func dayFromNano(ts : Int) : Text {
    let secs = Int.abs(ts) / 1_000_000_000;
    let days = secs / 86400;
    days.toText();
  };

  public func trackWatchTime(
    watchRecords : Map.Map<Common.UserId, Types.ViewerWatchRecord>,
    userId : Common.UserId,
    watchSeconds : Nat,
    platformRevenue : Nat,
    viewerRewardPercent : Nat,
  ) : () {
    let today = dayFromNano(Time.now());
    switch (watchRecords.get(userId)) {
      case (?record) {
        if (record.lastResetDate != today) {
          record.lastResetDate := today;
          record.dailyWatchSeconds := 0;
        };
        record.dailyWatchSeconds += watchSeconds;
        let hoursWatched = record.dailyWatchSeconds / 3600;
        record.pendingReward := calculateDailyReward(hoursWatched * 3600, platformRevenue, viewerRewardPercent);
      };
      case null {
        let record : Types.ViewerWatchRecord = {
          userId;
          var dailyWatchSeconds = watchSeconds;
          var lastResetDate = today;
          var pendingReward = calculateDailyReward(watchSeconds, platformRevenue, viewerRewardPercent);
          var totalEarned = 0;
          var balance = 0;
        };
        watchRecords.add(userId, record);
      };
    };
  };

  public func getRewardSummary(
    watchRecords : Map.Map<Common.UserId, Types.ViewerWatchRecord>,
    userId : Common.UserId,
  ) : Types.RewardSummary {
    switch (watchRecords.get(userId)) {
      case (?record) {
        {
          balance = record.balance;
          pendingReward = record.pendingReward;
          totalEarned = record.totalEarned;
          dailyWatchSeconds = record.dailyWatchSeconds;
        };
      };
      case null {
        { balance = 0; pendingReward = 0; totalEarned = 0; dailyWatchSeconds = 0 };
      };
    };
  };

  public func claimDailyReward(
    watchRecords : Map.Map<Common.UserId, Types.ViewerWatchRecord>,
    viewerPayouts : List.List<AdminTypes.ViewerRewardPayout>,
    ledger : List.List<Types.PlatformLedgerEntry>,
    nextLedgerId : Nat,
    userId : Common.UserId,
  ) : Nat {
    let record = switch (watchRecords.get(userId)) {
      case (?r) r;
      case null Runtime.trap("No watch record found");
    };
    if (record.pendingReward == 0) Runtime.trap("No pending reward to claim");
    let reward = record.pendingReward;
    record.balance += reward;
    record.totalEarned += reward;
    record.pendingReward := 0;

    viewerPayouts.add({
      viewerId = userId;
      amount = reward;
      timestamp = Time.now();
    });

    ignore addLedgerEntry(ledger, nextLedgerId, #viewerRewardOut, reward, "Viewer reward claimed");
    reward;
  };

  public func calculateDailyReward(
    watchSeconds : Nat,
    platformRevenue : Nat,
    viewerRewardPercent : Nat,
  ) : Nat {
    let hoursWatched = watchSeconds / 3600;
    if (hoursWatched == 0) {
      0
    } else {
      (platformRevenue * viewerRewardPercent * hoursWatched) / 100
    };
  };

  public func updateCreatorEarnings(
    creatorEarnings : Map.Map<Common.UserId, Types.CreatorEarnings>,
    creatorId : Common.UserId,
    videoId : Common.VideoId,
    amount : Nat,
  ) : () {
    switch (creatorEarnings.get(creatorId)) {
      case (?earnings) {
        let newTotal = earnings.totalEarnings + amount;
        var found = false;
        let updated = earnings.videoEarnings.map(
          func(entry) {
            let vid = entry.0;
            let amt = entry.1;
            if (vid == videoId) { found := true; (vid, amt + amount) }
            else (vid, amt)
          }
        );
        let newVideoEarnings : [(Common.VideoId, Nat)] = if (found) updated
          else updated.concat([(videoId, amount)]);
        creatorEarnings.add(creatorId, {
          creatorId;
          var totalEarnings = newTotal;
          videoEarnings = newVideoEarnings;
        });
      };
      case null {
        creatorEarnings.add(creatorId, {
          creatorId;
          var totalEarnings = amount;
          videoEarnings = [(videoId, amount)];
        });
      };
    };
  };

  public func getCreatorEarnings(
    creatorEarnings : Map.Map<Common.UserId, Types.CreatorEarnings>,
    creatorId : Common.UserId,
  ) : ?Types.CreatorEarningsPublic {
    switch (creatorEarnings.get(creatorId)) {
      case (?e) ?{
        creatorId = e.creatorId;
        totalEarnings = e.totalEarnings;
        videoEarnings = e.videoEarnings;
      };
      case null null;
    };
  };

  public func addLedgerEntry(
    ledger : List.List<Types.PlatformLedgerEntry>,
    nextId : Nat,
    entryType : Types.LedgerEntryType,
    amount : Nat,
    description : Text,
  ) : Nat {
    ledger.add({
      id = nextId;
      entryType;
      amount;
      description;
      timestamp = Time.now();
    });
    nextId + 1;
  };
};
