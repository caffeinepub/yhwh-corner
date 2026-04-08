import { c as createLucideIcon, j as jsxRuntimeExports, u as useAuth, T as Trophy, U as UserRole, B as Button, S as Skeleton, L as Link, m as ue } from "./index-CTQZhAh4.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-6fWLnLdt.js";
import { P as Progress } from "./progress-BinSFbMx.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { R as RoleGuard } from "./RoleGuard-BZRlzAls.js";
import { k as useMyRewardSummary, l as useClaimDailyReward } from "./useQueries-DZXfnpWg.js";
import { P as Play } from "./play-DlCJeKsF.js";
import { Z as Zap } from "./zap-BDlPREty.js";
import { T as TrendingUp } from "./trending-up-CiSVz-CC.js";
import { C as Clock } from "./clock-s95tjnS8.js";
import { C as CircleCheck, S as Sparkles } from "./sparkles-CAfT-A5v.js";
import { W as Wallet } from "./wallet-B2of_ByV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
function RewardCard({
  icon,
  label,
  value,
  unit,
  color = "foreground",
  delay = 0
}) {
  const colorClass = color === "primary" ? "text-primary" : color === "accent" ? "text-accent" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border hover:border-primary/30 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted flex items-center justify-center", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wide", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `font-display font-black text-3xl leading-none ${colorClass}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: unit })
      ] }) })
    }
  );
}
function formatTokens(n) {
  return (Number(n) / 100).toFixed(2);
}
function formatWatchTime(seconds) {
  const s = Number(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}
const HOW_IT_WORKS = [
  {
    icon: Play,
    title: "Watch Videos",
    desc: "Start watching any video on YHWH Corner. Your viewing time is tracked automatically."
  },
  {
    icon: Clock,
    title: "Accumulate Hours",
    desc: "For every hour you watch, you earn 1% of the platform's daily revenue — distributed to all active viewers."
  },
  {
    icon: Gift,
    title: "Claim Daily",
    desc: "Hit the Claim button to move your pending rewards into your balance. It resets every day."
  },
  {
    icon: Wallet,
    title: "Cash Out",
    desc: "Your CS Token balance grows over time. Use it for premium features or withdraw to your wallet."
  }
];
function RewardsDashboard() {
  const { data: summary, isLoading } = useMyRewardSummary();
  const claim = useClaimDailyReward();
  const handleClaim = async () => {
    try {
      await claim.mutateAsync();
      ue.success("🎉 Daily reward claimed!", {
        description: `${formatTokens((summary == null ? void 0 : summary.pendingReward) ?? 0n)} CS Tokens added to your balance.`
      });
    } catch {
      ue.error("Couldn't claim reward", {
        description: "You may have already claimed today, or need more watch time."
      });
    }
  };
  const DAILY_GOAL_SECONDS = 3600n;
  const watchedSeconds = (summary == null ? void 0 : summary.dailyWatchSeconds) ?? 0n;
  const progress = Math.min(
    100,
    Number(watchedSeconds) / Number(DAILY_GOAL_SECONDS) * 100
  );
  const goalReached = watchedSeconds >= DAILY_GOAL_SECONDS;
  const hasPending = ((summary == null ? void 0 : summary.pendingReward) ?? 0n) > 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: isLoading ? [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RewardCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, className: "text-primary" }),
          label: "Balance",
          value: formatTokens((summary == null ? void 0 : summary.balance) ?? 0n),
          unit: "CS Tokens available",
          color: "primary",
          delay: 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RewardCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-accent" }),
          label: "Pending Today",
          value: formatTokens((summary == null ? void 0 : summary.pendingReward) ?? 0n),
          unit: "Ready to claim",
          color: "accent",
          delay: 0.05
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RewardCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-foreground" }),
          label: "Total Earned",
          value: formatTokens((summary == null ? void 0 : summary.totalEarned) ?? 0n),
          unit: "Lifetime earnings",
          color: "foreground",
          delay: 0.1
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", "data-ocid": "daily-watch-goal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display font-bold text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-accent" }),
            " Today's Watch Progress"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-foreground font-semibold", children: [
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) : formatWatchTime(watchedSeconds),
                " ",
                "watched"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "1h goal" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Progress,
                {
                  value: isLoading ? 0 : progress,
                  className: "h-3",
                  "data-ocid": "watch-progress-bar"
                }
              ),
              goalReached && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 -top-0.5 flex items-center gap-1 text-accent text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
                " Goal reached!"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
              { label: "15 min", pct: 25, reward: "0.25%" },
              { label: "30 min", pct: 50, reward: "0.50%" },
              { label: "1 hour", pct: 100, reward: "1.00%" }
            ].map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `px-3 py-2 rounded-lg border text-xs transition-smooth ${progress >= tier.pct ? "bg-accent/10 border-accent/30 text-accent" : "bg-muted/40 border-border text-muted-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: tier.reward }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-70", children: tier.label })
                ]
              },
              tier.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Watch at least",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "1 hour" }),
              " ",
              "daily to earn your full 1% share of platform revenue. Progress resets at midnight."
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `border transition-smooth ${hasPending ? "bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/30 shadow-elevated" : "bg-card border-border"}`,
            "data-ocid": "claim-reward-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center transition-smooth ${hasPending ? "border-primary/50 bg-primary/10" : "border-border bg-muted/30"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `font-display font-black text-lg leading-none ${hasPending ? "text-primary" : "text-muted-foreground"}`,
                          children: isLoading ? "…" : formatTokens((summary == null ? void 0 : summary.pendingReward) ?? 0n)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground mt-0.5", children: "CS tokens" })
                    ]
                  }
                ),
                hasPending && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 10, className: "text-accent-foreground" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground", children: hasPending ? "Your reward is ready!" : "Keep watching to earn" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: hasPending ? `You have ${formatTokens((summary == null ? void 0 : summary.pendingReward) ?? 0n)} CS Tokens pending. Claim them now before they reset!` : "Watch videos today to accumulate your 1% platform revenue share. Rewards are calculated hourly." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleClaim,
                      disabled: claim.isPending || !hasPending,
                      size: "lg",
                      className: "gradient-magenta-cyan text-white border-0 font-display font-bold shadow-elevated",
                      "data-ocid": "claim-reward-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { size: 16, className: "mr-2" }),
                        claim.isPending ? "Claiming…" : hasPending ? `Claim ${formatTokens((summary == null ? void 0 : summary.pendingReward) ?? 0n)} Tokens` : "Nothing to Claim Yet"
                      ]
                    }
                  ),
                  !hasPending && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "lg",
                      className: "border-border/60 font-display font-semibold w-full",
                      "data-ocid": "go-watch-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 14, className: "mr-2" }),
                        " Go Watch Videos"
                      ]
                    }
                  ) })
                ] })
              ] })
            ] }) })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.25 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: "How Viewer Rewards Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-4 p-4 bg-card border border-border rounded-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground", children: [
                        "0",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: step.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.desc })
                  ] })
                ]
              },
              step.title
            );
          }) })
        ] })
      }
    )
  ] });
}
function RewardsPage() {
  const { isAuthenticated, login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10",
      "data-ocid": "rewards-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 gradient-magenta-cyan rounded-2xl flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 20, className: "text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl sm:text-3xl text-foreground", children: "Viewer Rewards" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Earn 1% of platform revenue for every hour you watch — daily" })
              ] })
            ] })
          }
        ),
        isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          RoleGuard,
          {
            allowedRoles: [UserRole.viewer],
            fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 bg-card border border-border rounded-2xl",
                "data-ocid": "wrong-role-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trophy,
                    {
                      size: 48,
                      className: "text-muted-foreground mx-auto mb-4 opacity-50"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Viewer Account Required" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-sm mx-auto", children: "Only viewer accounts earn platform rewards. Visit your profile to switch roles." })
                ]
              }
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RewardsDashboard, {})
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "text-center py-20 bg-gradient-to-br from-primary/8 via-card to-accent/5 border border-primary/20 rounded-2xl",
            "data-ocid": "rewards-login-cta",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 gradient-magenta-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 32, className: "text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Watch. Earn. Repeat." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed", children: [
                "Sign in as a viewer to start earning",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "1% of platform revenue" }),
                " ",
                "for every hour you watch daily. No investment needed — just watch the content you love."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3 justify-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => login(),
                  size: "lg",
                  className: "gradient-magenta-cyan text-white border-0 font-display font-bold shadow-elevated",
                  "data-ocid": "rewards-login-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 15, className: "mr-2 fill-white" }),
                    " Sign In & Start Earning"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-6 mt-8 text-center", children: [
                { value: "1%", label: "Per hour watched" },
                { value: "Daily", label: "Reward cycles" },
                { value: "Free", label: "Always free to watch" }
              ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-primary", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
              ] }, stat.label)) })
            ]
          }
        )
      ]
    }
  );
}
export {
  RewardsPage as default
};
