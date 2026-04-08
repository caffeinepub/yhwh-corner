import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  accentClass?: string;
  index?: number;
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  accentClass = "text-primary",
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <Card className="bg-card border-border shadow-card hover:shadow-elevated transition-smooth group overflow-hidden relative">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-0.5 gradient-magenta-cyan" />
        </div>
        <CardContent className="pt-5 pb-4 px-5">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-9 h-9 rounded-lg bg-muted flex items-center justify-center ${accentClass}`}
            >
              <Icon size={17} />
            </div>
          </div>
          <p className="font-display font-black text-2xl text-foreground leading-none mb-1">
            {value}
          </p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            {label}
          </p>
          {subtext && (
            <p className="text-xs text-accent mt-0.5 font-medium">{subtext}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
