import Common "common";

module {
  public type AdId = Common.AdId;
  public type UserId = Common.UserId;
  public type AdSlotType = Common.AdSlotType;
  public type Timestamp = Common.Timestamp;

  public type Ad = {
    id : AdId;
    advertiserId : UserId;
    var name : Text;
    var logoUrl : Text;
    var targetUrl : Text;
    slotType : AdSlotType;
    var durationDays : Nat;
    var startDate : Timestamp;
    var endDate : Timestamp;
    var isActive : Bool;
    totalCost : Nat;
    createdAt : Timestamp;
  };

  public type AdPublic = {
    id : AdId;
    advertiserId : UserId;
    name : Text;
    logoUrl : Text;
    targetUrl : Text;
    slotType : AdSlotType;
    durationDays : Nat;
    startDate : Timestamp;
    endDate : Timestamp;
    isActive : Bool;
    totalCost : Nat;
    createdAt : Timestamp;
  };

  public type AdPurchaseRequest = {
    name : Text;
    logoUrl : Text;
    targetUrl : Text;
    slotType : AdSlotType;
    durationDays : Nat;
  };

  public type SlotPricing = {
    slotType : AdSlotType;
    var dailyPrice : Nat;
  };
};
