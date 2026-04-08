import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AdPublic } from "../types";

interface PreRollAdProps {
  ad: AdPublic;
  onComplete: () => void;
  onSkip: () => void;
}

export function PreRollAd({ ad, onComplete, onSkip }: PreRollAdProps) {
  const COUNTDOWN = 15;
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN);
  const [canSkip, setCanSkip] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onComplete();
          return 0;
        }
        if (prev <= COUNTDOWN - 5) setCanSkip(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  const progress = ((COUNTDOWN - timeLeft) / COUNTDOWN) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-20 flex flex-col bg-background"
        data-ocid="pre-roll-ad"
      >
        {/* Ad banner */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8 text-center">
          {/* Ad badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-display font-semibold text-primary tracking-widest uppercase">
              Advertisement
            </span>
          </div>

          {/* Logo */}
          {ad.logoUrl ? (
            <img
              src={ad.logoUrl}
              alt={ad.name}
              className="h-16 w-auto object-contain rounded-lg"
            />
          ) : (
            <div className="h-16 w-32 bg-card border border-border rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-lg text-foreground truncate px-3">
                {ad.name}
              </span>
            </div>
          )}

          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              {ad.name}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm max-w-sm mx-auto">
              This video is sponsored by {ad.name}. Your watch time supports the
              creators you love.
            </p>
          </div>

          <a
            href={ad.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-foreground hover:border-primary/40 transition-smooth"
            data-ocid="pre-roll-visit"
          >
            Learn More <ExternalLink size={13} />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="p-4 bg-card border-t border-border">
          <Progress value={progress} className="h-1 mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              {timeLeft > 0 ? `Ad ends in ${timeLeft}s` : "Ad complete"}
            </span>
            <Button
              onClick={onSkip}
              disabled={!canSkip}
              size="sm"
              variant="ghost"
              className="text-xs font-semibold disabled:opacity-30 flex items-center gap-1.5"
              data-ocid="pre-roll-skip"
            >
              {canSkip ? (
                <>
                  Skip Ad <X size={12} />
                </>
              ) : (
                `Skip in ${5 - (COUNTDOWN - timeLeft)}s`
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
