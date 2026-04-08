import AdTypes "../types/ads";
import RewardTypes "../types/rewards";
import AdminTypes "../types/admin";
import Common "../types/common";
import AdLib "../lib/ads";
import RewardLib "../lib/rewards";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  ads : Map.Map<Common.AdId, AdTypes.Ad>,
  slotPricing : Map.Map<Text, AdTypes.SlotPricing>,
  adCounter : { var next : Nat },
  platformLedger : List.List<RewardTypes.PlatformLedgerEntry>,
  creatorEarnings : Map.Map<Common.UserId, RewardTypes.CreatorEarnings>,
  creatorPayouts : List.List<AdminTypes.CreatorPayout>,
  ledgerCounter : { var next : Nat },
  platformFinancials : { var revenue : Nat; var balance : Nat },
  platformConfig : AdminTypes.PlatformConfig,
) {
  public shared ({ caller }) func purchaseAdSlot(req : AdTypes.AdPurchaseRequest) : async AdTypes.AdPublic {
    let ad = AdLib.purchaseAdSlot(
      ads,
      slotPricing,
      adCounter.next,
      caller,
      req,
      platformFinancials.revenue,
    );
    adCounter.next += 1;
    platformFinancials.revenue += ad.totalCost;
    platformFinancials.balance += ad.totalCost;
    ignore RewardLib.addLedgerEntry(
      platformLedger,
      ledgerCounter.next,
      #adRevenueIn,
      ad.totalCost,
      "Ad slot purchase",
    );
    ledgerCounter.next += 1;
    ad;
  };

  public query func getActiveAds(slotType : Common.AdSlotType) : async [AdTypes.AdPublic] {
    AdLib.getActiveAdsBySlot(ads, slotType);
  };

  public shared query ({ caller }) func getMyAdCampaigns() : async [AdTypes.AdPublic] {
    AdLib.getAdvertiserCampaigns(ads, caller);
  };

  public query func getAdSlotPricing() : async [(Common.AdSlotType, Nat)] {
    [
      (#homepage_banner, AdLib.getSlotPrice(slotPricing, #homepage_banner)),
      (#pre_roll, AdLib.getSlotPrice(slotPricing, #pre_roll)),
      (#sidebar, AdLib.getSlotPrice(slotPricing, #sidebar)),
    ];
  };
};
