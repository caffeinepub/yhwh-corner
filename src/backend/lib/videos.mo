import Types "../types/videos";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

module {
  public func upload(
    videos : Map.Map<Common.VideoId, Types.Video>,
    nextId : Nat,
    caller : Common.UserId,
    req : Types.VideoUploadRequest,
  ) : Types.VideoPublic {
    let video : Types.Video = {
      id = nextId;
      var title = req.title;
      var description = req.description;
      var thumbnailUrl = req.thumbnailUrl;
      var videoUrl = req.videoUrl;
      creatorId = caller;
      var category = req.category;
      var tags = req.tags;
      var status = #draft;
      var viewCount = 0;
      var totalWatchSeconds = 0;
      var totalRevenue = 0;
      createdAt = Time.now();
    };
    videos.add(nextId, video);
    toPublic(video);
  };

  public func publish(
    videos : Map.Map<Common.VideoId, Types.Video>,
    caller : Common.UserId,
    videoId : Common.VideoId,
  ) : Types.VideoPublic {
    let video = switch (videos.get(videoId)) {
      case (?v) v;
      case null Runtime.trap("Video not found");
    };
    if (not Principal.equal(video.creatorId, caller)) Runtime.trap("Not authorized");
    video.status := #published;
    toPublic(video);
  };

  public func unpublish(
    videos : Map.Map<Common.VideoId, Types.Video>,
    caller : Common.UserId,
    videoId : Common.VideoId,
  ) : Types.VideoPublic {
    let video = switch (videos.get(videoId)) {
      case (?v) v;
      case null Runtime.trap("Video not found");
    };
    if (not Principal.equal(video.creatorId, caller)) Runtime.trap("Not authorized");
    video.status := #unpublished;
    toPublic(video);
  };

  public func getById(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
  ) : ?Types.VideoPublic {
    switch (videos.get(videoId)) {
      case (?v) ?toPublic(v);
      case null null;
    };
  };

  public func listPublished(
    videos : Map.Map<Common.VideoId, Types.Video>,
    offset : Nat,
    limit : Nat,
  ) : Common.Page<Types.VideoPublic> {
    let published = videos.entries()
      .filter(func((_, v) : (Common.VideoId, Types.Video)) : Bool { v.status == #published })
      .map(func((_, v) : (Common.VideoId, Types.Video)) : Types.VideoPublic { toPublic(v) })
      .toArray();
    let total = published.size();
    let items = if (offset >= total) {
      []
    } else {
      let end = Nat.min(offset + limit, total);
      published.sliceToArray(offset, end)
    };
    { items; total; offset; limit };
  };

  public func listByCreator(
    videos : Map.Map<Common.VideoId, Types.Video>,
    creatorId : Common.UserId,
  ) : [Types.VideoPublic] {
    videos.entries()
      .filter(func((_, v) : (Common.VideoId, Types.Video)) : Bool {
        Principal.equal(v.creatorId, creatorId)
      })
      .map(func((_, v) : (Common.VideoId, Types.Video)) : Types.VideoPublic { toPublic(v) })
      .toArray();
  };

  public func recordWatch(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
    watchSeconds : Nat,
  ) : () {
    let video = switch (videos.get(videoId)) {
      case (?v) v;
      case null Runtime.trap("Video not found");
    };
    video.viewCount += 1;
    video.totalWatchSeconds += watchSeconds;
  };

  public func search(
    videos : Map.Map<Common.VideoId, Types.Video>,
    term : Text,
  ) : [Types.VideoPublic] {
    let lower = term.toLower();
    videos.entries()
      .filter(func((_, v) : (Common.VideoId, Types.Video)) : Bool {
        v.status == #published and (
          v.title.toLower().contains(#text lower) or
          v.description.toLower().contains(#text lower)
        )
      })
      .map(func((_, v) : (Common.VideoId, Types.Video)) : Types.VideoPublic { toPublic(v) })
      .toArray();
  };

  public func flagVideo(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
  ) : () {
    let video = switch (videos.get(videoId)) {
      case (?v) v;
      case null Runtime.trap("Video not found");
    };
    video.status := #flagged;
  };

  public func toPublic(video : Types.Video) : Types.VideoPublic {
    {
      id = video.id;
      title = video.title;
      description = video.description;
      thumbnailUrl = video.thumbnailUrl;
      videoUrl = video.videoUrl;
      creatorId = video.creatorId;
      category = video.category;
      tags = video.tags;
      status = video.status;
      viewCount = video.viewCount;
      totalWatchSeconds = video.totalWatchSeconds;
      createdAt = video.createdAt;
    };
  };
};
