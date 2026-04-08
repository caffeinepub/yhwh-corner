import { Badge } from "@/components/ui/badge";
import { ExternalLink, Megaphone } from "lucide-react";
import type { AdPublic } from "../types";

interface AdBannerProps {
  ads: AdPublic[];
  slot: "homepage_banner" | "sidebar" | "pre_roll";
}

function HomepageBannerAd({ ad }: { ad: AdPublic }) {
  return (
    <a
      href={ad.targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="ad-banner-homepage"
      className="group flex items-center gap-4 w-full bg-card border border-primary/20 rounded-xl px-5 py-3 hover:border-primary/50 transition-smooth shadow-card overflow-hidden relative"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="flex items-center gap-3 flex-1 min-w-0 relative">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary overflow-hidden border border-border/40 flex items-center justify-center">
          {ad.logoUrl ? (
            <img
              src={ad.logoUrl}
              alt={ad.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <Megaphone size={18} className="text-primary" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs py-0 px-1.5 bg-primary/10 text-primary border-primary/20"
            >
              Sponsored
            </Badge>
            <span className="font-display font-semibold text-sm text-foreground truncate">
              {ad.name}
            </span>
          </div>
        </div>
      </div>

      <ExternalLink
        size={14}
        className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors relative"
      />
    </a>
  );
}

function SidebarAd({ ad }: { ad: AdPublic }) {
  return (
    <a
      href={ad.targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="ad-banner-sidebar"
      className="group block bg-card border border-border/40 rounded-xl overflow-hidden hover:border-accent/40 transition-smooth shadow-card"
    >
      <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
        {ad.logoUrl ? (
          <img
            src={ad.logoUrl}
            alt={ad.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="gradient-magenta-cyan w-full h-full flex items-center justify-center">
            <Megaphone size={28} className="text-white opacity-80" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge
            variant="secondary"
            className="text-xs py-0 px-1.5 bg-black/60 text-white border-0"
          >
            Ad
          </Badge>
        </div>
      </div>
      <div className="p-3">
        <p className="font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {ad.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          <ExternalLink size={10} /> Visit sponsor
        </p>
      </div>
    </a>
  );
}

export function AdBanner({ ads, slot }: AdBannerProps) {
  const filtered = ads.filter((a) => a.isActive && a.slotType === slot);
  if (filtered.length === 0) return null;

  if (slot === "homepage_banner") {
    return (
      <div className="flex flex-col gap-2" data-ocid="ad-banner-zone">
        {filtered.map((ad) => (
          <HomepageBannerAd key={ad.id.toString()} ad={ad} />
        ))}
      </div>
    );
  }

  if (slot === "sidebar") {
    return (
      <div className="flex flex-col gap-4" data-ocid="ad-sidebar-zone">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Sponsored
        </p>
        {filtered.map((ad) => (
          <SidebarAd key={ad.id.toString()} ad={ad} />
        ))}
      </div>
    );
  }

  return null;
}
