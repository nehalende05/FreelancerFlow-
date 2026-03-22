import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, TrendingUp, Clock } from "lucide-react";

type InsightType = "warning" | "suggest" | "positive" | "deadline";

interface InsightItemProps {
  type: InsightType;
  text: string;
  delay?: number;
}

const typeConfig: Record<InsightType, { icon: typeof AlertTriangle }> = {
  warning: { icon: AlertTriangle },
  suggest: { icon: Lightbulb },
  positive: { icon: TrendingUp },
  deadline: { icon: Clock },
};

const typeMarkers: Record<InsightType, string> = {
  warning: "bg-amber-500",
  suggest: "bg-blue-500",
  positive: "bg-emerald-500",
  deadline: "bg-rose-500",
};

export const InsightItem = ({ type, text, delay = 0 }: InsightItemProps) => {
  const Icon = typeConfig[type].icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.06] transition-all group"
    >
      <div className={`h-1.5 w-1.5 rounded-full ${typeMarkers[type]} mt-1.5 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
      <p className="text-xs text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors uppercase tracking-tight">{text}</p>
    </motion.div>
  );
};
