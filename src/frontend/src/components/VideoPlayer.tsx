import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AdPublic, VideoPublic } from "../types";
import { PreRollAd } from "./PreRollAd";

interface VideoPlayerProps {
  video: VideoPublic;
  preRollAd?: AdPublic | null;
  onWatchTick: (seconds: bigint) => void;
}

const TICK_INTERVAL_MS = 30_000;

export function VideoPlayer({
  video,
  preRollAd,
  onWatchTick,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [adDone, setAdDone] = useState(!preRollAd);
  const [isPlaying, setIsPlaying] = useState(false);
  const onWatchTickRef = useRef(onWatchTick);
  onWatchTickRef.current = onWatchTick;

  // 30-second tick
  const startTick = useCallback(() => {
    if (tickRef.current) return;
    tickRef.current = setInterval(() => {
      onWatchTickRef.current(30n);
    }, TICK_INTERVAL_MS);
  }, []);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTick();
  }, [stopTick]);

  const handlePlay = () => {
    setIsPlaying(true);
    startTick();
  };

  const handlePause = () => {
    setIsPlaying(false);
    stopTick();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    stopTick();
    // record remaining watch time
    if (videoRef.current) {
      const rem = Math.floor(videoRef.current.currentTime % 30);
      if (rem > 0) onWatchTickRef.current(BigInt(rem));
    }
  };

  const handleAdComplete = () => setAdDone(true);
  const handleAdSkip = () => setAdDone(true);

  return (
    <div
      className="relative aspect-video bg-background border border-border rounded-2xl overflow-hidden shadow-elevated"
      data-ocid="video-player-container"
    >
      {/* Pre-roll ad overlay */}
      {!adDone && preRollAd && (
        <PreRollAd
          ad={preRollAd}
          onComplete={handleAdComplete}
          onSkip={handleAdSkip}
        />
      )}

      {/* Video element */}
      {adDone && video.videoUrl && (
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          className="w-full h-full"
          poster={video.thumbnailUrl || undefined}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          data-ocid="video-element"
        >
          <track kind="captions" />
        </video>
      )}
      {adDone && !video.videoUrl && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-card">
          {video.thumbnailUrl && (
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="relative z-10 w-20 h-20 gradient-magenta-cyan rounded-full flex items-center justify-center shadow-elevated">
            <Play size={28} className="text-white fill-white ml-2" />
          </div>
          <p className="relative z-10 text-muted-foreground text-sm">
            Video coming soon
          </p>
        </div>
      )}

      {/* Playing indicator */}
      {adDone && isPlaying && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-background/70 backdrop-blur-sm rounded-full border border-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent">Earning rewards</span>
        </div>
      )}
    </div>
  );
}
