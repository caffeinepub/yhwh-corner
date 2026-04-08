import Common "common";

module Engagement {
  public type CommentId = Nat;
  public type LiveStreamId = Nat;

  public type Comment = {
    id : CommentId;
    videoId : Common.VideoId;
    authorId : Common.UserId;
    text : Text;
    createdAt : Common.Timestamp;
    var isDeleted : Bool;
  };

  public type CommentPublic = {
    id : CommentId;
    videoId : Common.VideoId;
    authorId : Common.UserId;
    authorName : Text;
    text : Text;
    createdAt : Common.Timestamp;
    isDeleted : Bool;
  };

  public type Like = {
    userId : Common.UserId;
    videoId : Common.VideoId;
    createdAt : Common.Timestamp;
  };

  public type LikeKey = {
    userId : Common.UserId;
    videoId : Common.VideoId;
  };

  public type LiveStreamStatus = {
    #scheduled;
    #active;
    #ended;
    #archived;
  };

  public type LiveStream = {
    id : LiveStreamId;
    creatorId : Common.UserId;
    title : Text;
    description : Text;
    var status : LiveStreamStatus;
    scheduledAt : Common.Timestamp;
    var startedAt : ?Common.Timestamp;
    var endedAt : ?Common.Timestamp;
    var viewerCount : Nat;
    var archivedVideoId : ?Common.VideoId;
  };

  public type LiveStreamPublic = {
    id : LiveStreamId;
    creatorId : Common.UserId;
    creatorName : Text;
    title : Text;
    description : Text;
    status : LiveStreamStatus;
    scheduledAt : Common.Timestamp;
    startedAt : ?Common.Timestamp;
    endedAt : ?Common.Timestamp;
    viewerCount : Nat;
    archivedVideoId : ?Common.VideoId;
  };

  public type WatchHistoryEntry = {
    userId : Common.UserId;
    videoId : Common.VideoId;
    watchedAt : Common.Timestamp;
    watchSeconds : Nat;
  };

  public type PostCommentRequest = {
    videoId : Common.VideoId;
    text : Text;
  };

  public type StartLiveStreamRequest = {
    title : Text;
    description : Text;
    scheduledAt : Common.Timestamp;
  };
};
