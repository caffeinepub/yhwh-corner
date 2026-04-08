import VideoTypes "../types/videos";
import RewardTypes "../types/rewards";
import AdminTypes "../types/admin";
import Common "../types/common";
import VideoLib "../lib/videos";
import RewardLib "../lib/rewards";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  videoCounter : { var next : Nat },
  watchRecords : Map.Map<Common.UserId, RewardTypes.ViewerWatchRecord>,
  platformFinancials : { var revenue : Nat; var balance : Nat },
  platformConfig : AdminTypes.PlatformConfig,
) {
  public shared ({ caller }) func uploadVideo(req : VideoTypes.VideoUploadRequest) : async VideoTypes.VideoPublic {
    let result = VideoLib.upload(videos, videoCounter.next, caller, req);
    videoCounter.next += 1;
    result;
  };

  public shared ({ caller }) func publishVideo(videoId : Common.VideoId) : async VideoTypes.VideoPublic {
    VideoLib.publish(videos, caller, videoId);
  };

  public shared ({ caller }) func unpublishVideo(videoId : Common.VideoId) : async VideoTypes.VideoPublic {
    VideoLib.unpublish(videos, caller, videoId);
  };

  public query func getVideo(videoId : Common.VideoId) : async ?VideoTypes.VideoPublic {
    VideoLib.getById(videos, videoId);
  };

  public query func listPublishedVideos(offset : Nat, limit : Nat) : async Common.Page<VideoTypes.VideoPublic> {
    VideoLib.listPublished(videos, offset, limit);
  };

  public query func listVideosByCreator(creatorId : Common.UserId) : async [VideoTypes.VideoPublic] {
    VideoLib.listByCreator(videos, creatorId);
  };

  public shared ({ caller }) func recordWatchTime(event : VideoTypes.WatchEvent) : async () {
    VideoLib.recordWatch(videos, event.videoId, event.watchSeconds);
    RewardLib.trackWatchTime(
      watchRecords,
      caller,
      event.watchSeconds,
      platformFinancials.revenue,
      platformConfig.viewerRewardPercent,
    );
  };

  public query func searchVideos(term : Text) : async [VideoTypes.VideoPublic] {
    VideoLib.search(videos, term);
  };
};
