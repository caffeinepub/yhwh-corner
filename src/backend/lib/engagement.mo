import Types "../types/engagement";
import VideoTypes "../types/videos";
import UserTypes "../types/users";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

module {

  // ── Helpers ────────────────────────────────────────────────────────────────

  func likeKey(userId : Common.UserId, videoId : Common.VideoId) : Text {
    userId.toText() # ":" # videoId.toText()
  };

  func commentToPublic(
    comment : Types.Comment,
    authorName : Text,
  ) : Types.CommentPublic {
    {
      id = comment.id;
      videoId = comment.videoId;
      authorId = comment.authorId;
      authorName;
      text = comment.text;
      createdAt = comment.createdAt;
      isDeleted = comment.isDeleted;
    };
  };

  func streamToPublic(
    stream : Types.LiveStream,
    creatorName : Text,
  ) : Types.LiveStreamPublic {
    {
      id = stream.id;
      creatorId = stream.creatorId;
      creatorName;
      title = stream.title;
      description = stream.description;
      status = stream.status;
      scheduledAt = stream.scheduledAt;
      startedAt = stream.startedAt;
      endedAt = stream.endedAt;
      viewerCount = stream.viewerCount;
      archivedVideoId = stream.archivedVideoId;
    };
  };

  func creatorName(
    users : Map.Map<Common.UserId, UserTypes.User>,
    userId : Common.UserId,
  ) : Text {
    switch (users.get(userId)) {
      case (?u) u.username;
      case null "Unknown";
    };
  };

  // ── Comments ───────────────────────────────────────────────────────────────

  public func postComment(
    comments : Map.Map<Types.CommentId, Types.Comment>,
    commentCounter : { var count : Nat },
    users : Map.Map<Common.UserId, UserTypes.User>,
    authorId : Common.UserId,
    req : Types.PostCommentRequest,
  ) : { #ok : Types.CommentPublic; #err : Text } {
    if (req.text.size() == 0) return #err("Comment text cannot be empty");
    let id = commentCounter.count;
    commentCounter.count += 1;
    let comment : Types.Comment = {
      id;
      videoId = req.videoId;
      authorId;
      text = req.text;
      createdAt = Time.now();
      var isDeleted = false;
    };
    comments.add(id, comment);
    let name = creatorName(users, authorId);
    #ok(commentToPublic(comment, name));
  };

  public func listComments(
    comments : Map.Map<Types.CommentId, Types.Comment>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    videoId : Common.VideoId,
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  ) : [Types.CommentPublic] {
    let filtered = comments.entries()
      .filter(func((_, c) : (Types.CommentId, Types.Comment)) : Bool {
        c.videoId == videoId and not c.isDeleted
      })
      .map(func((_, c) : (Types.CommentId, Types.Comment)) : Types.CommentPublic {
        commentToPublic(c, creatorName(users, c.authorId))
      })
      .toArray();
    filtered.sort<Types.CommentPublic>(func(a, b) {
      Int.compare(a.createdAt, b.createdAt)
    });
  };

  public func deleteComment(
    comments : Map.Map<Types.CommentId, Types.Comment>,
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    callerId : Common.UserId,
    commentId : Types.CommentId,
    videoId : Common.VideoId,
  ) : { #ok : (); #err : Text } {
    let comment = switch (comments.get(commentId)) {
      case (?c) c;
      case null return #err("Comment not found");
    };
    if (comment.videoId != videoId) return #err("Comment does not belong to video");
    let isAuthor = Principal.equal(comment.authorId, callerId);
    let isVideoCreator = switch (videos.get(videoId)) {
      case (?v) Principal.equal(v.creatorId, callerId);
      case null false;
    };
    if (not isAuthor and not isVideoCreator) return #err("Not authorized to delete this comment");
    comment.isDeleted := true;
    #ok(());
  };

  // ── Likes ──────────────────────────────────────────────────────────────────

  public func toggleLike(
    likes : Map.Map<Text, Types.Like>,
    userId : Common.UserId,
    videoId : Common.VideoId,
  ) : Bool {
    let key = likeKey(userId, videoId);
    switch (likes.get(key)) {
      case (?_) {
        likes.remove(key);
        false;
      };
      case null {
        let like : Types.Like = {
          userId;
          videoId;
          createdAt = Time.now();
        };
        likes.add(key, like);
        true;
      };
    };
  };

  public func getLikeCount(
    likes : Map.Map<Text, Types.Like>,
    videoId : Common.VideoId,
  ) : Nat {
    likes.foldLeft((0 : Nat), func(acc, _k, v) {
      if (v.videoId == videoId) acc + 1 else acc
    });
  };

  public func hasLiked(
    likes : Map.Map<Text, Types.Like>,
    userId : Common.UserId,
    videoId : Common.VideoId,
  ) : Bool {
    likes.containsKey(likeKey(userId, videoId));
  };

  // ── Live Streams ───────────────────────────────────────────────────────────

  public func startLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    streamCounter : { var count : Nat },
    users : Map.Map<Common.UserId, UserTypes.User>,
    creatorId : Common.UserId,
    req : Types.StartLiveStreamRequest,
  ) : { #ok : Types.LiveStreamPublic; #err : Text } {
    if (req.title.size() == 0) return #err("Title cannot be empty");
    let id = streamCounter.count;
    streamCounter.count += 1;
    let stream : Types.LiveStream = {
      id;
      creatorId;
      title = req.title;
      description = req.description;
      var status = #scheduled;
      scheduledAt = req.scheduledAt;
      var startedAt = null;
      var endedAt = null;
      var viewerCount = 0;
      var archivedVideoId = null;
    };
    streams.add(id, stream);
    let name = creatorName(users, creatorId);
    #ok(streamToPublic(stream, name));
  };

  public func goLive(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    streamId : Types.LiveStreamId,
    callerId : Common.UserId,
  ) : { #ok : Types.LiveStreamPublic; #err : Text } {
    let stream = switch (streams.get(streamId)) {
      case (?s) s;
      case null return #err("Stream not found");
    };
    if (not Principal.equal(stream.creatorId, callerId)) return #err("Not authorized");
    if (stream.status != #scheduled) return #err("Stream must be in scheduled state to go live");
    stream.status := #active;
    stream.startedAt := ?Time.now();
    let name = creatorName(users, stream.creatorId);
    #ok(streamToPublic(stream, name));
  };

  public func endLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    streamId : Types.LiveStreamId,
    callerId : Common.UserId,
  ) : { #ok : Types.LiveStreamPublic; #err : Text } {
    let stream = switch (streams.get(streamId)) {
      case (?s) s;
      case null return #err("Stream not found");
    };
    if (not Principal.equal(stream.creatorId, callerId)) return #err("Not authorized");
    if (stream.status != #active) return #err("Stream must be active to end");
    stream.status := #ended;
    stream.endedAt := ?Time.now();
    let name = creatorName(users, stream.creatorId);
    #ok(streamToPublic(stream, name));
  };

  public func archiveLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    videoCounter : { var next : Nat },
    users : Map.Map<Common.UserId, UserTypes.User>,
    streamId : Types.LiveStreamId,
    callerId : Common.UserId,
    videoUrl : Text,
  ) : { #ok : Types.LiveStreamPublic; #err : Text } {
    let stream = switch (streams.get(streamId)) {
      case (?s) s;
      case null return #err("Stream not found");
    };
    if (not Principal.equal(stream.creatorId, callerId)) return #err("Not authorized");
    if (stream.status != #ended) return #err("Stream must be ended before archiving");
    let videoId = videoCounter.next;
    videoCounter.next += 1;
    let video : VideoTypes.Video = {
      id = videoId;
      var title = stream.title;
      var description = stream.description;
      var thumbnailUrl = "";
      var videoUrl;
      creatorId = stream.creatorId;
      var category = "Live Stream";
      var tags = [];
      var status = #published;
      var viewCount = 0;
      var totalWatchSeconds = 0;
      var totalRevenue = 0;
      createdAt = Time.now();
    };
    videos.add(videoId, video);
    stream.status := #archived;
    stream.archivedVideoId := ?videoId;
    let name = creatorName(users, stream.creatorId);
    #ok(streamToPublic(stream, name));
  };

  public func listActiveLiveStreams(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    users : Map.Map<Common.UserId, UserTypes.User>,
  ) : [Types.LiveStreamPublic] {
    streams.entries()
      .filter(func((_, s) : (Types.LiveStreamId, Types.LiveStream)) : Bool {
        s.status == #scheduled or s.status == #active
      })
      .map(func((_, s) : (Types.LiveStreamId, Types.LiveStream)) : Types.LiveStreamPublic {
        streamToPublic(s, creatorName(users, s.creatorId))
      })
      .toArray();
  };

  public func getLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    id : Types.LiveStreamId,
  ) : ?Types.LiveStreamPublic {
    switch (streams.get(id)) {
      case (?s) ?streamToPublic(s, creatorName(users, s.creatorId));
      case null null;
    };
  };

  public func joinLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    id : Types.LiveStreamId,
  ) : { #ok : (); #err : Text } {
    let stream = switch (streams.get(id)) {
      case (?s) s;
      case null return #err("Stream not found");
    };
    stream.viewerCount += 1;
    #ok(());
  };

  public func leaveLiveStream(
    streams : Map.Map<Types.LiveStreamId, Types.LiveStream>,
    id : Types.LiveStreamId,
  ) : { #ok : (); #err : Text } {
    let stream = switch (streams.get(id)) {
      case (?s) s;
      case null return #err("Stream not found");
    };
    if (stream.viewerCount > 0) {
      stream.viewerCount -= 1;
    };
    #ok(());
  };

  // ── Watch History & Recommendations ───────────────────────────────────────

  public func recordWatchHistory(
    watchHistory : List.List<Types.WatchHistoryEntry>,
    userId : Common.UserId,
    videoId : Common.VideoId,
    watchSeconds : Nat,
    ts : Common.Timestamp,
  ) : () {
    watchHistory.add({
      userId;
      videoId;
      watchedAt = ts;
      watchSeconds;
    });
  };

  public func getRecommendedVideos(
    watchHistory : List.List<Types.WatchHistoryEntry>,
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    userId : Common.UserId,
    limit : Nat,
  ) : [VideoTypes.VideoPublic] {
    // Collect watched video IDs for this user
    let watchedIds = watchHistory.filter(func(e : Types.WatchHistoryEntry) : Bool {
      Principal.equal(e.userId, userId)
    });

    // Build a set of watched video IDs and collect tags from watched videos
    let watchedIdSet = Map.empty<Common.VideoId, Bool>();
    let tagScores = Map.empty<Text, Nat>();

    watchedIds.forEach(func(e : Types.WatchHistoryEntry) {
      watchedIdSet.add(e.videoId, true);
      switch (videos.get(e.videoId)) {
        case (?v) {
          for (tag in v.tags.values()) {
            let cur = switch (tagScores.get(tag)) {
              case (?n) n;
              case null 0;
            };
            tagScores.add(tag, cur + 1);
          };
        };
        case null {};
      };
    });

    let now = Time.now();

    // If no history, fall back to most-viewed
    if (watchedIdSet.isEmpty()) {
      return getTrendingVideos(videos, limit);
    };

    // Score all published unwatched videos by tag overlap + recency
    let scored : [(Nat, VideoTypes.VideoPublic)] = videos.entries()
      .filter(func((_, v) : (Common.VideoId, VideoTypes.Video)) : Bool {
        v.status == #published and not watchedIdSet.containsKey(v.id)
      })
      .map<(Common.VideoId, VideoTypes.Video), (Nat, VideoTypes.VideoPublic)>(func((_, v)) {
        var tagScore : Nat = 0;
        for (tag in v.tags.values()) {
          tagScore += switch (tagScores.get(tag)) {
            case (?n) n;
            case null 0;
          };
        };
        // Recency bonus: videos created in last 7 days (604800000000000 ns) get +5
        let ageNs = Int.abs(now - v.createdAt);
        let recencyBonus : Nat = if (ageNs < 604800000000000) 5 else 0;
        (tagScore + recencyBonus, toVideoPublic(v))
      })
      .toArray();

    let sorted = scored.sort(func(a, b) {
      // Sort descending by score
      Nat.compare(b.0, a.0)
    });

    let n = Nat.min(limit, sorted.size());
    Array.tabulate<VideoTypes.VideoPublic>(n, func(i) { sorted[i].1 });
  };

  public func getTrendingVideos(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    limit : Nat,
  ) : [VideoTypes.VideoPublic] {
    let published = videos.entries()
      .filter(func((_, v) : (Common.VideoId, VideoTypes.Video)) : Bool {
        v.status == #published
      })
      .map(func((_, v) : (Common.VideoId, VideoTypes.Video)) : VideoTypes.VideoPublic {
        toVideoPublic(v)
      })
      .toArray();

    let sorted = published.sort(func(a, b) {
      Nat.compare(b.viewCount, a.viewCount)
    });

    let n = Nat.min(limit, sorted.size());
    Array.tabulate<VideoTypes.VideoPublic>(n, func(i) { sorted[i] });
  };

  public func getRelatedVideos(
    videos : Map.Map<Common.VideoId, VideoTypes.Video>,
    videoId : Common.VideoId,
    limit : Nat,
  ) : [VideoTypes.VideoPublic] {
    let source = switch (videos.get(videoId)) {
      case (?v) v;
      case null return [];
    };

    // Score by tag overlap with source video
    let related : [(Nat, VideoTypes.VideoPublic)] = videos.entries()
      .filter(func((_, v) : (Common.VideoId, VideoTypes.Video)) : Bool {
        v.status == #published and v.id != videoId
      })
      .map<(Common.VideoId, VideoTypes.Video), (Nat, VideoTypes.VideoPublic)>(func((_, v)) {
        var overlap : Nat = 0;
        for (tag in v.tags.values()) {
          if (source.tags.find(func(t : Text) : Bool { t == tag }) != null) {
            overlap += 1;
          };
        };
        // Category match adds bonus
        let categoryBonus : Nat = if (v.category == source.category) 2 else 0;
        (overlap + categoryBonus + v.viewCount, toVideoPublic(v))
      })
      .toArray();

    let sorted = related.sort(func(a, b) {
      Nat.compare(b.0, a.0)
    });

    let n = Nat.min(limit, sorted.size());
    Array.tabulate<VideoTypes.VideoPublic>(n, func(i) { sorted[i].1 });
  };

  // ── Internal helpers ───────────────────────────────────────────────────────

  func toVideoPublic(v : VideoTypes.Video) : VideoTypes.VideoPublic {
    {
      id = v.id;
      title = v.title;
      description = v.description;
      thumbnailUrl = v.thumbnailUrl;
      videoUrl = v.videoUrl;
      creatorId = v.creatorId;
      category = v.category;
      tags = v.tags;
      status = v.status;
      viewCount = v.viewCount;
      totalWatchSeconds = v.totalWatchSeconds;
      createdAt = v.createdAt;
    };
  };
};
