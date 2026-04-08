import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  Radio,
  Users,
  VideoIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useGetLiveStream,
  useJoinLiveStream,
  useLeaveLiveStream,
} from "../hooks/useQueries";
import { LiveStreamStatus } from "../types";

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: LiveStreamStatus }) {
  if (status === LiveStreamStatus.active) {
    return (
      <Badge
        variant="destructive"
        className="gap-1 text-xs font-bold uppercase tracking-widest animate-pulse"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
        Live
      </Badge>
    );
  }
  if (status === LiveStreamStatus.scheduled) {
    return (
      <Badge variant="secondary" className="text-xs uppercase tracking-wide">
        Scheduled
      </Badge>
    );
  }
  if (status === LiveStreamStatus.ended) {
    return (
      <Badge variant="outline" className="text-xs uppercase tracking-wide">
        Ended
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs uppercase tracking-wide">
      Archived
    </Badge>
  );
}

export default function LiveStreamDetailPage() {
  const { id } = useParams({ from: "/live/$id" });
  const streamId = BigInt(id);
  const { data: stream, isLoading } = useGetLiveStream(streamId);
  const { isAuthenticated } = useAuth();
  const joinMutation = useJoinLiveStream();
  const leaveMutation = useLeaveLiveStream();

  // Stable refs to avoid exhaustive-deps churn
  const joinRef = useRef(joinMutation.mutate);
  const leaveRef = useRef(leaveMutation.mutate);
  joinRef.current = joinMutation.mutate;
  leaveRef.current = leaveMutation.mutate;

  useEffect(() => {
    const isActive = stream?.status === LiveStreamStatus.active;
    if (isActive && isAuthenticated) {
      joinRef.current(streamId);
    }
    return () => {
      if (isActive && isAuthenticated) {
        leaveRef.current(streamId);
      }
    };
  }, [stream?.status, isAuthenticated, streamId]);

  if (isLoading) {
    return (
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6"
        data-ocid="live-detail-loading"
      >
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="aspect-video w-full rounded-xl" />
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
    );
  }

  if (!stream) {
    return (
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="live-detail-notfound"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-5">
          <Radio size={36} className="text-muted-foreground/50" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Stream Not Found
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          This live stream may have ended or doesn&apos;t exist.
        </p>
        <Button asChild variant="outline">
          <Link to="/live">
            <ArrowLeft size={15} className="mr-1.5" />
            Back to Live
          </Link>
        </Button>
      </div>
    );
  }

  const isActive = stream.status === LiveStreamStatus.active;
  const isScheduled = stream.status === LiveStreamStatus.scheduled;
  const isOver =
    stream.status === LiveStreamStatus.ended ||
    stream.status === LiveStreamStatus.archived;
  const hasRecording =
    stream.archivedVideoId !== undefined && stream.archivedVideoId !== null;

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6"
      data-ocid="live-detail-page"
    >
      {/* Back nav */}
      <Link
        to="/live"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="live-detail-back"
      >
        <ArrowLeft size={15} />
        Back to Live
      </Link>

      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StatusBadge status={stream.status} />
            <span className="text-sm text-muted-foreground font-medium truncate">
              {stream.creatorName}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground break-words">
            {stream.title}
          </h1>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm shrink-0"
          data-ocid="live-viewer-count"
        >
          <Users size={14} />
          <span>{stream.viewerCount.toString()} watching</span>
        </div>
      </div>

      {/* Player / status area */}
      <div
        className="aspect-video rounded-xl border border-border/40 overflow-hidden relative"
        data-ocid="live-player-area"
      >
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center gap-4">
            {/* Pulsing rings */}
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <span className="absolute inset-0 scale-125 rounded-full bg-primary/10 animate-ping [animation-delay:0.3s]" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/15 border border-primary/30">
                <Radio size={36} className="text-primary" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="font-display font-semibold text-foreground text-xl">
                Stream is Live!
              </p>
              <p className="text-muted-foreground text-sm">
                Tune in — live playback is coming soon.
              </p>
            </div>
            <Badge
              variant="destructive"
              className="absolute top-4 left-4 gap-1 text-xs font-bold uppercase tracking-widest animate-pulse"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
              Live
            </Badge>
          </div>
        )}

        {isScheduled && (
          <div className="absolute inset-0 bg-muted/60 flex flex-col items-center justify-center gap-3">
            <CalendarClock size={48} className="text-muted-foreground/40" />
            <div className="text-center space-y-1">
              <p className="font-display font-semibold text-foreground">
                Stream Starts Soon
              </p>
              <p className="text-sm text-muted-foreground">
                Scheduled for {formatTimestamp(stream.scheduledAt)}
              </p>
            </div>
          </div>
        )}

        {isOver && (
          <div className="absolute inset-0 bg-muted/60 flex flex-col items-center justify-center gap-3">
            <Radio size={48} className="text-muted-foreground/25" />
            <div className="text-center space-y-1">
              <p className="font-display font-semibold text-muted-foreground">
                This stream has ended
              </p>
              {stream.endedAt && (
                <p className="text-xs text-muted-foreground/60">
                  Ended {formatTimestamp(stream.endedAt)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recording CTA for ended/archived with a video */}
      {isOver && hasRecording && (
        <div
          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/60"
          data-ocid="live-watch-recording"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
              <VideoIcon size={18} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                Recording available
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Watch the full stream replay
              </p>
            </div>
          </div>
          <Button asChild size="sm" data-ocid="live-recording-link">
            <Link
              to="/video/$id"
              params={{ id: stream.archivedVideoId!.toString() }}
            >
              Watch Recording
            </Link>
          </Button>
        </div>
      )}

      {/* Description */}
      {stream.description && (
        <>
          <Separator />
          <Card data-ocid="live-description">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display">
                About this Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stream.description}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
