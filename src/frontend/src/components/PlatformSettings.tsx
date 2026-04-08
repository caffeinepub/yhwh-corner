import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Percent, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdSlotType } from "../backend";
import {
  useAdSlotPricing,
  useSetAdSlotPricing,
  useSetCreatorRevenueSharePercent,
  useSetViewerRewardPercent,
} from "../hooks/useQueries";

function centsToDisplay(c: bigint | number): string {
  return (Number(c) / 100).toFixed(2);
}

function displayToCents(s: string): bigint {
  const f = Number.parseFloat(s);
  if (!Number.isFinite(f) || f < 0) return 0n;
  return BigInt(Math.round(f * 100));
}

interface SettingRowProps {
  label: string;
  description: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  dataOcid?: string;
}

function SettingRow({
  label,
  description,
  value,
  onChange,
  prefix,
  suffix,
  dataOcid,
}: SettingRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {prefix && (
          <span className="text-sm text-muted-foreground">{prefix}</span>
        )}
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-28 h-8 text-sm text-right font-mono bg-muted border-border focus:border-primary"
          data-ocid={dataOcid}
        />
        {suffix && (
          <span className="text-sm text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export function PlatformSettings() {
  const { data: pricing, isLoading } = useAdSlotPricing();
  const setSlotPricing = useSetAdSlotPricing();
  const setViewerReward = useSetViewerRewardPercent();
  const setCreatorShare = useSetCreatorRevenueSharePercent();

  const [bannerPrice, setBannerPrice] = useState("500.00");
  const [preRollPrice, setPreRollPrice] = useState("250.00");
  const [sidebarPrice, setSidebarPrice] = useState("100.00");
  const [viewerRewardPct, setViewerRewardPct] = useState("1.0");
  const [creatorSharePct, setCreatorSharePct] = useState("25.0");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!pricing || !pricing.length) return;
    const map = new Map(pricing);
    const banner = map.get(AdSlotType.homepage_banner);
    const preRoll = map.get(AdSlotType.pre_roll);
    const sidebar = map.get(AdSlotType.sidebar);
    if (banner !== undefined) setBannerPrice(centsToDisplay(banner));
    if (preRoll !== undefined) setPreRollPrice(centsToDisplay(preRoll));
    if (sidebar !== undefined) setSidebarPrice(centsToDisplay(sidebar));
  }, [pricing]);

  const handleSave = async () => {
    const creatorPct = Number.parseFloat(creatorSharePct);
    if (creatorPct < 25) {
      toast.error("Creator share cannot be below 25%");
      return;
    }
    setSaving(true);
    try {
      await Promise.all([
        setSlotPricing.mutateAsync({
          slotType: AdSlotType.homepage_banner,
          dailyPrice: displayToCents(bannerPrice),
        }),
        setSlotPricing.mutateAsync({
          slotType: AdSlotType.pre_roll,
          dailyPrice: displayToCents(preRollPrice),
        }),
        setSlotPricing.mutateAsync({
          slotType: AdSlotType.sidebar,
          dailyPrice: displayToCents(sidebarPrice),
        }),
        setViewerReward.mutateAsync(
          BigInt(Math.round(Number.parseFloat(viewerRewardPct) * 100)),
        ),
        setCreatorShare.mutateAsync(BigInt(Math.round(creatorPct * 100))),
      ]);
      toast.success("Platform settings saved");
    } catch {
      toast.error("Failed to save settings — check permissions");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
          <Settings size={16} className="text-primary" />
          Platform Settings
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Configure ad pricing and revenue split percentages.
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 py-2">
            {["a", "b", "c", "d", "e"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {/* Ad Slot Pricing */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-1 pt-2">
                <DollarSign size={13} className="text-accent" />
                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Ad Slot Pricing (per day)
                </Label>
              </div>
              <SettingRow
                label="Homepage Banner"
                description="Premium top-of-page placement visible to all visitors"
                value={bannerPrice}
                onChange={setBannerPrice}
                prefix="$"
                dataOcid="setting-banner-price"
              />
              <Separator className="bg-border/50" />
              <SettingRow
                label="Pre-Roll Video"
                description="Video ad played before content starts"
                value={preRollPrice}
                onChange={setPreRollPrice}
                prefix="$"
                dataOcid="setting-preroll-price"
              />
              <Separator className="bg-border/50" />
              <SettingRow
                label="Sidebar Spot"
                description="Persistent sidebar display throughout browsing"
                value={sidebarPrice}
                onChange={setSidebarPrice}
                prefix="$"
                dataOcid="setting-sidebar-price"
              />
            </div>

            <Separator className="bg-border my-2" />

            {/* Revenue Split */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1 pt-2">
                <Percent size={13} className="text-primary" />
                <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Revenue Distribution
                </Label>
              </div>
              <SettingRow
                label="Viewer Reward %"
                description="Percentage of platform revenue distributed to viewers per hour watched"
                value={viewerRewardPct}
                onChange={setViewerRewardPct}
                suffix="%"
                dataOcid="setting-viewer-reward"
              />
              <Separator className="bg-border/50" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Creator Revenue Share %
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Minimum 25% — non-negotiable platform policy
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Input
                    type="number"
                    value={creatorSharePct}
                    onChange={(e) => setCreatorSharePct(e.target.value)}
                    min={25}
                    className="w-28 h-8 text-sm text-right font-mono bg-muted border-border focus:border-primary"
                    data-ocid="setting-creator-share"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                  {Number.parseFloat(creatorSharePct) < 25 && (
                    <Badge variant="destructive" className="text-xs">
                      Below minimum
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full gradient-magenta-cyan text-white font-semibold"
                  disabled={saving || Number.parseFloat(creatorSharePct) < 25}
                  data-ocid="save-settings-btn"
                >
                  <Save size={14} className="mr-2" />
                  {saving ? "Saving…" : "Save Settings"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-display font-bold">
                    Confirm Settings Change
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground text-sm">
                    These changes will immediately affect all active ad pricing
                    and revenue payouts. Creator share is set to{" "}
                    <strong className="text-foreground">
                      {creatorSharePct}%
                    </strong>
                    . This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className="bg-muted border-border"
                    data-ocid="cancel-settings"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSave}
                    className="gradient-magenta-cyan text-white"
                    data-ocid="confirm-settings"
                  >
                    Confirm Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </CardContent>
    </Card>
  );
}
