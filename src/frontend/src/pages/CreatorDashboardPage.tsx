import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, DollarSign, Plus, TrendingUp, Video } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { EarningsTable } from "../components/EarningsTable";
import { RoleGuard } from "../components/RoleGuard";
import { VideoUploadForm } from "../components/VideoUploadForm";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  useMyCreatorEarnings,
  usePublishVideo,
  useUnpublishVideo,
  useVideosByCreator,
} from "../hooks/useQueries";
import { UserRole, VideoStatus } from "../types";

function formatCurrency(n: bigint) {
  return `$${(Number(n) / 100).toFixed(2)}`;
}

function formatHours(seconds: bigint) {
  const total = Number(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card
        className={`border ${
          accent
            ? "bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/30"
            : "bg-card border-border"
        }`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xs text-muted-foreground font-body uppercase tracking-wide flex items-center gap-2">
            {icon} {label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`font-display font-black text-3xl ${
              accent ? "text-primary" : "text-foreground"
            }`}
          >
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CreatorDashboard() {
  const { user } = useCurrentUser();
  const { data: earnings, isLoading: earningsLoading } = useMyCreatorEarnings();
  const { data: videos = [], isLoading: videosLoading } = useVideosByCreator(
    user?.id?.toText(),
  );
  const publish = usePublishVideo();
  const unpublish = useUnpublishVideo();
  const [uploadOpen, setUploadOpen] = useState(false);

  const totalWatchSeconds = videos.reduce(
    (acc, v) => acc + v.totalWatchSeconds,
    0n,
  );

  const handlePublish = async (id: bigint) => {
    try {
      await publish.mutateAsync(id);
      toast.success("Video published!", {
        description: "It's now visible to viewers.",
      });
    } catch {
      toast.error("Publish failed", { description: "Please try again." });
    }
  };

  const handleUnpublish = async (id: bigint) => {
    try {
      await unpublish.mutateAsync(id);
      toast.success("Video unpublished.");
    } catch {
      toast.error("Unpublish failed", { description: "Please try again." });
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign size={13} className="text-primary" />}
          label="Total Earned"
          value={
            earningsLoading
              ? "—"
              : formatCurrency(earnings?.totalEarnings ?? 0n)
          }
          sub="25%+ revenue share"
          accent
          delay={0}
        />
        <StatCard
          icon={<TrendingUp size={13} className="text-accent" />}
          label="Pending Payout"
          value={earningsLoading ? "—" : formatCurrency(0n)}
          sub="Next payout cycle"
          delay={0.05}
        />
        <StatCard
          icon={<Video size={13} className="text-muted-foreground" />}
          label="Total Videos"
          value={videosLoading ? "—" : String(videos.length)}
          sub={`${videos.filter((v) => v.status === VideoStatus.published).length} published`}
          delay={0.1}
        />
        <StatCard
          icon={<Clock size={13} className="text-muted-foreground" />}
          label="Watch Hours"
          value={videosLoading ? "—" : formatHours(totalWatchSeconds)}
          sub="Total viewer time"
          delay={0.15}
        />
      </div>

      {/* Videos & Earnings table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="font-display font-bold text-base">
                  Videos & Earnings
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sort by title, views, watch hours, or earnings
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => setUploadOpen(true)}
                className="gradient-magenta-cyan text-white border-0 font-display font-semibold shrink-0"
                data-ocid="upload-btn"
              >
                <Plus size={13} className="mr-1.5" /> New Video
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {videosLoading ? (
              <div className="p-4 space-y-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ) : videos.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 px-6 text-center"
                data-ocid="empty-videos"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Video size={28} className="text-primary opacity-70" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  No videos yet
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
                  Upload your first video to start earning revenue. Every view
                  counts toward your 25%+ revenue share.
                </p>
                <Button
                  onClick={() => setUploadOpen(true)}
                  className="mt-5 gradient-magenta-cyan text-white border-0 font-display font-semibold"
                  data-ocid="empty-upload-btn"
                >
                  <Plus size={14} className="mr-1.5" /> Upload First Video
                </Button>
              </div>
            ) : (
              <EarningsTable
                videos={videos}
                videoEarnings={[]}
                onPublish={handlePublish}
                onUnpublish={handleUnpublish}
                publishPending={publish.isPending}
                unpublishPending={unpublish.isPending}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Earnings breakdown note */}
      {!earningsLoading && (earnings?.totalEarnings ?? 0n) > 0n && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="p-4 rounded-xl bg-primary/8 border border-primary/20 flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <DollarSign size={14} className="text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-foreground">
              Revenue Share: {formatCurrency(earnings?.totalEarnings ?? 0n)}{" "}
              earned · pending payout tracked by platform
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You earn a minimum of 25% of all ad revenue generated by viewers
              you attract. Payouts are processed automatically.
            </p>
          </div>
        </motion.div>
      )}

      {/* Upload dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-lg">
              Upload New Video
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Your video will be saved as a draft until you publish it.
            </p>
          </DialogHeader>
          <VideoUploadForm
            onSuccess={() => setUploadOpen(false)}
            onCancel={() => setUploadOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function CreatorDashboardPage() {
  const { isAuthenticated, login } = useAuth();

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="creator-dashboard"
    >
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Video size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl text-foreground leading-tight">
              Creator Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage videos · Track earnings · Grow your audience
            </p>
          </div>
        </div>
      </motion.div>

      {isAuthenticated ? (
        <RoleGuard
          allowedRoles={[UserRole.creator]}
          fallback={
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                <Video size={28} className="text-muted-foreground opacity-60" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground">
                Creator Account Required
              </h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto text-sm">
                You need a creator account to access this dashboard. Register
                with the creator role to get started.
              </p>
            </div>
          }
        >
          <CreatorDashboard />
        </RoleGuard>
      ) : (
        <div className="text-center py-20 bg-card border border-border rounded-2xl">
          <div className="w-20 h-20 rounded-2xl gradient-magenta-cyan mx-auto mb-5 flex items-center justify-center shadow-elevated">
            <Video size={36} className="text-white" />
          </div>
          <h2 className="font-display font-black text-2xl text-foreground">
            Start Creating & Earning
          </h2>
          <p className="text-muted-foreground mt-2.5 max-w-md mx-auto">
            Sign in to upload videos, manage your content, and earn{" "}
            <span className="text-primary font-semibold">
              25%+ revenue share
            </span>{" "}
            from every viewer you attract.
          </p>
          <Button
            onClick={() => login()}
            className="mt-6 gradient-magenta-cyan text-white border-0 font-display font-bold px-8 h-11 text-base shadow-elevated"
            data-ocid="creator-login-btn"
          >
            Sign In to Create
          </Button>
        </div>
      )}
    </div>
  );
}
