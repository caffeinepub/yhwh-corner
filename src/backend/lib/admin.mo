import UserTypes "../types/users";
import VideoTypes "../types/videos";
import AdminTypes "../types/admin";
import UserLib "users";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public func getPlatformStats(
    users : Map.Map<Common.UserId, UserTypes.User>,
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    creatorPayouts : List.List<AdminTypes.CreatorPayout>,
    viewerPayouts : List.List<AdminTypes.ViewerRewardPayout>,
    platformRevenue : Nat,
    platformBalance : Nat,
  ) : AdminTypes.PlatformStats {
    let totalCreators = UserLib.countByRole(users, #creator);
    let totalViewers = UserLib.countByRole(users, #viewer);
    let totalAdvertisers = UserLib.countByRole(users, #advertiser);
    let totalAdmins = UserLib.countByRole(users, #admin);

    let totalRewardsPaid = viewerPayouts.foldLeft((0 : Nat), func(acc, p) { acc + p.amount });
    let totalCreatorPayoutsAmt = creatorPayouts.foldLeft((0 : Nat), func(acc, p) { acc + p.amount });

    {
      totalCreators;
      totalViewers;
      totalAdvertisers;
      totalAdmins;
      totalVideos = videos.size();
      totalAdRevenue = platformRevenue;
      totalRewardsPaid;
      totalCreatorPayouts = totalCreatorPayoutsAmt;
      platformBalance;
    };
  };

  public func listCreatorPayouts(
    creatorPayouts : List.List<AdminTypes.CreatorPayout>,
  ) : [AdminTypes.CreatorPayout] {
    creatorPayouts.toArray();
  };

  public func listViewerRewardPayouts(
    viewerPayouts : List.List<AdminTypes.ViewerRewardPayout>,
  ) : [AdminTypes.ViewerRewardPayout] {
    viewerPayouts.toArray();
  };

  public func approveUser(
    users : Map.Map<Common.UserId, UserTypes.User>,
    userId : Common.UserId,
  ) : () {
    UserLib.setStatus(users, userId, #active);
  };

  public func flagUser(
    users : Map.Map<Common.UserId, UserTypes.User>,
    userId : Common.UserId,
  ) : () {
    UserLib.setStatus(users, userId, #flagged);
  };
};
