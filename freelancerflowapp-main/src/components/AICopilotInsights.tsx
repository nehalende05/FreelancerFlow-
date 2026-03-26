import React from "react";
import { motion } from "framer-motion";

const insights = [
  {
    id: 1,
    color: "bg-amber-500",
    text: "CLIENT 'ACME CORP' HAS A 40% PROBABILITY OF LATE PAYMENT"
  },
  {
    id: 2,
    color: "bg-blue-500",
    text: "RECOMMENDED: DEEP WORK ON 'PROJECT PHOENIX' ON TUESDAY."
  },
  {
    id: 3,
    color: "bg-emerald-500",
    text: "REVENUE IS UP 12.5% VS LAST MONTH. KEEP IT UP!"
  },
  {
    id: 4,
    color: "bg-rose-500",
    text: "'NOVA LABS' DEADLINE IN 3 DAYS. PROGRESS: 72%."
  }
];

export const AICopilotInsights: React.FC = () => {
  return (
    <div className="glass-card-premium p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <h3 className="stat-label mb-0">AI COPILOT INSIGHTS</h3>
      </div>

      <div className="space-y-3 flex-1">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5, ease: "easeOut" }}
            className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3 transition-colors hover:bg-white/[0.04]"
          >
            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-sm ${insight.color}`} />
            <p className="text-[10px] sm:text-[11px] font-medium leading-relaxed uppercase tracking-widest text-foreground/80">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
