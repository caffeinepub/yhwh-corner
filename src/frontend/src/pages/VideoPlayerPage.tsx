import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  Clock,
  ExternalLink,
  Eye,
  Flag,
  Heart,
  Play,
  Send,
  Share2,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { VideoCard } from "../components/VideoCard";
import { VideoPlayer } from "../components/VideoPlayer";
import { useAuth } from "../hooks/useAuth";
import {
  useActiveAds,
  useDeleteComment,
  useGetLikeCount,
  useHasLiked,
  useListComments,
  usePostComment,
  useRecordWatchTime,
  useRelatedVideos,
  useToggleLike,
  useVideo,
} from "../hooks/useQueries";
import type { AdPublic, CommentPublic } from "../types";

function SidebarAd({ ad }: { ad: AdPublic }) {
  return (
    <a
      href={ad.targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      data-ocid="sidebar-ad"
    >
      <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-primary/40 transition-smooth">
        {ad.logoUrl ? (
          <img
            src={ad.logoUrl}
            alt={ad.name}
            className="w-10 h-10 rounded-lg object-contain flex-shrink-0 bg-muted"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">{ad.name[0]}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {ad.name}
          </p>
          <p className="text-[10px] text-muted-foreground">Sponsored</p>
        </div>
        <ExternalLink
          size={11}
          className="text-muted-foreground flex-shrink-0"
        />
      </div>
    </a>
  );
}

function formatTimeAgo(ts: bigint): string {
  const diff = Date.now() - Number(ts);
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

interface CommentItemProps {
  comment: CommentPublic;
  videoCreatorId: string;
  currentUserId?: string;
  videoId: bigint;
}

function CommentItem({
  comment,
  videoCreatorId,
  currentUserId,
  videoId,
}: CommentItemProps) {
  const deleteComment = useDeleteComment();
  const canDelete =
    currentUserId &&
    (currentUserId === comment.authorId.toString() ||
      currentUserId === videoCreatorId);

  return (
    <div className="flex gap-3 group" data-ocid="comment-item">
      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary">
          {comment.authorName?.[0]?.toUpperCase() ?? "?"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-foreground">
            {comment.authorName ?? "Anonymous"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed break-words">
          {comment.text}
        </p>
      </div>
      {canDelete && (
        <button
          type="button"
          aria-label="Delete comment"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1 rounded"
          data-ocid="comment-delete"
          onClick={() =>
            deleteComment.mutate({ commentId: comment.id, videoId })
          }
          disabled={deleteComment.isPending}
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

interface CommentsProps {
  videoId: bigint;
  videoCreatorId: string;
  currentUserId?: string;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

function CommentsSection({
  videoId,
  videoCreatorId,
  currentUserId,
  isAuthenticated,
  onLoginClick,
}: CommentsProps) {
  const { data: comments, isLoading } = useListComments(videoId);
  const postComment = usePostComment();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    postComment.mutate(
      { videoId, text: trimmed },
      { onSuccess: () => setText("") },
    );
  };

  const visible = (comments ?? []).filter((c) => !c.isDeleted);

  return (
    <div className="space-y-5" data-ocid="comments-section">
      <h3 className="font-display font-bold text-base text-foreground flex items-center gap-2">
        Comments
        <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {visible.length}
        </span>
      </h3>

      {/* Comment input */}
      {isAuthenticated ? (
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-xs font-bold text-primary">You</span>
          </div>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Share your thoughts..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none text-sm bg-card border-border/60 focus:border-primary/60 min-h-[72px]"
              data-ocid="comment-input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                  handleSubmit();
              }}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                className="gradient-magenta-cyan text-white border-0 font-display font-semibold"
                onClick={handleSubmit}
                disabled={!text.trim() || postComment.isPending}
                data-ocid="comment-submit"
              >
                <Send size={12} className="mr-1.5" />
                {postComment.isPending ? "Posting…" : "Post"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-3 px-4 py-3 bg-card border border-border/50 rounded-xl"
          data-ocid="comment-login-prompt"
        >
          <p className="text-sm text-muted-foreground flex-1">
            Sign in to leave a comment.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/5 font-display font-semibold"
            onClick={onLoginClick}
          >
            Sign in
          </Button>
        </div>
      )}

      {/* Comment list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((k) => (
            <div key={k} className="flex gap-3">
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-8" data-ocid="comments-empty">
          <p className="text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {visible.map((comment) => (
            <CommentItem
              key={String(comment.id)}
              comment={comment}
              videoCreatorId={videoCreatorId}
              currentUserId={currentUserId}
              videoId={videoId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface LikeButtonProps {
  videoId: bigint;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

function LikeButton({
  videoId,
  isAuthenticated,
  onLoginClick,
}: LikeButtonProps) {
  const { data: likeCount = 0n } = useGetLikeCount(videoId);
  const { data: hasLiked = false } = useHasLiked(videoId);
  const toggleLike = useToggleLike();

  const handleClick = () => {
    if (!isAuthenticated) {
      onLoginClick();
      return;
    }
    toggleLike.mutate(videoId);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`border-border/60 gap-1.5 transition-smooth ${
        hasLiked
          ? "border-primary/60 text-primary bg-primary/5 hover:bg-primary/10"
          : "hover:border-primary/40 hover:text-primary"
      }`}
      onClick={handleClick}
      disabled={toggleLike.isPending}
      data-ocid="video-like"
      aria-label={hasLiked ? "Unlike video" : "Like video"}
    >
      <Heart
        size={13}
        className={hasLiked ? "fill-primary text-primary" : ""}
      />
      <span>{Number(likeCount).toLocaleString()}</span>
    </Button>
  );
}

interface RelatedVideosSidebarProps {
  videoId: bigint;
}

function RelatedVideosSidebar({ videoId }: RelatedVideosSidebarProps) {
  const { data: related, isLoading } = useRelatedVideos(videoId, 5n);

  return (
    <div data-ocid="related-videos">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 px-1">
        Related Videos
      </p>
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((k) => (
            <div key={k} className="space-y-2">
              <Skeleton className="aspect-video rounded-xl" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      ) : !related || related.length === 0 ? (
        <p
          className="text-sm text-muted-foreground text-center py-6"
          data-ocid="related-videos-empty"
        >
          No related videos found
        </p>
      ) : (
        <div className="space-y-4">
          {related.map((v, i) => (
            <VideoCard key={String(v.id)} video={v} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function VideoPlayerPage() {
  const { id } = useParams({ from: "/video/$id" });
  const videoId = BigInt(id);
  const { data: video, isLoading } = useVideo(videoId);
  const { data: allAds } = useActiveAds();
  const recordWatch = useRecordWatchTime();
  const { isAuthenticated, login, identity } = useAuth();
  const [linkCopied, setLinkCopied] = useState(false);
  const [reported, setReported] = useState(false);

  const currentUserId = identity?.getPrincipal().toString();

  const preRollAds =
    allAds?.filter((a) => a.slotType === "pre_roll" && a.isActive) ?? [];
  const sidebarAds =
    allAds?.filter((a) => a.slotType === "sidebar" && a.isActive) ?? [];
  const preRollAd = preRollAds[0] ?? null;

  const handleWatchTick = useCallback(
    (seconds: bigint) => {
      recordWatch.mutate({ videoId, seconds });
    },
    [videoId, recordWatch],
  );

  if (isLoading) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-ocid="video-player-loading"
      >
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="aspect-video rounded-2xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((k) => (
            <Skeleton key={k} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 text-center"
        data-ocid="video-not-found"
      >
        <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-6">
          <Play size={32} className="text-muted-foreground opacity-40 ml-1" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground">
          Video Not Found
        </h2>
        <p className="text-muted-foreground mt-2">
          This video may have been removed or is unavailable.
        </p>
        <Link to="/">
          <Button className="mt-6 gradient-magenta-cyan text-white border-0 font-display font-semibold">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-ocid="video-player-page"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <motion.div
          className="lg:col-span-2 space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Video Player */}
          <VideoPlayer
            video={video}
            preRollAd={preRollAd}
            onWatchTick={handleWatchTick}
          />

          {/* Title + meta */}
          <div>
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="font-display font-black text-xl sm:text-2xl text-foreground leading-tight flex-1 min-w-0">
                {video.title}
              </h1>
              {/* Like button */}
              <LikeButton
                videoId={videoId}
                isAuthenticated={isAuthenticated}
                onLoginClick={login}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Eye size={14} /> {Number(video.viewCount).toLocaleString()}{" "}
                  views
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />{" "}
                  {Math.round(Number(video.totalWatchSeconds) / 60)}m watched
                </span>
                {video.category && (
                  <Badge variant="secondary" className="text-xs">
                    {video.category}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/60 hover:border-primary/40"
                  data-ocid="video-share"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 3000);
                  }}
                >
                  <Share2 size={13} className="mr-1.5" />
                  {linkCopied ? "Link copied!" : "Share"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  data-ocid="video-flag"
                  aria-label="Report video"
                  onClick={() => setReported(true)}
                >
                  {reported ? (
                    <span className="text-xs text-muted-foreground">
                      Reported
                    </span>
                  ) : (
                    <Flag size={13} />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Tags */}
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs text-muted-foreground"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {video.description && (
            <Card className="bg-card border-border">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Viewer reward reminder */}
          <div className="flex items-center gap-3 px-4 py-3 bg-accent/5 border border-accent/20 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 animate-pulse" />
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-semibold">You're earning!</span>{" "}
              Watch time is tracked every 30 seconds. Claim your daily rewards
              on the{" "}
              <Link
                to="/rewards"
                className="underline underline-offset-2 hover:text-accent transition-colors"
              >
                Rewards dashboard
              </Link>
              .
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 pt-5">
            <CommentsSection
              videoId={videoId}
              videoCreatorId={video.creatorId.toString()}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              onLoginClick={login}
            />
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          className="space-y-6"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="video-sidebar"
        >
          {sidebarAds.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 px-1">
                Sponsored
              </p>
              <div className="space-y-2">
                {sidebarAds.slice(0, 4).map((ad) => (
                  <SidebarAd key={String(ad.id)} ad={ad} />
                ))}
              </div>
            </div>
          )}

          {/* Earn reminder card */}
          <Link to="/rewards">
            <div
              className="p-4 bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/25 rounded-xl cursor-pointer hover:border-primary/50 transition-smooth"
              data-ocid="sidebar-reward-cta"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 gradient-magenta-cyan rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">💎</span>
                </div>
                <span className="font-display font-bold text-sm text-foreground">
                  Earn While Watching
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every hour you watch earns you 1% of platform revenue. Check
                your rewards dashboard →
              </p>
            </div>
          </Link>

          {/* Related Videos */}
          <RelatedVideosSidebar videoId={videoId} />
        </motion.aside>
      </div>
    </div>
  );
}
