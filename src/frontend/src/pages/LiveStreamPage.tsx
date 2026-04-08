import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Radio, Square, Users, Video } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LiveStreamStatus, UserRole } from "../backend";
import type { LiveStreamPublic } from "../backend.d";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  useActiveLiveStreams,
  useArchiveLiveStream,
  useEndLiveStream,
  useGoLive,
  useStartLiveStream,
} from "../hooks/useQueries";

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LiveStreamStatus }) {
  if (status === LiveStreamStatus.active) {
    return (
      <Badge className="bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wide animate-pulse">
        ● LIVE
      </Badge>
    );
  }
  if (status === LiveStreamStatus.scheduled) {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-bold uppercase tracking-wide">
        <Calendar size={10} className="mr-1" />
        SCHEDULED
      </Badge>
    );
  }
  return null;
}

// ─── Stream Card ─────────────────────────────────────────────────────────────

function LiveStreamCard({ stream }: { stream: LiveStreamPublic }) {
  return (
    <Link
      to="/live/$id"
      params={{ id: stream.id.toString() }}
      data-ocid={`live-card-${stream.id}`}
    >
      <Card className="overflow-hidden hover:border-primary/50 transition-smooth cursor-pointer group shadow-card">
        <div className="aspect-video bg-muted/60 flex items-center justify-center relative">
          <Radio
            size={40}
            className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300"
          />
          <div className="absolute top-2 left-2">
            <StatusBadge status={stream.status} />
          </div>
          {stream.status === LiveStreamStatus.active && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded px-2 py-0.5 text-xs text-white">
              <Users size={10} />
              <span>{stream.viewerCount.toString()}</span>
            </div>
          )}
          {stream.status === LiveStreamStatus.scheduled &&
            stream.scheduledAt && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded px-2 py-0.5 text-xs text-white">
                <Clock size={10} />
                <span>
                  {new Date(
                    Number(stream.scheduledAt) / 1_000_000,
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {stream.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {stream.creatorName}
          </p>
          {stream.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {stream.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Creator Stream Row ───────────────────────────────────────────────────────

function CreatorStreamRow({ stream }: { stream: LiveStreamPublic }) {
  const goLive = useGoLive();
  const endStream = useEndLiveStream();
  const archiveStream = useArchiveLiveStream();
  const [archiveUrl, setArchiveUrl] = useState("");
  const [archiveOpen, setArchiveOpen] = useState(false);

  const handleGoLive = () => {
    goLive.mutate(stream.id, {
      onSuccess: () => toast.success("You are now live!"),
      onError: (e) =>
        toast.error(e instanceof Error ? e.message : "Failed to go live"),
    });
  };

  const handleEnd = () => {
    endStream.mutate(stream.id, {
      onSuccess: () => toast.success("Stream ended."),
      onError: (e) =>
        toast.error(e instanceof Error ? e.message : "Failed to end stream"),
    });
  };

  const handleArchive = () => {
    if (!archiveUrl.trim()) {
      toast.error("Enter a video URL to save.");
      return;
    }
    archiveStream.mutate(
      { streamId: stream.id, videoUrl: archiveUrl },
      {
        onSuccess: () => {
          toast.success("Stream saved as video!");
          setArchiveOpen(false);
          setArchiveUrl("");
        },
        onError: (e) =>
          toast.error(e instanceof Error ? e.message : "Failed to archive"),
      },
    );
  };

  return (
    <Card className="border-border/60 bg-card">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Radio size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-display font-semibold text-sm text-foreground truncate">
                {stream.title}
              </p>
              <StatusBadge status={stream.status} />
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {stream.description || "No description"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {stream.status === LiveStreamStatus.scheduled && (
            <Button
              size="sm"
              onClick={handleGoLive}
              disabled={goLive.isPending}
              data-ocid="btn-go-live"
            >
              <Radio size={14} className="mr-1" />
              {goLive.isPending ? "Starting…" : "Go Live Now"}
            </Button>
          )}
          {stream.status === LiveStreamStatus.active && (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleEnd}
              disabled={endStream.isPending}
              data-ocid="btn-end-stream"
            >
              <Square size={14} className="mr-1" />
              {endStream.isPending ? "Ending…" : "End Stream"}
            </Button>
          )}
          {stream.status === LiveStreamStatus.ended && (
            <Dialog open={archiveOpen} onOpenChange={setArchiveOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="btn-archive-stream"
                >
                  <Video size={14} className="mr-1" />
                  Save as Video
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Stream as Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <Label htmlFor="archive-url">Video URL</Label>
                    <Input
                      id="archive-url"
                      placeholder="https://example.com/recording.mp4"
                      value={archiveUrl}
                      onChange={(e) => setArchiveUrl(e.target.value)}
                      data-ocid="input-archive-url"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of the recorded stream.
                    </p>
                  </div>
                  <Button
                    onClick={handleArchive}
                    disabled={archiveStream.isPending}
                    className="w-full"
                    data-ocid="btn-confirm-archive"
                  >
                    {archiveStream.isPending ? "Saving…" : "Save Video"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button size="sm" variant="ghost" asChild>
            <Link to="/live/$id" params={{ id: stream.id.toString() }}>
              View
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Go Live Form ─────────────────────────────────────────────────────────────

function GoLiveDialog() {
  const startLiveStream = useStartLiveStream();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    scheduledAt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    const schedTs = form.scheduledAt
      ? BigInt(new Date(form.scheduledAt).getTime()) * 1_000_000n
      : BigInt(Date.now()) * 1_000_000n;

    startLiveStream.mutate(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        scheduledAt: schedTs,
      },
      {
        onSuccess: () => {
          toast.success("Live stream created!");
          setOpen(false);
          setForm({ title: "", description: "", scheduledAt: "" });
        },
        onError: (e) =>
          toast.error(
            e instanceof Error ? e.message : "Failed to create stream",
          ),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-ocid="btn-open-go-live">
          <Radio size={16} className="mr-2" />
          Go Live
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Start a Live Stream
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="stream-title">Title *</Label>
            <Input
              id="stream-title"
              placeholder="Give your stream a title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              data-ocid="input-stream-title"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="stream-description">Description</Label>
            <Textarea
              id="stream-description"
              placeholder="What will you be streaming about?"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              data-ocid="input-stream-description"
              rows={3}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="stream-scheduled">Scheduled For (optional)</Label>
            <Input
              id="stream-scheduled"
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(e) =>
                setForm((f) => ({ ...f, scheduledAt: e.target.value }))
              }
              data-ocid="input-stream-scheduled"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to start immediately.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={startLiveStream.isPending}
            data-ocid="btn-submit-stream"
          >
            {startLiveStream.isPending ? "Creating…" : "Create Stream"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function LiveStreamSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LiveStreamPage() {
  const { data: streams, isLoading } = useActiveLiveStreams();
  const { user } = useCurrentUser();
  const isCreator = user?.role === UserRole.creator;

  const activeStreams =
    streams?.filter((s) => s.status === LiveStreamStatus.active) ?? [];
  const scheduledStreams =
    streams?.filter((s) => s.status === LiveStreamStatus.scheduled) ?? [];
  const myStreams =
    streams?.filter((s) => user && s.creatorId.toText() === user.id.toText()) ??
    [];

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="live-page"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Radio size={28} className="text-primary" />
            <h1 className="font-display font-bold text-3xl text-foreground">
              Live Streams
            </h1>
            {activeStreams.length > 0 && (
              <Badge className="bg-destructive text-destructive-foreground animate-pulse text-xs font-bold">
                {activeStreams.length} LIVE
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">
            Watch anointed creators broadcasting in real time on YHWH Corner.
          </p>
        </div>
        {isCreator && <GoLiveDialog />}
      </div>

      {/* Creator: My Streams Panel */}
      {isCreator && myStreams.length > 0 && (
        <section className="mb-10" data-ocid="creator-streams-section">
          <Card className="bg-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base text-foreground flex items-center gap-2">
                <Radio size={16} className="text-primary" />
                Your Streams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {myStreams.map((stream) => (
                <CreatorStreamRow key={stream.id.toString()} stream={stream} />
              ))}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Creator: empty own streams prompt */}
      {isCreator && !isLoading && myStreams.length === 0 && (
        <div
          className="mb-10 p-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-center gap-4"
          data-ocid="creator-empty-own"
        >
          <Radio size={36} className="text-primary/50 shrink-0" />
          <div>
            <p className="font-display font-semibold text-foreground text-sm">
              You have no live streams
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Go live to reach your audience and spread the word!
            </p>
          </div>
        </div>
      )}

      {/* Live Now */}
      {isLoading ? (
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            Live Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {["s1", "s2", "s3", "s4"].map((k) => (
              <LiveStreamSkeleton key={k} />
            ))}
          </div>
        </div>
      ) : activeStreams.length > 0 ? (
        <section className="mb-10" data-ocid="active-streams-section">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Live Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {activeStreams.map((stream, i) => (
              <motion.div
                key={stream.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
              >
                <LiveStreamCard stream={stream} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Scheduled */}
      {!isLoading && scheduledStreams.length > 0 && (
        <section className="mb-10" data-ocid="scheduled-streams-section">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-yellow-400" />
            Coming Up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {scheduledStreams.map((stream, i) => (
              <motion.div
                key={stream.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1, duration: 0.35 }}
              >
                <LiveStreamCard stream={stream} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state — no streams at all */}
      {!isLoading &&
        activeStreams.length === 0 &&
        scheduledStreams.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="live-empty"
          >
            <div className="w-20 h-20 rounded-full bg-muted/60 border border-border flex items-center justify-center mb-5">
              <Radio size={36} className="text-muted-foreground/40" />
            </div>
            <h2 className="font-display font-semibold text-xl text-foreground mb-2">
              No Live Streams Right Now
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              {isCreator
                ? "You have no live streams. Go live to reach your audience!"
                : "No creators are broadcasting at the moment. Check back soon!"}
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              {isCreator && <GoLiveDialog />}
              <Button asChild variant="outline">
                <Link to="/">Browse Videos</Link>
              </Button>
            </div>
          </motion.div>
        )}
    </div>
  );
}
