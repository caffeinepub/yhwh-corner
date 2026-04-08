import Types "../types/users";
import Common "../types/common";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

module {
  public func register(
    users : Map.Map<Common.UserId, Types.User>,
    caller : Common.UserId,
    req : Types.RegisterRequest,
  ) : Types.UserPublic {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers cannot register");
    if (users.containsKey(caller)) Runtime.trap("User already registered");
    let user : Types.User = {
      id = caller;
      var username = req.username;
      var email = req.email;
      role = req.role;
      var status = #active;
      var balance = 0;
      createdAt = Time.now();
    };
    users.add(caller, user);
    toPublic(user);
  };

  public func getProfile(
    users : Map.Map<Common.UserId, Types.User>,
    userId : Common.UserId,
  ) : ?Types.UserPublic {
    switch (users.get(userId)) {
      case (?user) ?toPublic(user);
      case null null;
    };
  };

  public func updateProfile(
    users : Map.Map<Common.UserId, Types.User>,
    caller : Common.UserId,
    req : Types.UpdateProfileRequest,
  ) : Types.UserPublic {
    let user = switch (users.get(caller)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    switch (req.username) {
      case (?name) { user.username := name };
      case null {};
    };
    switch (req.email) {
      case (?email) { user.email := email };
      case null {};
    };
    toPublic(user);
  };

  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      id = user.id;
      username = user.username;
      email = user.email;
      role = user.role;
      status = user.status;
      balance = user.balance;
      createdAt = user.createdAt;
    };
  };

  public func setStatus(
    users : Map.Map<Common.UserId, Types.User>,
    userId : Common.UserId,
    status : Common.UserStatus,
  ) : () {
    let user = switch (users.get(userId)) {
      case (?u) u;
      case null Runtime.trap("User not found");
    };
    user.status := status;
  };

  public func countByRole(
    users : Map.Map<Common.UserId, Types.User>,
    role : Common.UserRole,
  ) : Nat {
    users.foldLeft((0 : Nat), func(acc, _k, v) {
      if (v.role == role) acc + 1 else acc
    });
  };
};
