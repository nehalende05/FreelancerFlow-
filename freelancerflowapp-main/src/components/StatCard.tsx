import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  accentColor?: string;
  delay?: number;
}

export const StatCard = ({ label, value, trend, trendUp = true, icon: Icon, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card-premium p-6 group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="h-10 w-10 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center transition-colors group-hover:border-primary/20 dark:group-hover:border-white/20 group-hover:bg-secondary dark:group-hover:bg-white/10">
          <Icon className="h-4 w-4 text-foreground/40 group-hover:text-foreground transition-colors" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
            trendUp ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};
