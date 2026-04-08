module {
  public type UserId = Principal;
  public type VideoId = Nat;
  public type AdId = Nat;
  public type Timestamp = Int;

  public type UserRole = {
    #creator;
    #viewer;
    #advertiser;
    #admin;
  };

  public type UserStatus = {
    #active;
    #flagged;
    #suspended;
  };

  public type VideoStatus = {
    #draft;
    #published;
    #unpublished;
    #flagged;
  };

  public type AdSlotType = {
    #homepage_banner;
    #pre_roll;
    #sidebar;
  };

  public type Page<T> = {
    items : [T];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
