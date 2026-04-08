import Types "../types/ads";
import Common "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

module {
  // Nanoseconds per day (86400 * 1_000_000_000)
  let DAY_NANOS : Int = 86_400_000_000_000;

  public func purchaseAdSlot(
    ads : Map.Map<Common.AdId, Types.Ad>,
    slotPricing : Map.Map<Text, Types.SlotPricing>,
    nextId : Nat,
    caller : Common.UserId,
    req : Types.AdPurchaseRequest,
    platformRevenue : Nat,
  ) : Types.AdPublic {
    let pricePerDay = getSlotPrice(slotPricing, req.slotType);
    let totalCost = pricePerDay * req.durationDays;
    let now = Time.now();
    let endDate = now + Int.fromNat(req.durationDays) * DAY_NANOS;
    let ad : Types.Ad = {
      id = nextId;
      advertiserId = caller;
      var name = req.name;
      var logoUrl = req.logoUrl;
      var targetUrl = req.targetUrl;
      slotType = req.slotType;
      var durationDays = req.durationDays;
      var startDate = now;
      var endDate = endDate;
      var isActive = true;
      totalCost;
      createdAt = now;
    };
    ads.add(nextId, ad);
    toPublic(ad);
  };

  public func getActiveAdsBySlot(
    ads : Map.Map<Common.AdId, Types.Ad>,
    slotType : Common.AdSlotType,
  ) : [Types.AdPublic] {
    let now = Time.now();
    ads.entries()
      .filter(func((_, a) : (Common.AdId, Types.Ad)) : Bool {
        a.isActive and a.slotType == slotType and a.endDate > now
      })
      .map(func((_, a) : (Common.AdId, Types.Ad)) : Types.AdPublic { toPublic(a) })
      .toArray();
  };

  public func getAdvertiserCampaigns(
    ads : Map.Map<Common.AdId, Types.Ad>,
    advertiserId : Common.UserId,
  ) : [Types.AdPublic] {
    ads.entries()
      .filter(func((_, a) : (Common.AdId, Types.Ad)) : Bool {
        a.advertiserId == advertiserId
      })
      .map(func((_, a) : (Common.AdId, Types.Ad)) : Types.AdPublic { toPublic(a) })
      .toArray();
  };

  public func setSlotPricing(
    slotPricing : Map.Map<Text, Types.SlotPricing>,
    slotType : Common.AdSlotType,
    dailyPrice : Nat,
  ) : () {
    let key = slotTypeToText(slotType);
    switch (slotPricing.get(key)) {
      case (?pricing) { pricing.dailyPrice := dailyPrice };
      case null {
        let p : Types.SlotPricing = { slotType; var dailyPrice };
        slotPricing.add(key, p);
      };
    };
  };

  public func getSlotPrice(
    slotPricing : Map.Map<Text, Types.SlotPricing>,
    slotType : Common.AdSlotType,
  ) : Nat {
    let key = slotTypeToText(slotType);
    switch (slotPricing.get(key)) {
      case (?p) p.dailyPrice;
      case null {
        // Defaults in cents: homepage_banner $50000, pre_roll $30000, sidebar $15000
        switch (slotType) {
          case (#homepage_banner) 5_000_000;
          case (#pre_roll) 3_000_000;
          case (#sidebar) 1_500_000;
        };
      };
    };
  };

  public func toPublic(ad : Types.Ad) : Types.AdPublic {
    {
      id = ad.id;
      advertiserId = ad.advertiserId;
      name = ad.name;
      logoUrl = ad.logoUrl;
      targetUrl = ad.targetUrl;
      slotType = ad.slotType;
      durationDays = ad.durationDays;
      startDate = ad.startDate;
      endDate = ad.endDate;
      isActive = ad.isActive;
      totalCost = ad.totalCost;
      createdAt = ad.createdAt;
    };
  };

  public func slotTypeToText(slotType : Common.AdSlotType) : Text {
    switch (slotType) {
      case (#homepage_banner) "homepage_banner";
      case (#pre_roll) "pre_roll";
      case (#sidebar) "sidebar";
    };
  };
};
