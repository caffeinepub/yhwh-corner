import EngagementTypes "../types/engagement";
import VideoTypes "../types/videos";
import UserTypes "../types/users";
import Common "../types/common";
import EngagementLib "../lib/engagement";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  comments : Map.Map<EngagementTypes.CommentId, EngagementTypes.Comment>,
  commentCounter : { var count : Nat },
  likes : Map.Map<Text, EngagementTypes.Like>,
  liveStreams : Map.Map<EngagementTypes.LiveStreamId, EngagementTypes.LiveStream>,
  streamCounter : { var count : Nat },
  watchHistory : List.List<EngagementTypes.WatchHistoryEntry>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  videoCounter : { var next : Nat },
) {

  // ── Comments ──────────────────────────────────────────────────────────────

  public shared ({ caller }) func postComment(req : EngagementTypes.PostCommentRequest) : async { #ok : EngagementTypes.CommentPublic; #err : Text } {
    EngagementLib.postComment(comments, commentCounter, users, caller, req);
  };

  public query func listComments(videoId : Common.VideoId) : async [EngagementTypes.CommentPublic] {
    EngagementLib.listComments(comments, users, videoId, videos);
  };

  public shared ({ caller }) func deleteComment(commentId : EngagementTypes.CommentId, videoId : Common.VideoId) : async { #ok : (); #err : Text } {
    EngagementLib.deleteComment(comments, videos, caller, commentId, videoId);
  };

  // ── Likes ─────────────────────────────────────────────────────────────────

  public shared ({ caller }) func toggleLike(videoId : Common.VideoId) : async Bool {
    EngagementLib.toggleLike(likes, caller, videoId);
  };

  public query func getLikeCount(videoId : Common.VideoId) : async Nat {
    EngagementLib.getLikeCount(likes, videoId);
  };

  public query ({ caller }) func hasLiked(videoId : Common.VideoId) : async Bool {
    EngagementLib.hasLiked(likes, caller, videoId);
  };

  // ── Live Streams ──────────────────────────────────────────────────────────

  public shared ({ caller }) func startLiveStream(req : EngagementTypes.StartLiveStreamRequest) : async { #ok : EngagementTypes.LiveStreamPublic; #err : Text } {
    EngagementLib.startLiveStream(liveStreams, streamCounter, users, caller, req);
  };

  public shared ({ caller }) func goLive(streamId : EngagementTypes.LiveStreamId) : async { #ok : EngagementTypes.LiveStreamPublic; #err : Text } {
    EngagementLib.goLive(liveStreams, users, streamId, caller);
  };

  public shared ({ caller }) func endLiveStream(streamId : EngagementTypes.LiveStreamId) : async { #ok : EngagementTypes.LiveStreamPublic; #err : Text } {
    EngagementLib.endLiveStream(liveStreams, users, streamId, caller);
  };

  public shared ({ caller }) func archiveLiveStream(streamId : EngagementTypes.LiveStreamId, videoUrl : Text) : async { #ok : EngagementTypes.LiveStreamPublic; #err : Text } {
    EngagementLib.archiveLiveStream(liveStreams, videos, videoCounter, users, streamId, caller, videoUrl);
  };

  public query func listActiveLiveStreams() : async [EngagementTypes.LiveStreamPublic] {
    EngagementLib.listActiveLiveStreams(liveStreams, users);
  };

  public query func getLiveStream(id : EngagementTypes.LiveStreamId) : async ?EngagementTypes.LiveStreamPublic {
    EngagementLib.getLiveStream(liveStreams, users, id);
  };

  public shared func joinLiveStream(id : EngagementTypes.LiveStreamId) : async { #ok : (); #err : Text } {
    EngagementLib.joinLiveStream(liveStreams, id);
  };

  public shared func leaveLiveStream(id : EngagementTypes.LiveStreamId) : async { #ok : (); #err : Text } {
    EngagementLib.leaveLiveStream(liveStreams, id);
  };

  // ── Recommendations ───────────────────────────────────────────────────────

  public query ({ caller }) func getRecommendedVideos(limit : Nat) : async [VideoTypes.VideoPublic] {
    EngagementLib.getRecommendedVideos(watchHistory, videos, caller, limit);
  };

  public query func getTrendingVideos(limit : Nat) : async [VideoTypes.VideoPublic] {
    EngagementLib.getTrendingVideos(videos, limit);
  };

  public query func getRelatedVideos(videoId : Common.VideoId, limit : Nat) : async [VideoTypes.VideoPublic] {
    EngagementLib.getRelatedVideos(videos, videoId, limit);
  };
};
