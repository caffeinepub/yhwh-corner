import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Principal } from "@icp-sdk/core/principal";
import { Link } from "@tanstack/react-router";
import { Play, Radio, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { AdBanner } from "../components/AdBanner";
import { VideoCard } from "../components/VideoCard";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  useActiveAds,
  useActiveLiveStreams,
  usePublishedVideos,
  useRecommendedVideos,
  useTrendingVideos,
} from "../hooks/useQueries";
import { AdSlotType, VideoStatus } from "../types";
import type { LiveStreamPublic, VideoPublic } from "../types";

const fakePrincipal = (id: string) =>
  ({ toText: () => id }) as unknown as Principal;

const SAMPLE_VIDEOS: VideoPublic[] = [
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
    createdAt: BigInt(Date.now() - 86400000),
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
    createdAt: BigInt(Date.now() - 172800000),
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
    createdAt: BigInt(Date.now() - 259200000),
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
    createdAt: BigInt(Date.now() - 345600000),
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
    createdAt: BigInt(Date.now() - 432000000),
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
    createdAt: BigInt(Date.now() - 518400000),
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
    createdAt: BigInt(Date.now() - 604800000),
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
    createdAt: BigInt(Date.now() - 691200000),
  },
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
    endDate: BigInt(Date.now() + 30 * 86400000),
    isActive: true,
    totalCost: 500n,
    createdAt: BigInt(Date.now()),
  },
];

const stats = [
  { label: "Active Creators", value: "12,400+", icon: Zap },
  { label: "Videos Published", value: "48,700+", icon: Play },
  { label: "Viewer Rewards Paid", value: "$2.4M+", icon: TrendingUp },
  { label: "Platform Uptime", value: "99.9%", icon: Shield },
];

function LiveStreamCard({
  stream,
  index,
}: {
  stream: LiveStreamPublic;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="flex-shrink-0 w-64 sm:w-72"
    >
      <Link
        to="/live/$id"
        params={{ id: stream.id.toString() }}
        data-ocid="live-stream-card"
        className="group block"
      >
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-destructive/40 mb-2.5">
          {/* Placeholder gradient thumbnail */}
          <div className="w-full h-full bg-gradient-to-br from-destructive/20 via-primary/10 to-accent/10 flex items-center justify-center">
            <Radio size={32} className="text-destructive opacity-60" />
          </div>

          {/* LIVE badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive-foreground animate-pulse" />
            LIVE
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-smooth flex items-center justify-center">
            <div className="w-11 h-11 gradient-magenta-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-smooth shadow-elevated">
              <Play size={18} className="text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>

        <h3 className="font-display font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {stream.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span className="truncate">{stream.creatorName}</span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <Users size={10} />
            {Number(stream.viewerCount).toLocaleString()} watching
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const { isAuthenticated, login } = useAuth();
  const { user } = useCurrentUser();
  const { data: liveVideos, isLoading } = usePublishedVideos();
  const { data: activeAds = [] } = useActiveAds();
  const { data: liveStreams = [] } = useActiveLiveStreams();
  const { data: trendingVideos = [] } = useTrendingVideos(6n);
  const { data: recommendedVideos = [] } = useRecommendedVideos(6n);

  const videos =
    liveVideos && liveVideos.length > 0 ? liveVideos : SAMPLE_VIDEOS;
  const trending =
    trendingVideos.length > 0 ? trendingVideos : SAMPLE_VIDEOS.slice(0, 6);
  const ads = activeAds.length > 0 ? activeAds : SAMPLE_ADS;

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative bg-background overflow-hidden"
        data-ocid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/4 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-3 py-1 text-sm text-primary font-medium mb-6">
                <Zap size={12} className="fill-primary" />
                Creators earn 25%+ revenue share
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Where Every
                <br />
                <span className="text-gradient-magenta">Creator Wins</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                Upload. Earn. Thrive. YHWH Corner rewards creators with 25%
                revenue share, pays viewers for watching, and gives advertisers
                premium reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                {isAuthenticated && user ? (
                  <Link to="/creator">
                    <Button
                      size="lg"
                      className="gradient-magenta-cyan text-white border-0 font-display font-bold h-12 px-8"
                      data-ocid="hero-cta-creator"
                    >
                      <Play size={16} className="mr-2 fill-white" /> Go to
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => login()}
                    className="gradient-magenta-cyan text-white border-0 font-display font-bold h-12 px-8"
                    data-ocid="hero-cta-login"
                  >
                    <Play size={16} className="mr-2 fill-white" /> Start
                    Creating Free
                  </Button>
                )}
                <Link to="/rewards">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 font-display font-semibold border-border/60 hover:border-accent/60 hover:text-accent"
                    data-ocid="hero-cta-rewards"
                  >
                    <TrendingUp size={16} className="mr-2" /> Earn as Viewer
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-elevated bg-card aspect-video">
                <img
                  src="/assets/generated/hero-creator.dim_1200x675.jpg"
                  alt="Featured creator video"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 gradient-magenta-cyan rounded-full flex items-center justify-center shadow-elevated cursor-pointer hover:scale-110 transition-smooth">
                    <Play size={24} className="text-white fill-white ml-1.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-sm font-display font-semibold">
                    Makers &amp; Dreams: Inside the Studio
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    47.3K views · Featured Creator
                  </p>
                </div>
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  ● ON AIR
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-elevated"
              >
                <p className="text-xs text-muted-foreground">Creator earned</p>
                <p className="text-lg font-display font-bold text-primary">
                  $4,280
                </p>
                <p className="text-xs text-muted-foreground">this month</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-4 -right-4 bg-card border border-accent/40 rounded-xl px-4 py-3 shadow-elevated"
              >
                <p className="text-xs text-muted-foreground">Viewer reward</p>
                <p className="text-lg font-display font-bold text-accent">
                  1%/hr
                </p>
                <p className="text-xs text-muted-foreground">platform rev</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Homepage Banner Ads ───────────────────────────────────── */}
      <section
        className="bg-muted/20 border-y border-border/40"
        data-ocid="homepage-ads-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner ads={ads} slot="homepage_banner" />
        </div>
      </section>

      {/* ── Platform Stats ────────────────────────────────────────── */}
      <section
        className="bg-muted/30 border-b border-border/40"
        data-ocid="stats-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon size={16} className="text-primary" />
                    <span className="font-display font-black text-2xl text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Live Streams ──────────────────────────────────────────── */}
      {liveStreams.length > 0 && (
        <section
          className="bg-background border-b border-border/40 py-10"
          data-ocid="live-streams-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-destructive/15 border border-destructive/40 rounded-full px-2.5 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  <span className="text-xs font-bold text-destructive uppercase tracking-wide">
                    Live Now
                  </span>
                </div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  Active Streams
                </h2>
              </div>
              <Link
                to="/live"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all
              </Link>
            </div>
            <div
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
              data-ocid="live-streams-row"
            >
              {liveStreams.map((stream, i) => (
                <LiveStreamCard
                  key={stream.id.toString()}
                  stream={stream}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Trending Videos ───────────────────────────────────────── */}
      <section className="bg-background py-14" data-ocid="trending-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Main feed */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    Trending Now
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    The most-watched content this week
                  </p>
                </div>
                <Link to="/search" search={{ q: "" }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    View all
                  </Button>
                </Link>
              </div>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                data-ocid="trending-video-grid"
              >
                {trending.slice(0, 6).map((video, i) => (
                  <VideoCard
                    key={video.id.toString()}
                    video={video}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar ads — hidden on smaller screens */}
            {ads.filter((a) => a.isActive && a.slotType === AdSlotType.sidebar)
              .length > 0 && (
              <aside
                className="hidden xl:block w-56 flex-shrink-0"
                data-ocid="sidebar-ads"
              >
                <AdBanner ads={ads} slot="sidebar" />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ── Recommended For You (auth only) ──────────────────────── */}
      {isAuthenticated && (
        <section
          className="bg-muted/20 border-t border-border/40 py-14"
          data-ocid="recommended-section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Recommended For You
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Curated based on your viewing history
                </p>
              </div>
              <Link to="/search" search={{ q: "" }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Browse more
                </Button>
              </Link>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              data-ocid="recommended-video-grid"
            >
              {recommendedVideos.slice(0, 6).map((video, i) => (
                <VideoCard key={video.id.toString()} video={video} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All Videos + Sidebar Ads ──────────────────────────────── */}
      <section className="bg-background py-14" data-ocid="all-videos-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Main feed */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    Browse Videos
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Discover all content on YHWH Corner
                  </p>
                </div>
                <Link to="/search" search={{ q: "" }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    View all
                  </Button>
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((k) => (
                    <div key={k} className="space-y-3">
                      <Skeleton className="aspect-video rounded-xl" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : videos.length === 0 ? (
                <div
                  className="text-center py-20 text-muted-foreground"
                  data-ocid="videos-empty"
                >
                  <Play size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-display text-lg font-semibold">
                    No videos yet
                  </p>
                  <p className="text-sm mt-1">Be the first to upload content</p>
                  <Link to="/creator" className="mt-4 inline-block">
                    <Button
                      size="sm"
                      className="gradient-magenta-cyan text-white border-0 mt-4"
                    >
                      Start Creating
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
                  data-ocid="video-grid"
                >
                  {videos.map((video, i) => (
                    <VideoCard
                      key={video.id.toString()}
                      video={video}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar ads — hidden on smaller screens */}
            {ads.filter((a) => a.isActive && a.slotType === AdSlotType.sidebar)
              .length > 0 && (
              <aside
                className="hidden xl:block w-56 flex-shrink-0"
                data-ocid="sidebar-ads-browse"
              >
                <AdBanner ads={ads} slot="sidebar" />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ── Value Proposition ─────────────────────────────────────── */}
      <section
        className="bg-muted/20 border-t border-border/40 py-16"
        data-ocid="value-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-black text-3xl text-foreground">
              An Ecosystem Where{" "}
              <span className="text-gradient-magenta">Everyone Earns</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              The first platform where creators, viewers, and advertisers all
              share in the platform's success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "For Creators",
                subtitle: "25%+ revenue share",
                description:
                  "Upload your content for free. Earn a guaranteed minimum of 25% of all revenue generated by the viewers you attract.",
                cta: "Start Creating",
                href: "/creator",
                color: "primary",
              },
              {
                title: "For Viewers",
                subtitle: "1% per hour watched",
                description:
                  "Watch the content you love and earn 1% of total platform revenue for every hour of daily watch time. Rewards accumulate automatically.",
                cta: "Earn Rewards",
                href: "/rewards",
                color: "accent",
              },
              {
                title: "For Advertisers",
                subtitle: "Premium reach",
                description:
                  "Get unmatched visibility with engaged audiences. Homepage banners, pre-roll slots, and sidebar placements at premium rates.",
                cta: "Buy Airway Time",
                href: "/advertise",
                color: "primary",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-smooth shadow-card"
                data-ocid={`value-card-${item.title.toLowerCase().replace(/ /g, "-")}`}
              >
                <div
                  className={`text-sm font-semibold mb-1 ${item.color === "accent" ? "text-accent" : "text-primary"}`}
                >
                  {item.subtitle}
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {item.description}
                </p>
                <Link to={item.href as "/"}>
                  <Button
                    size="sm"
                    variant={item.color === "accent" ? "outline" : "default"}
                    className={
                      item.color === "accent"
                        ? "border-accent/50 text-accent hover:bg-accent/10"
                        : "gradient-magenta-cyan text-white border-0"
                    }
                  >
                    {item.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
