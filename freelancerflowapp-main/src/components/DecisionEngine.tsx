import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Target, AlertTriangle, Mail, 
  ChevronRight, ArrowUpRight, BrainCircuit 
} from "lucide-react";

interface Suggestion {
  id: string;
  type: "priority" | "warning" | "alert" | "info";
  message: string;
  icon: string;
  color: "violet" | "rose" | "amber" | "emerald";
}

const iconMap: Record<string, any> = {
  Target,
  AlertTriangle,
  Mail,
  Sparkles,
};

const colorMap: Record<string, string> = {
  violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20 shadow-violet-500/5",
  rose: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5",
  amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5",
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5",
};

export const DecisionEngine: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("/api/decision-engine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="glass-card-premium p-6 relative overflow-hidden group">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/5 blur-[100px] group-hover:bg-violet-500/10 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shadow-lg">
            <BrainCircuit className="h-5 w-5 text-violet-600 dark:text-violet-400 animate-pulse-glow" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
              AI Decision Engine
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Active Strategic Analysis</p>
          </div>
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group/btn">
          Full Report <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="space-y-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            [1, 2].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/[0.03] animate-pulse" />
            ))
          ) : (
            suggestions.map((s, idx) => {
              const Icon = iconMap[s.icon] || Sparkles;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group/item ${colorMap[s.color]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                          {s.type}
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs font-medium text-foreground leading-relaxed">
                        {s.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-3 rounded-xl bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-secondary dark:hover:bg-white/10 hover:text-foreground transition-all">
        Optimize Workflow
      </button>
    </div>
  );
};
