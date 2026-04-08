import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RewardCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  color?: "primary" | "accent" | "foreground";
  delay?: number;
}

export function RewardCard({
  icon,
  label,
  value,
  unit,
  color = "foreground",
  delay = 0,
}: RewardCardProps) {
  const colorClass =
    color === "primary"
      ? "text-primary"
      : color === "accent"
        ? "text-accent"
        : "text-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="bg-card border-border hover:border-primary/30 transition-smooth">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              {icon}
            </div>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
              {label}
            </span>
          </div>
          <p
            className={`font-display font-black text-3xl leading-none ${colorClass}`}
          >
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">{unit}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
