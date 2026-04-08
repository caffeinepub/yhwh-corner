import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  LayoutDashboard,
  Shield,
  TrendingUp,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import type {
  CreatorPayout,
  PlatformStats,
  ViewerRewardPayout,
} from "../backend.d";
import { ModerationPanel } from "../components/ModerationPanel";
import { PayoutsSection } from "../components/PayoutsSection";
import { PlatformSettings } from "../components/PlatformSettings";
import { RoleGuard } from "../components/RoleGuard";
import { StatCard } from "../components/StatCard";
import { useAuth } from "../hooks/useAuth";
import {
  useListAllCreatorPayouts,
  useListAllViewerRewardPayouts,
  usePlatformStats,
} from "../hooks/useQueries";
import { UserRole } from "../types";

function formatMoney(n: bigint): string {
  return `$${(Number(n) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatCount(n: bigint): string {
  return Number(n).toLocaleString();
}

// ─── Revenue Split Chart ──────────────────────────────────────────────────────

interface RevenueBarProps {
  label: string;
  value: number;
  total: number;
  colorClass: string;
  amount: string;
}

function RevenueBar({
  label,
  value,
  total,
  colorClass,
  amount,
}: RevenueBarProps) {
  const pct = total > 0 ? Math.max((value / total) * 100, 1) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-foreground font-semibold">
            {amount}
          </span>
          <Badge
            variant="secondary"
            className="font-mono text-xs px-1.5 py-0 h-5"
          >
            {pct.toFixed(1)}%
          </Badge>
        </div>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
}

function RevenueChart({ stats }: { stats: PlatformStats }) {
  const adRevenue = Number(stats.totalAdRevenue);
  const creatorPayouts = Number(stats.totalCreatorPayouts);
  const rewardsPaid = Number(stats.totalRewardsPaid);
  const platformRetained = Math.max(
    adRevenue - creatorPayouts - rewardsPaid,
    0,
  );

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-base font-bold text-foreground flex items-center gap-2">
          <TrendingUp size={16} className="text-accent" />
          Revenue Distribution
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Breakdown of total ad revenue allocation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RevenueBar
          label="Ad Revenue (Total)"
          value={adRevenue}
          total={adRevenue}
          colorClass="gradient-magenta-cyan"
          amount={formatMoney(stats.totalAdRevenue)}
        />
        <RevenueBar
          label="Creator Payouts (≥25%)"
          value={creatorPayouts}
          total={adRevenue}
          colorClass="bg-primary"
          amount={formatMoney(stats.totalCreatorPayouts)}
        />
        <RevenueBar
          label="Viewer Rewards (1%)"
          value={rewardsPaid}
          total={adRevenue}
          colorClass="bg-accent"
          amount={formatMoney(stats.totalRewardsPaid)}
        />
        <RevenueBar
          label="Platform Retained"
          value={platformRetained}
          total={adRevenue}
          colorClass="bg-secondary-foreground/40"
          amount={`$${(platformRetained / 100).toFixed(2)}`}
        />
      </CardContent>
    </Card>
  );
}

// ─── Stats Overview ───────────────────────────────────────────────────────────

function StatsOverview({
  stats,
  isLoading,
}: { stats: PlatformStats | null | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
          <Skeleton key={k} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  }

  const s = stats ?? {
    totalCreators: 0n,
    totalViewers: 0n,
    totalAdvertisers: 0n,
    totalAdmins: 0n,
    totalVideos: 0n,
    totalAdRevenue: 0n,
    totalRewardsPaid: 0n,
    totalCreatorPayouts: 0n,
    platformBalance: 0n,
  };

  const cards = [
    {
      label: "Total Creators",
      value: formatCount(s.totalCreators),
      icon: Users,
      accentClass: "text-primary",
      subtext: "Active creators",
    },
    {
      label: "Total Viewers",
      value: formatCount(s.totalViewers),
      icon: Users,
      accentClass: "text-accent",
      subtext: "Registered viewers",
    },
    {
      label: "Advertisers",
      value: formatCount(s.totalAdvertisers),
      icon: DollarSign,
      accentClass: "text-primary",
      subtext: "Active campaigns",
    },
    {
      label: "Total Videos",
      value: formatCount(s.totalVideos),
      icon: Video,
      accentClass: "text-foreground",
      subtext: "Published content",
    },
    {
      label: "Ad Revenue",
      value: formatMoney(s.totalAdRevenue),
      icon: TrendingUp,
      accentClass: "text-primary",
      subtext: "All-time earnings",
    },
    {
      label: "Creator Payouts",
      value: formatMoney(s.totalCreatorPayouts),
      icon: Wallet,
      accentClass: "text-primary",
      subtext: "≥25% revenue share",
    },
    {
      label: "Viewer Rewards",
      value: formatMoney(s.totalRewardsPaid),
      icon: DollarSign,
      accentClass: "text-accent",
      subtext: "1% per watch-hour",
    },
    {
      label: "Platform Balance",
      value: formatMoney(s.platformBalance),
      icon: Shield,
      accentClass: "text-foreground",
      subtext: "Net retained",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      data-ocid="platform-stats"
    >
      {cards.map((c, i) => (
        <StatCard
          key={c.label}
          label={c.label}
          value={c.value}
          subtext={c.subtext}
          icon={c.icon}
          accentClass={c.accentClass}
          index={i}
        />
      ))}
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: creatorPayouts = [], isLoading: creatorPayoutsLoading } =
    useListAllCreatorPayouts();
  const { data: viewerPayouts = [], isLoading: viewerPayoutsLoading } =
    useListAllViewerRewardPayouts();
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <LayoutDashboard size={15} className="text-muted-foreground" />
          <h2 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest">
            Platform Overview
          </h2>
        </div>
        <StatsOverview
          stats={stats as PlatformStats | null}
          isLoading={statsLoading}
        />
      </section>

      {/* Revenue Chart + Settings side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          {statsLoading ? (
            <Skeleton className="h-64 rounded-xl" />
          ) : stats ? (
            <RevenueChart stats={stats as PlatformStats} />
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center text-muted-foreground text-sm">
                No revenue data yet
              </CardContent>
            </Card>
          )}
        </section>
        <section>
          <PlatformSettings />
        </section>
      </div>

      {/* Payouts + Moderation Tabs */}
      <section>
        <Tabs defaultValue="payouts" data-ocid="admin-main-tabs">
          <TabsList className="bg-muted border border-border mb-5 h-9">
            <TabsTrigger
              value="payouts"
              className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground gap-1.5"
              data-ocid="tab-payouts"
            >
              <Wallet size={12} /> Payouts
            </TabsTrigger>
            <TabsTrigger
              value="moderation"
              className="text-xs data-[state=active]:bg-card data-[state=active]:text-foreground gap-1.5"
              data-ocid="tab-moderation"
            >
              <Shield size={12} /> Moderation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payouts" className="space-y-6">
            <PayoutsSection
              creatorPayouts={creatorPayouts as CreatorPayout[]}
              viewerPayouts={viewerPayouts as ViewerRewardPayout[]}
              creatorLoading={creatorPayoutsLoading}
              viewerLoading={viewerPayoutsLoading}
            />
          </TabsContent>

          <TabsContent value="moderation">
            <ModerationPanel />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPanelPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="admin-panel"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3.5 mb-1">
          <div className="w-11 h-11 gradient-magenta-cyan rounded-xl flex items-center justify-center shadow-elevated">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl text-foreground leading-none">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Full platform control, revenue management, and oversight
            </p>
          </div>
        </div>
      </motion.div>

      {isAuthenticated ? (
        <RoleGuard
          allowedRoles={[UserRole.admin]}
          fallback={
            <div className="text-center py-20 bg-card border border-border rounded-2xl">
              <Shield
                size={48}
                className="text-muted-foreground mx-auto mb-4 opacity-30"
              />
              <h2 className="font-display font-bold text-xl text-foreground">
                Admin Access Required
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                You don't have permission to access this area.
              </p>
            </div>
          }
        >
          <AdminDashboard />
        </RoleGuard>
      ) : (
        <div
          className="text-center py-20 bg-card border border-border rounded-2xl"
          data-ocid="admin-auth-required"
        >
          <Shield
            size={48}
            className="text-muted-foreground mx-auto mb-4 opacity-30"
          />
          <h2 className="font-display font-bold text-xl text-foreground">
            Sign In Required
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Admin access requires authentication.
          </p>
        </div>
      )}
    </div>
  );
}
