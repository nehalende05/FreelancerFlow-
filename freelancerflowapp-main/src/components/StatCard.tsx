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

export const StatCard = ({ label, value, trend, trendUp = true, icon: Icon, accentColor = "from-primary to-accent", delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="glass-card-hover p-5 relative overflow-hidden group"
    >
      {/* Accent glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${accentColor} opacity-[0.03] group-hover:opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-300`} />

      <div className="flex items-start justify-between mb-3">
        <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </div>
        )}
      </div>

      <p className="stat-value">{value}</p>
      <p className="stat-label mt-1">{label}</p>
    </motion.div>
  );
};
