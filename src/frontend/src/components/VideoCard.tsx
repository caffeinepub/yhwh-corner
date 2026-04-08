import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Clock, Eye, Play } from "lucide-react";
import { motion } from "motion/react";
import type { VideoPublic } from "../types";

function formatViews(n: bigint): string {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

function formatTimeAgo(ts: bigint): string {
  const diff = Date.now() - Number(ts);
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

interface VideoCardProps {
  video: VideoPublic;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link
        to="/video/$id"
        params={{ id: video.id.toString() }}
        data-ocid="video-card"
        className="group block"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/30 mb-3">
          {video.thumbnailUrl ? (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary">
              <Play size={32} className="text-muted-foreground" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-smooth flex items-center justify-center">
            <div className="w-11 h-11 gradient-magenta-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-smooth shadow-elevated">
              <Play size={18} className="text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Category badge */}
          {video.category && (
            <div className="absolute top-2 left-2">
              <Badge
                variant="secondary"
                className="bg-black/60 text-white border-0 text-xs backdrop-blur-sm"
              >
                {video.category}
              </Badge>
            </div>
          )}
        </div>

        {/* Meta */}
        <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye size={11} />
            {formatViews(video.viewCount)} views
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {formatTimeAgo(video.createdAt)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
