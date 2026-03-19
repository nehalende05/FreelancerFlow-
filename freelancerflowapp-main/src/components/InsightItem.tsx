import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, TrendingUp, Clock } from "lucide-react";

type InsightType = "warning" | "suggest" | "positive" | "deadline";

interface InsightItemProps {
  type: InsightType;
  text: string;
  delay?: number;
}

const typeConfig: Record<InsightType, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  suggest: { icon: Lightbulb, color: "text-accent", bg: "bg-accent/10" },
  positive: { icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
  deadline: { icon: Clock, color: "text-destructive", bg: "bg-destructive/10" },
};

export const InsightItem = ({ type, text, delay = 0 }: InsightItemProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
    >
      <div className={`h-7 w-7 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </motion.div>
  );
};
