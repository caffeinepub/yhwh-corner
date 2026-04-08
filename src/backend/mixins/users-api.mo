import UserTypes "../types/users";
import Common "../types/common";
import UserLib "../lib/users";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  users : Map.Map<Common.UserId, UserTypes.User>,
) {
  public shared ({ caller }) func register(req : UserTypes.RegisterRequest) : async UserTypes.UserPublic {
    UserLib.register(users, caller, req);
  };

  public shared query ({ caller }) func getMyProfile() : async ?UserTypes.UserPublic {
    UserLib.getProfile(users, caller);
  };

  public query func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserPublic {
    UserLib.getProfile(users, userId);
  };

  public shared ({ caller }) func updateProfile(req : UserTypes.UpdateProfileRequest) : async UserTypes.UserPublic {
    UserLib.updateProfile(users, caller, req);
  };
};
