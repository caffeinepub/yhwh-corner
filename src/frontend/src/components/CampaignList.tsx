import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  DollarSign,
  ExternalLink,
  Layers,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import type { AdPublic } from "../types";

const SLOT_LABELS: Record<string, string> = {
  homepage_banner: "Homepage Banner",
  pre_roll: "Pre-Roll Video",
  sidebar: "Sidebar Placement",
};

function formatDate(ns: bigint): string {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CampaignSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
        >
          <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-60" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

interface CampaignRowProps {
  campaign: AdPublic;
  index: number;
}

function CampaignRow({ campaign, index }: CampaignRowProps) {
  const cost = Number(campaign.totalCost);
  const days = Number(campaign.durationDays);
  const slotLabel = SLOT_LABELS[campaign.slotType] ?? campaign.slotType;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <Card
        className="border border-border bg-card hover:border-primary/30 transition-smooth"
        data-ocid={`campaign-row-${campaign.id}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
              {campaign.logoUrl ? (
                <img
                  src={campaign.logoUrl}
                  alt={campaign.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <Layers className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            {/* Main info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold font-display text-foreground truncate leading-tight">
                    {campaign.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {slotLabel}
                  </p>
                </div>
                <Badge
                  variant={campaign.isActive ? "default" : "secondary"}
                  className={`text-[10px] uppercase tracking-wider shrink-0 ${
                    campaign.isActive
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "opacity-60"
                  }`}
                >
                  {campaign.isActive ? "Active" : "Ended"}
                </Badge>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {formatDate(campaign.startDate)} →{" "}
                  {formatDate(campaign.endDate)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {days} day{days !== 1 ? "s" : ""}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
                  <DollarSign className="w-3 h-3 text-primary" />$
                  {cost.toLocaleString()} total
                </span>
                {campaign.targetUrl && (
                  <a
                    href={campaign.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Landing page
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CampaignListProps {
  campaigns: AdPublic[] | undefined;
  isLoading: boolean;
}

export function CampaignList({ campaigns, isLoading }: CampaignListProps) {
  if (isLoading) return <CampaignSkeleton />;

  const active = campaigns?.filter((c) => c.isActive) ?? [];
  const past = campaigns?.filter((c) => !c.isActive) ?? [];

  if (!campaigns || campaigns.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4 text-center"
        data-ocid="campaigns-empty"
      >
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Layers className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">No campaigns yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Book an airway time slot above to launch your first campaign.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {active.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Campaigns ({active.length})
          </h4>
          {active.map((c, i) => (
            <CampaignRow key={String(c.id)} campaign={c} index={i} />
          ))}
        </div>
      )}
      {past.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Past Campaigns ({past.length})
          </h4>
          {past.map((c, i) => (
            <CampaignRow key={String(c.id)} campaign={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
