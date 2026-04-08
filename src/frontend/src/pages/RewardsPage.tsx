import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Gift,
  Play,
  Sparkles,
  TrendingUp,
  Trophy,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { RewardCard } from "../components/RewardCard";
import { RoleGuard } from "../components/RoleGuard";
import { useAuth } from "../hooks/useAuth";
import { useClaimDailyReward, useMyRewardSummary } from "../hooks/useQueries";
import { UserRole } from "../types";

function formatTokens(n: bigint) {
  return (Number(n) / 100).toFixed(2);
}

function formatWatchTime(seconds: bigint) {
  const s = Number(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

const HOW_IT_WORKS = [
  {
    icon: Play,
    title: "Watch Videos",
    desc: "Start watching any video on YHWH Corner. Your viewing time is tracked automatically.",
  },
  {
    icon: Clock,
    title: "Accumulate Hours",
    desc: "For every hour you watch, you earn 1% of the platform's daily revenue — distributed to all active viewers.",
  },
  {
    icon: Gift,
    title: "Claim Daily",
    desc: "Hit the Claim button to move your pending rewards into your balance. It resets every day.",
  },
  {
    icon: Wallet,
    title: "Cash Out",
    desc: "Your CS Token balance grows over time. Use it for premium features or withdraw to your wallet.",
  },
];

function RewardsDashboard() {
  const { data: summary, isLoading } = useMyRewardSummary();
  const claim = useClaimDailyReward();

  const handleClaim = async () => {
    try {
      await claim.mutateAsync();
      toast.success("🎉 Daily reward claimed!", {
        description: `${formatTokens(summary?.pendingReward ?? 0n)} CS Tokens added to your balance.`,
      });
    } catch {
      toast.error("Couldn't claim reward", {
        description:
          "You may have already claimed today, or need more watch time.",
      });
    }
  };

  const DAILY_GOAL_SECONDS = 3600n;
  const watchedSeconds = summary?.dailyWatchSeconds ?? 0n;
  const progress = Math.min(
    100,
    (Number(watchedSeconds) / Number(DAILY_GOAL_SECONDS)) * 100,
  );
  const goalReached = watchedSeconds >= DAILY_GOAL_SECONDS;
  const hasPending = (summary?.pendingReward ?? 0n) > 0n;

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading ? (
          [1, 2, 3].map((k) => <Skeleton key={k} className="h-32 rounded-xl" />)
        ) : (
          <>
            <RewardCard
              icon={<Trophy size={16} className="text-primary" />}
              label="Balance"
              value={formatTokens(summary?.balance ?? 0n)}
              unit="CS Tokens available"
              color="primary"
              delay={0}
            />
            <RewardCard
              icon={<Zap size={16} className="text-accent" />}
              label="Pending Today"
              value={formatTokens(summary?.pendingReward ?? 0n)}
              unit="Ready to claim"
              color="accent"
              delay={0.05}
            />
            <RewardCard
              icon={<TrendingUp size={16} className="text-foreground" />}
              label="Total Earned"
              value={formatTokens(summary?.totalEarned ?? 0n)}
              unit="Lifetime earnings"
              color="foreground"
              delay={0.1}
            />
          </>
        )}
      </div>

      {/* Daily goal tracker */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="bg-card border-border" data-ocid="daily-watch-goal">
          <CardHeader className="pb-3">
            <CardTitle className="font-display font-bold text-base flex items-center gap-2">
              <Clock size={16} className="text-accent" /> Today's Watch Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  formatWatchTime(watchedSeconds)
                )}{" "}
                watched
              </span>
              <span className="text-muted-foreground">1h goal</span>
            </div>

            <div className="relative">
              <Progress
                value={isLoading ? 0 : progress}
                className="h-3"
                data-ocid="watch-progress-bar"
              />
              {goalReached && !isLoading && (
                <div className="absolute right-0 -top-0.5 flex items-center gap-1 text-accent text-xs font-semibold">
                  <CheckCircle2 size={14} /> Goal reached!
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "15 min", pct: 25, reward: "0.25%" },
                { label: "30 min", pct: 50, reward: "0.50%" },
                { label: "1 hour", pct: 100, reward: "1.00%" },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className={`px-3 py-2 rounded-lg border text-xs transition-smooth ${
                    progress >= tier.pct
                      ? "bg-accent/10 border-accent/30 text-accent"
                      : "bg-muted/40 border-border text-muted-foreground"
                  }`}
                >
                  <div className="font-bold">{tier.reward}</div>
                  <div className="opacity-70">{tier.label}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Watch at least{" "}
              <span className="text-foreground font-semibold">1 hour</span>{" "}
              daily to earn your full 1% share of platform revenue. Progress
              resets at midnight.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Claim CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card
          className={`border transition-smooth ${
            hasPending
              ? "bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/30 shadow-elevated"
              : "bg-card border-border"
          }`}
          data-ocid="claim-reward-card"
        >
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Left: amount ring */}
              <div className="flex-shrink-0 relative">
                <div
                  className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center transition-smooth ${
                    hasPending
                      ? "border-primary/50 bg-primary/10"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <span
                    className={`font-display font-black text-lg leading-none ${hasPending ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {isLoading
                      ? "…"
                      : formatTokens(summary?.pendingReward ?? 0n)}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    CS tokens
                  </span>
                </div>
                {hasPending && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <Sparkles size={10} className="text-accent-foreground" />
                  </span>
                )}
              </div>

              {/* Right: copy + button */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display font-bold text-xl text-foreground">
                  {hasPending
                    ? "Your reward is ready!"
                    : "Keep watching to earn"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {hasPending
                    ? `You have ${formatTokens(summary?.pendingReward ?? 0n)} CS Tokens pending. Claim them now before they reset!`
                    : "Watch videos today to accumulate your 1% platform revenue share. Rewards are calculated hourly."}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    onClick={handleClaim}
                    disabled={claim.isPending || !hasPending}
                    size="lg"
                    className="gradient-magenta-cyan text-white border-0 font-display font-bold shadow-elevated"
                    data-ocid="claim-reward-btn"
                  >
                    <Gift size={16} className="mr-2" />
                    {claim.isPending
                      ? "Claiming…"
                      : hasPending
                        ? `Claim ${formatTokens(summary?.pendingReward ?? 0n)} Tokens`
                        : "Nothing to Claim Yet"}
                  </Button>
                  {!hasPending && (
                    <Link to="/">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-border/60 font-display font-semibold w-full"
                        data-ocid="go-watch-btn"
                      >
                        <Play size={14} className="mr-2" /> Go Watch Videos
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="mt-2">
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            How Viewer Rewards Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 p-4 bg-card border border-border rounded-xl"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        0{i + 1}
                      </span>
                      <p className="font-display font-semibold text-sm text-foreground">
                        {step.title}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RewardsPage() {
  const { isAuthenticated, login } = useAuth();

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="rewards-page"
    >
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 gradient-magenta-cyan rounded-2xl flex items-center justify-center shadow-card">
            <Trophy size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-foreground">
              Viewer Rewards
            </h1>
            <p className="text-sm text-muted-foreground">
              Earn 1% of platform revenue for every hour you watch — daily
            </p>
          </div>
        </div>
      </motion.div>

      {isAuthenticated ? (
        <RoleGuard
          allowedRoles={[UserRole.viewer]}
          fallback={
            <div
              className="text-center py-16 bg-card border border-border rounded-2xl"
              data-ocid="wrong-role-state"
            >
              <Trophy
                size={48}
                className="text-muted-foreground mx-auto mb-4 opacity-50"
              />
              <h2 className="font-display font-bold text-xl text-foreground">
                Viewer Account Required
              </h2>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Only viewer accounts earn platform rewards. Visit your profile
                to switch roles.
              </p>
            </div>
          }
        >
          <RewardsDashboard />
        </RoleGuard>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gradient-to-br from-primary/8 via-card to-accent/5 border border-primary/20 rounded-2xl"
          data-ocid="rewards-login-cta"
        >
          <div className="w-20 h-20 gradient-magenta-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-elevated">
            <Trophy size={32} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground">
            Watch. Earn. Repeat.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Sign in as a viewer to start earning{" "}
            <span className="text-accent font-semibold">
              1% of platform revenue
            </span>{" "}
            for every hour you watch daily. No investment needed — just watch
            the content you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              onClick={() => login()}
              size="lg"
              className="gradient-magenta-cyan text-white border-0 font-display font-bold shadow-elevated"
              data-ocid="rewards-login-btn"
            >
              <Play size={15} className="mr-2 fill-white" /> Sign In & Start
              Earning
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-center">
            {[
              { value: "1%", label: "Per hour watched" },
              { value: "Daily", label: "Reward cycles" },
              { value: "Free", label: "Always free to watch" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display font-black text-2xl text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
