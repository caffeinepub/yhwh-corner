import Common "common";

module {
  public type UserId = Common.UserId;
  public type UserRole = Common.UserRole;
  public type UserStatus = Common.UserStatus;
  public type Timestamp = Common.Timestamp;

  public type User = {
    id : UserId;
    var username : Text;
    var email : Text;
    role : UserRole;
    var status : UserStatus;
    var balance : Nat;
    createdAt : Timestamp;
  };

  public type UserPublic = {
    id : UserId;
    username : Text;
    email : Text;
    role : UserRole;
    status : UserStatus;
    balance : Nat;
    createdAt : Timestamp;
  };

  public type RegisterRequest = {
    username : Text;
    email : Text;
    role : UserRole;
  };

  public type UpdateProfileRequest = {
    username : ?Text;
    email : ?Text;
  };
};
