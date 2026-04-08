import { j as jsxRuntimeExports, M as Megaphone, u as useAuth, a as useCurrentUser, V as VideoStatus, L as Link, B as Button, A as AdSlotType, S as Skeleton } from "./index-CTQZhAh4.js";
import { B as Badge } from "./badge-BrNiVfWZ.js";
import { E as ExternalLink } from "./external-link-DqMnhYYH.js";
import { V as VideoCard } from "./VideoCard-CRBsIjmN.js";
import { u as usePublishedVideos, a as useActiveAds, b as useActiveLiveStreams, c as useTrendingVideos, d as useRecommendedVideos } from "./useQueries-DZXfnpWg.js";
import { m as motion } from "./proxy-DbIMGeAH.js";
import { Z as Zap } from "./zap-BDlPREty.js";
import { P as Play } from "./play-DlCJeKsF.js";
import { T as TrendingUp } from "./trending-up-CiSVz-CC.js";
import { S as Shield } from "./shield-a4dKjOow.js";
import { R as Radio } from "./radio-Dzi7SKKB.js";
import { U as Users } from "./users-DkhBDunj.js";
import "./eye-BUtuzr9R.js";
import "./clock-s95tjnS8.js";
function HomepageBannerAd({ ad }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: ad.targetUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "data-ocid": "ad-banner-homepage",
      className: "group flex items-center gap-4 w-full bg-card border border-primary/20 rounded-xl px-5 py-3 hover:border-primary/50 transition-smooth shadow-card overflow-hidden relative",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-secondary overflow-hidden border border-border/40 flex items-center justify-center", children: ad.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ad.logoUrl,
              alt: ad.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 18, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs py-0 px-1.5 bg-primary/10 text-primary border-primary/20",
                children: "Sponsored"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground truncate", children: ad.name })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExternalLink,
          {
            size: 14,
            className: "flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors relative"
          }
        )
      ]
    }
  );
}
function SidebarAd({ ad }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: ad.targetUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "data-ocid": "ad-banner-sidebar",
      className: "group block bg-card border border-border/40 rounded-xl overflow-hidden hover:border-accent/40 transition-smooth shadow-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted flex items-center justify-center relative overflow-hidden", children: [
          ad.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ad.logoUrl,
              alt: ad.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-magenta-cyan w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 28, className: "text-white opacity-80" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs py-0 px-1.5 bg-black/60 text-white border-0",
              children: "Ad"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1", children: ad.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 }),
            " Visit sponsor"
          ] })
        ] })
      ]
    }
  );
}
function AdBanner({ ads, slot }) {
  const filtered = ads.filter((a) => a.isActive && a.slotType === slot);
  if (filtered.length === 0) return null;
  if (slot === "homepage_banner") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "ad-banner-zone", children: filtered.map((ad) => /* @__PURE__ */ jsxRuntimeExports.jsx(HomepageBannerAd, { ad }, ad.id.toString())) });
  }
  if (slot === "sidebar") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "ad-sidebar-zone", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Sponsored" }),
      filtered.map((ad) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarAd, { ad }, ad.id.toString()))
    ] });
  }
  return null;
}
const fakePrincipal = (id) => ({ toText: () => id });
const SAMPLE_VIDEOS = [
  {
    id: 1n,
    title: "Mastering Motion Graphics in 2026",
    description: "Deep dive into advanced motion design techniques",
    thumbnailUrl: "/assets/generated/thumb-motion.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("abc"),
    category: "Design",
    tags: ["motion", "design"],
    status: VideoStatus.published,
    viewCount: 42300n,
    totalWatchSeconds: 125400n,
    createdAt: BigInt(Date.now() - 864e5)
  },
  {
    id: 2n,
    title: "The Sound of Story | Sound Design Masterclass",
    description: "Professional sound design techniques for video creators",
    thumbnailUrl: "/assets/generated/thumb-sound.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("def"),
    category: "Audio",
    tags: ["sound", "audio"],
    status: VideoStatus.published,
    viewCount: 18700n,
    totalWatchSeconds: 54300n,
    createdAt: BigInt(Date.now() - 1728e5)
  },
  {
    id: 3n,
    title: "Building Worlds in VR | Creator Profile",
    description: "How indie creators are reshaping virtual reality experiences",
    thumbnailUrl: "/assets/generated/thumb-vr.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("ghi"),
    category: "VR",
    tags: ["vr", "immersive"],
    status: VideoStatus.published,
    viewCount: 31500n,
    totalWatchSeconds: 98200n,
    createdAt: BigInt(Date.now() - 2592e5)
  },
  {
    id: 4n,
    title: "From Concept to Screen: Maya Chen's Creative Process",
    description: "Award-winning director Maya Chen shares her workflow",
    thumbnailUrl: "/assets/generated/thumb-maya.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("jkl"),
    category: "Film",
    tags: ["film", "directing"],
    status: VideoStatus.published,
    viewCount: 55800n,
    totalWatchSeconds: 178900n,
    createdAt: BigInt(Date.now() - 3456e5)
  },
  {
    id: 5n,
    title: "3D Typography: Advanced Techniques for Brand Design",
    description: "Create stunning 3D lettering effects for your brand",
    thumbnailUrl: "/assets/generated/thumb-3d.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("mno"),
    category: "Design",
    tags: ["3d", "typography"],
    status: VideoStatus.published,
    viewCount: 12400n,
    totalWatchSeconds: 38700n,
    createdAt: BigInt(Date.now() - 432e6)
  },
  {
    id: 6n,
    title: "Podcast Production for Creators in 2026",
    description: "Everything you need to launch a top-ranking podcast",
    thumbnailUrl: "/assets/generated/thumb-podcast.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("pqr"),
    category: "Audio",
    tags: ["podcast", "audio"],
    status: VideoStatus.published,
    viewCount: 9200n,
    totalWatchSeconds: 29400n,
    createdAt: BigInt(Date.now() - 5184e5)
  },
  {
    id: 7n,
    title: "AI Tools Every Creator Needs Right Now",
    description: "Boost your workflow with the best AI creative tools",
    thumbnailUrl: "/assets/generated/thumb-ai.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("stu"),
    category: "Tech",
    tags: ["ai", "tools"],
    status: VideoStatus.published,
    viewCount: 27800n,
    totalWatchSeconds: 84300n,
    createdAt: BigInt(Date.now() - 6048e5)
  },
  {
    id: 8n,
    title: "Color Grading Cinematic Footage Like a Pro",
    description: "Professional color workflows from DaVinci Resolve experts",
    thumbnailUrl: "/assets/generated/thumb-colorgrade.jpg",
    videoUrl: "",
    creatorId: fakePrincipal("vwx"),
    category: "Film",
    tags: ["color", "grading"],
    status: VideoStatus.published,
    viewCount: 34100n,
    totalWatchSeconds: 102600n,
    createdAt: BigInt(Date.now() - 6912e5)
  }
];
const SAMPLE_ADS = [
  {
    id: 1n,
    advertiserId: fakePrincipal("ad1"),
    name: "Luminary Creative Suite — Build Faster",
    logoUrl: "",
    targetUrl: "https://example.com",
    slotType: AdSlotType.homepage_banner,
    durationDays: 30n,
    startDate: BigInt(Date.now()),
    endDate: BigInt(Date.now() + 30 * 864e5),
    isActive: true,
    totalCost: 500n,
    createdAt: BigInt(Date.now())
  }
];
const stats = [
  { label: "Active Creators", value: "12,400+", icon: Zap },
  { label: "Videos Published", value: "48,700+", icon: Play },
  { label: "Viewer Rewards Paid", value: "$2.4M+", icon: TrendingUp },
  { label: "Platform Uptime", value: "99.9%", icon: Shield }
];
function LiveStreamCard({
  stream,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.07 },
      className: "flex-shrink-0 w-64 sm:w-72",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/live/$id",
          params: { id: stream.id.toString() },
          "data-ocid": "live-stream-card",
          className: "group block",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video rounded-xl overflow-hidden bg-muted border border-destructive/40 mb-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-destructive/20 via-primary/10 to-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 32, className: "text-destructive opacity-60" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex items-center gap-1.5 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-destructive-foreground animate-pulse" }),
                "LIVE"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-smooth flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 gradient-magenta-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-smooth shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18, className: "text-white fill-white ml-0.5" }) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors", children: stream.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: stream.creatorName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 10 }),
                Number(stream.viewerCount).toLocaleString(),
                " watching"
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function HomePage() {
  const { isAuthenticated, login } = useAuth();
  const { user } = useCurrentUser();
  const { data: liveVideos, isLoading } = usePublishedVideos();
  const { data: activeAds = [] } = useActiveAds();
  const { data: liveStreams = [] } = useActiveLiveStreams();
  const { data: trendingVideos = [] } = useTrendingVideos(6n);
  const { data: recommendedVideos = [] } = useRecommendedVideos(6n);
  const videos = liveVideos && liveVideos.length > 0 ? liveVideos : SAMPLE_VIDEOS;
  const trending = trendingVideos.length > 0 ? trendingVideos : SAMPLE_VIDEOS.slice(0, 6);
  const ads = activeAds.length > 0 ? activeAds : SAMPLE_ADS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative bg-background overflow-hidden",
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/4 to-transparent pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-3 py-1 text-sm text-primary font-medium mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "fill-primary" }),
                    "Creators earn 25%+ revenue share"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight", children: [
                    "Where Every",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-magenta", children: "Creator Wins" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground max-w-lg", children: "Upload. Earn. Thrive. YHWH Corner rewards creators with 25% revenue share, pays viewers for watching, and gives advertisers premium reach." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8", children: [
                    isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/creator", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        className: "gradient-magenta-cyan text-white border-0 font-display font-bold h-12 px-8",
                        "data-ocid": "hero-cta-creator",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, className: "mr-2 fill-white" }),
                          " Go to Dashboard"
                        ]
                      }
                    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        onClick: () => login(),
                        className: "gradient-magenta-cyan text-white border-0 font-display font-bold h-12 px-8",
                        "data-ocid": "hero-cta-login",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, className: "mr-2 fill-white" }),
                          " Start Creating Free"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rewards", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "lg",
                        className: "h-12 px-8 font-display font-semibold border-border/60 hover:border-accent/60 hover:text-accent",
                        "data-ocid": "hero-cta-rewards",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "mr-2" }),
                          " Earn as Viewer"
                        ]
                      }
                    ) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-primary/30 shadow-elevated bg-card aspect-video", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/assets/generated/hero-creator.dim_1200x675.jpg",
                        alt: "Featured creator video",
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.target.style.display = "none";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 gradient-magenta-cyan rounded-full flex items-center justify-center shadow-elevated cursor-pointer hover:scale-110 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 24, className: "text-white fill-white ml-1.5" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-display font-semibold", children: "Makers & Dreams: Inside the Studio" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-0.5", children: "47.3K views · Featured Creator" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full", children: "● ON AIR" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.5 },
                      className: "absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-elevated",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Creator earned" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-primary", children: "$4,280" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "this month" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.6 },
                      className: "absolute -top-4 -right-4 bg-card border border-accent/40 rounded-xl px-4 py-3 shadow-elevated",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Viewer reward" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-accent", children: "1%/hr" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "platform rev" })
                      ]
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/20 border-y border-border/40",
        "data-ocid": "homepage-ads-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { ads, slot: "homepage_banner" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-b border-border/40",
        "data-ocid": "stats-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, i) => {
          const Icon = stat.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              className: "text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl text-foreground", children: stat.value })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
              ]
            },
            stat.label
          );
        }) }) })
      }
    ),
    liveStreams.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background border-b border-border/40 py-10",
        "data-ocid": "live-streams-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-destructive/15 border border-destructive/40 rounded-full px-2.5 py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-destructive uppercase tracking-wide", children: "Live Now" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Active Streams" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/live",
                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                children: "View all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-4 overflow-x-auto pb-2 scrollbar-thin",
              "data-ocid": "live-streams-row",
              children: liveStreams.map((stream, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LiveStreamCard,
                {
                  stream,
                  index: i
                },
                stream.id.toString()
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "trending-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Trending Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "The most-watched content this week" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: { q: "" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground hover:text-foreground",
              children: "View all"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
            "data-ocid": "trending-video-grid",
            children: trending.slice(0, 6).map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoCard,
              {
                video,
                index: i
              },
              video.id.toString()
            ))
          }
        )
      ] }),
      ads.filter((a) => a.isActive && a.slotType === AdSlotType.sidebar).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden xl:block w-56 flex-shrink-0",
          "data-ocid": "sidebar-ads",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { ads, slot: "sidebar" })
        }
      )
    ] }) }) }),
    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/20 border-t border-border/40 py-14",
        "data-ocid": "recommended-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Recommended For You" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Curated based on your viewing history" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: { q: "" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground hover:text-foreground",
                children: "Browse more"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5",
              "data-ocid": "recommended-video-grid",
              children: recommendedVideos.slice(0, 6).map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCard, { video, index: i }, video.id.toString()))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", "data-ocid": "all-videos-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Browse Videos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Discover all content on YHWH Corner" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", search: { q: "" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-muted-foreground hover:text-foreground",
              children: "View all"
            }
          ) })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] }, k)) }) : videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-20 text-muted-foreground",
            "data-ocid": "videos-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 48, className: "mx-auto mb-4 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No videos yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Be the first to upload content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/creator", className: "mt-4 inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "gradient-magenta-cyan text-white border-0 mt-4",
                  children: "Start Creating"
                }
              ) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5",
            "data-ocid": "video-grid",
            children: videos.map((video, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoCard,
              {
                video,
                index: i
              },
              video.id.toString()
            ))
          }
        )
      ] }),
      ads.filter((a) => a.isActive && a.slotType === AdSlotType.sidebar).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden xl:block w-56 flex-shrink-0",
          "data-ocid": "sidebar-ads-browse",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdBanner, { ads, slot: "sidebar" })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/20 border-t border-border/40 py-16",
        "data-ocid": "value-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-3xl text-foreground", children: [
                  "An Ecosystem Where",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-magenta", children: "Everyone Earns" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: "The first platform where creators, viewers, and advertisers all share in the platform's success." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            {
              title: "For Creators",
              subtitle: "25%+ revenue share",
              description: "Upload your content for free. Earn a guaranteed minimum of 25% of all revenue generated by the viewers you attract.",
              cta: "Start Creating",
              href: "/creator",
              color: "primary"
            },
            {
              title: "For Viewers",
              subtitle: "1% per hour watched",
              description: "Watch the content you love and earn 1% of total platform revenue for every hour of daily watch time. Rewards accumulate automatically.",
              cta: "Earn Rewards",
              href: "/rewards",
              color: "accent"
            },
            {
              title: "For Advertisers",
              subtitle: "Premium reach",
              description: "Get unmatched visibility with engaged audiences. Homepage banners, pre-roll slots, and sidebar placements at premium rates.",
              cta: "Buy Airway Time",
              href: "/advertise",
              color: "primary"
            }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-smooth shadow-card",
              "data-ocid": `value-card-${item.title.toLowerCase().replace(/ /g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `text-sm font-semibold mb-1 ${item.color === "accent" ? "text-accent" : "text-primary"}`,
                    children: item.subtitle
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: item.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.href, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: item.color === "accent" ? "outline" : "default",
                    className: item.color === "accent" ? "border-accent/50 text-accent hover:bg-accent/10" : "gradient-magenta-cyan text-white border-0",
                    children: item.cta
                  }
                ) })
              ]
            },
            item.title
          )) })
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
