import UserTypes "../types/users";
import VideoTypes "../types/videos";
import AdTypes "../types/ads";
import AdminTypes "../types/admin";
import Common "../types/common";
import AdminLib "../lib/admin";
import AdLib "../lib/ads";
import VideoLib "../lib/videos";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  users : Map.Map<Common.UserId, UserTypes.User>,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  slotPricing : Map.Map<Text, AdTypes.SlotPricing>,
  creatorPayouts : List.List<AdminTypes.CreatorPayout>,
  viewerPayouts : List.List<AdminTypes.ViewerRewardPayout>,
  platformConfig : AdminTypes.PlatformConfig,
  platformFinancials : { var revenue : Nat; var balance : Nat },
) {
  func requireAdmin(caller : Common.UserId) {
    let user = switch (users.get(caller)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    if (user.role != #admin) Runtime.trap("Admin only");
  };

  public shared ({ caller }) func getPlatformStats() : async AdminTypes.PlatformStats {
    requireAdmin(caller);
    AdminLib.getPlatformStats(
      users,
      videos,
      creatorPayouts,
      viewerPayouts,
      platformFinancials.revenue,
      platformFinancials.balance,
    );
  };

  public shared ({ caller }) func listAllCreatorPayouts() : async [AdminTypes.CreatorPayout] {
    requireAdmin(caller);
    AdminLib.listCreatorPayouts(creatorPayouts);
  };

  public shared ({ caller }) func listAllViewerRewardPayouts() : async [AdminTypes.ViewerRewardPayout] {
    requireAdmin(caller);
    AdminLib.listViewerRewardPayouts(viewerPayouts);
  };

  public shared ({ caller }) func setAdSlotPricing(slotType : Common.AdSlotType, dailyPrice : Nat) : async () {
    requireAdmin(caller);
    AdLib.setSlotPricing(slotPricing, slotType, dailyPrice);
  };

  public shared ({ caller }) func setViewerRewardPercent(percent : Nat) : async () {
    requireAdmin(caller);
    if (percent > 100) Runtime.trap("Percent must be <= 100");
    platformConfig.viewerRewardPercent := percent;
  };

  public shared ({ caller }) func setCreatorRevenueSharePercent(percent : Nat) : async () {
    requireAdmin(caller);
    if (percent < 25) Runtime.trap("Creator share must be at least 25%");
    if (percent > 100) Runtime.trap("Percent must be <= 100");
    platformConfig.creatorRevenueSharePercent := percent;
  };

  public shared ({ caller }) func approveUser(userId : Common.UserId) : async () {
    requireAdmin(caller);
    AdminLib.approveUser(users, userId);
  };

  public shared ({ caller }) func flagUser(userId : Common.UserId) : async () {
    requireAdmin(caller);
    AdminLib.flagUser(users, userId);
  };

  public shared ({ caller }) func flagVideo(videoId : Common.VideoId) : async () {
    requireAdmin(caller);
    VideoLib.flagVideo(videos, videoId);
  };
};
