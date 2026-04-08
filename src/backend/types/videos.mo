import Common "common";

module {
  public type VideoId = Common.VideoId;
  public type UserId = Common.UserId;
  public type VideoStatus = Common.VideoStatus;
  public type Timestamp = Common.Timestamp;

  public type Video = {
    id : VideoId;
    var title : Text;
    var description : Text;
    var thumbnailUrl : Text;
    var videoUrl : Text;
    creatorId : UserId;
    var category : Text;
    var tags : [Text];
    var status : VideoStatus;
    var viewCount : Nat;
    var totalWatchSeconds : Nat;
    var totalRevenue : Nat;
    createdAt : Timestamp;
  };

  public type VideoPublic = {
    id : VideoId;
    title : Text;
    description : Text;
    thumbnailUrl : Text;
    videoUrl : Text;
    creatorId : UserId;
    category : Text;
    tags : [Text];
    status : VideoStatus;
    viewCount : Nat;
    totalWatchSeconds : Nat;
    createdAt : Timestamp;
  };

  public type VideoUploadRequest = {
    title : Text;
    description : Text;
    thumbnailUrl : Text;
    videoUrl : Text;
    category : Text;
    tags : [Text];
  };

  public type WatchEvent = {
    videoId : VideoId;
    watchSeconds : Nat;
  };
};
