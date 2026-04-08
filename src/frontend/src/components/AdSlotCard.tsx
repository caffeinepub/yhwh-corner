import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  BarChart3,
  Eye,
  Globe,
  Monitor,
  Play,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export type SlotType = "homepage_banner" | "pre_roll" | "sidebar";

interface SlotMeta {
  type: SlotType;
  label: string;
  tagline: string;
  description: string;
  placement: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  accentClass: string;
  available: number;
  priceKey: keyof {
    homepage_banner: bigint;
    pre_roll: bigint;
    sidebar: bigint;
  };
}

export const SLOT_DEFINITIONS: SlotMeta[] = [
  {
    type: "homepage_banner",
    label: "Homepage Banner",
    tagline: "Maximum Visibility",
    description:
      "Your brand front and center on YHWH Corner's homepage. Every visitor sees your ad first.",
    placement: "Top of homepage — above the fold, always visible",
    icon: <Monitor className="w-6 h-6" />,
    stats: [
      { label: "Daily Impressions", value: "2.4M+" },
      { label: "Avg. CTR", value: "4.8%" },
      { label: "Viewability", value: "98%" },
    ],
    badge: "MOST POPULAR",
    badgeVariant: "default",
    accentClass:
      "border-primary/50 shadow-[0_0_24px_oklch(var(--primary)/0.18)]",
    available: 2,
    priceKey: "homepage_banner",
  },
  {
    type: "pre_roll",
    label: "Pre-Roll Video Ad",
    tagline: "Captive Audience",
    description:
      "Play before premium creator content. Viewers are already engaged — your ad gets full attention.",
    placement: "Before every video across the platform",
    icon: <Play className="w-6 h-6" />,
    stats: [
      { label: "Daily Views", value: "890K+" },
      { label: "Completion Rate", value: "72%" },
      { label: "Brand Recall", value: "3.6×" },
    ],
    badge: "HIGH IMPACT",
    badgeVariant: "secondary",
    accentClass: "border-accent/50 shadow-[0_0_24px_oklch(var(--accent)/0.15)]",
    available: 5,
    priceKey: "pre_roll",
  },
  {
    type: "sidebar",
    label: "Sidebar Placement",
    tagline: "Always Present",
    description:
      "Persistent sidebar placement that follows viewers throughout their browsing session.",
    placement: "Right sidebar — visible during video browsing & discovery",
    icon: <BarChart3 className="w-6 h-6" />,
    stats: [
      { label: "Daily Impressions", value: "1.1M+" },
      { label: "Session Duration", value: "24 min avg" },
      { label: "Repeat Exposure", value: "5.2× per visit" },
    ],
    badge: "GREAT VALUE",
    badgeVariant: "outline",
    accentClass: "border-border hover:border-muted-foreground/30",
    available: 8,
    priceKey: "sidebar",
  },
];

const BADGE_ICONS: Record<SlotType, React.ReactNode> = {
  homepage_banner: <Sparkles className="w-3 h-3" />,
  pre_roll: <Zap className="w-3 h-3" />,
  sidebar: <Globe className="w-3 h-3" />,
};

interface AdSlotCardProps {
  slot: SlotMeta;
  price: bigint | undefined;
  onSelect: (type: SlotType) => void;
  index: number;
}

export function AdSlotCard({ slot, price, onSelect, index }: AdSlotCardProps) {
  const dailyPrice = price ? Number(price) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Card
        className={`relative overflow-hidden bg-card border transition-smooth cursor-pointer group h-full ${slot.accentClass}`}
      >
        {/* Top badge */}
        <div className="absolute top-4 right-4">
          <Badge
            variant={slot.badgeVariant}
            className="text-[10px] font-semibold tracking-widest flex items-center gap-1 uppercase"
          >
            {BADGE_ICONS[slot.type]}
            {slot.badge}
          </Badge>
        </div>

        <CardHeader className="pb-2 pt-6">
          {/* Icon + slot type */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl gradient-magenta-cyan flex items-center justify-center text-primary-foreground shadow-elevated">
              {slot.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                Airway Time
              </p>
              <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                {slot.label}
              </h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic">{slot.tagline}</p>
          <p className="text-sm text-foreground/80 mt-1">{slot.description}</p>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Placement */}
          <div className="flex items-start gap-2 p-3 bg-muted/40 rounded-lg">
            <Eye className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {slot.placement}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {slot.stats.map((s) => (
              <div
                key={s.label}
                className="text-center p-2 bg-muted/30 rounded-lg"
              >
                <p className="text-sm font-bold font-display text-foreground">
                  {s.value}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Audience reach indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>
              <span className="text-foreground font-semibold">
                {slot.available} slots
              </span>{" "}
              available this week
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              {dailyPrice > 0 ? (
                <>
                  <span className="text-2xl font-bold font-display text-gradient-magenta">
                    ${dailyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    / day
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground text-sm">Loading…</span>
              )}
            </div>
            <Button
              data-ocid={`buy-slot-${slot.type}`}
              onClick={() => onSelect(slot.type)}
              className="gradient-magenta-cyan text-primary-foreground font-semibold transition-smooth hover:opacity-90 hover:scale-105"
              size="sm"
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
