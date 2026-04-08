import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock,
  DollarSign,
  Eye,
  Film,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { VideoPublic } from "../types";

type SortKey = "title" | "amount" | "views" | "hours";
type SortDir = "asc" | "desc";

function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatHours(seconds: bigint) {
  const total = Number(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function SortButton({
  label,
  sortKey,
  current,
  dir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = current === sortKey;
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-1 text-xs font-display font-semibold uppercase tracking-wide transition-colors hover:text-foreground ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
      data-ocid={`sort-${sortKey}`}
    >
      {label}
      {active ? (
        dir === "asc" ? (
          <ArrowUp size={11} />
        ) : (
          <ArrowDown size={11} />
        )
      ) : (
        <ArrowUpDown size={11} />
      )}
    </button>
  );
}

interface EarningsTableProps {
  videos: VideoPublic[];
  videoEarnings: [bigint, bigint][];
  onPublish: (id: bigint) => void;
  onUnpublish: (id: bigint) => void;
  publishPending: boolean;
  unpublishPending: boolean;
}

export function EarningsTable({
  videos,
  videoEarnings,
  onPublish,
  onUnpublish,
  publishPending,
  unpublishPending,
}: EarningsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const earningsMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const [videoId, amount] of videoEarnings) {
      map.set(videoId.toString(), Number(amount));
    }
    return map;
  }, [videoEarnings]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    return [...videos].sort((a, b) => {
      let diff = 0;
      if (sortKey === "title") {
        diff = a.title.localeCompare(b.title);
      } else if (sortKey === "amount") {
        diff =
          (earningsMap.get(a.id.toString()) ?? 0) -
          (earningsMap.get(b.id.toString()) ?? 0);
      } else if (sortKey === "views") {
        diff = Number(a.viewCount) - Number(b.viewCount);
      } else if (sortKey === "hours") {
        diff = Number(a.totalWatchSeconds) - Number(b.totalWatchSeconds);
      }
      return sortDir === "asc" ? diff : -diff;
    });
  }, [videos, sortKey, sortDir, earningsMap]);

  if (videos.length === 0) return null;

  const statusColor: Record<string, string> = {
    published: "bg-accent/15 text-accent border-accent/30",
    draft: "bg-muted text-muted-foreground border-border",
    unpublished: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="overflow-x-auto" data-ocid="earnings-table">
      {/* Header row */}
      <div className="min-w-[640px]">
        <div className="grid grid-cols-[1fr_80px_80px_100px_100px_88px] gap-3 px-4 py-2 border-b border-border">
          <SortButton
            label="Title"
            sortKey="title"
            current={sortKey}
            dir={sortDir}
            onSort={handleSort}
          />
          <SortButton
            label="Views"
            sortKey="views"
            current={sortKey}
            dir={sortDir}
            onSort={handleSort}
          />
          <SortButton
            label="Hours"
            sortKey="hours"
            current={sortKey}
            dir={sortDir}
            onSort={handleSort}
          />
          <SortButton
            label="Earnings"
            sortKey="amount"
            current={sortKey}
            dir={sortDir}
            onSort={handleSort}
          />
          <span className="text-xs font-display font-semibold uppercase tracking-wide text-muted-foreground">
            Status
          </span>
          <span className="text-xs font-display font-semibold uppercase tracking-wide text-muted-foreground text-right">
            Action
          </span>
        </div>

        {/* Rows */}
        {sorted.map((video) => {
          const earned = earningsMap.get(video.id.toString()) ?? 0;
          const isPublished = video.status === "published";
          return (
            <div
              key={video.id.toString()}
              className="grid grid-cols-[1fr_80px_80px_100px_100px_88px] gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-smooth group items-center"
              data-ocid="earnings-row"
            >
              {/* Title + thumbnail */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-9 rounded-md bg-muted border border-border flex-shrink-0 overflow-hidden">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film size={12} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="font-display font-semibold text-sm text-foreground truncate"
                    title={video.title}
                  >
                    {video.title}
                  </p>
                  {video.category && (
                    <p className="text-xs text-muted-foreground truncate">
                      {video.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Views */}
              <div className="flex items-center gap-1 text-sm text-foreground tabular-nums">
                <Eye
                  size={11}
                  className="text-muted-foreground flex-shrink-0"
                />
                <span>{Number(video.viewCount).toLocaleString()}</span>
              </div>

              {/* Watch hours */}
              <div className="flex items-center gap-1 text-sm text-foreground tabular-nums">
                <Clock
                  size={11}
                  className="text-muted-foreground flex-shrink-0"
                />
                <span>{formatHours(video.totalWatchSeconds)}</span>
              </div>

              {/* Earnings */}
              <div className="flex items-center gap-1 font-display font-semibold text-sm tabular-nums">
                <DollarSign
                  size={12}
                  className={
                    earned > 0 ? "text-primary" : "text-muted-foreground"
                  }
                />
                <span
                  className={
                    earned > 0 ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {formatCurrency(earned)}
                </span>
              </div>

              {/* Status badge */}
              <div>
                <Badge
                  variant="outline"
                  className={`text-xs capitalize px-2 py-0.5 ${statusColor[video.status] ?? statusColor.draft}`}
                >
                  {video.status}
                </Badge>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                {isPublished ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onUnpublish(video.id)}
                    disabled={unpublishPending}
                    data-ocid="unpublish-btn"
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 text-accent hover:text-accent hover:bg-accent/10"
                    onClick={() => onPublish(video.id)}
                    disabled={publishPending}
                    data-ocid="publish-btn"
                  >
                    Publish
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
