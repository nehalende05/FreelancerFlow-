import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Shield, CheckCircle, AlertTriangle, TrendingDown, Loader2, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface RiskDetails {
  risk_score: number;
  risk_level: "Good" | "Medium" | "Risky";
  reasons: string[];
  timeline: { date: string; risk: number }[];
  suggestion: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  client: { id: string | number; name: string } | null;
}

// ─── Config ──────────────────────────────────────────────────────────────────
const cfg = {
  Good:   { Icon: CheckCircle,   text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", chart: "#10b981" },
  Medium: { Icon: AlertTriangle, text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   chart: "#f59e0b" },
  Risky:  { Icon: TrendingDown,  text: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    chart: "#f43f5e" },
} as const;

// ─── Component ───────────────────────────────────────────────────────────────
export const ClientRiskModal: React.FC<Props> = ({ isOpen, onClose, client }) => {
  const [details, setDetails] = useState<RiskDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !client) return;
    setDetails(null);
    setLoading(true);
    const token = localStorage.getItem("ff_token");
    fetch(`/api/clients/${client.id}/risk-details`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.risk_score !== undefined) setDetails(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isOpen, client]);

  if (!client) return null;

  const level = details?.risk_level ?? "Good";
  const { Icon, text, bg, border, chart } = cfg[level] ?? cfg.Good;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] bg-card/95 backdrop-blur-2xl border border-white/10 p-0 overflow-hidden rounded-[28px]">
        <div className="p-7">
          {/* Header */}
          <DialogHeader className="mb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-base font-bold text-foreground">
                {client.name[0]}
              </div>
              <div>
                <DialogTitle className="text-lg font-bold tracking-tight text-foreground">
                  {client.name}
                </DialogTitle>
                <DialogDescription className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  AI Risk Analysis
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <Loader2 className="h-7 w-7 animate-spin text-white/20" />
              <p className="text-[11px] text-muted-foreground italic">Analysing risk factors…</p>
            </div>
          ) : details ? (
            <div className="space-y-5">

              {/* Score + Level */}
              <div className="flex gap-3">
                <div className={`flex-1 rounded-2xl ${bg} border ${border} p-4 flex items-center gap-3`}>
                  <Icon className={`h-5 w-5 shrink-0 ${text}`} />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Level</p>
                    <p className={`text-base font-bold ${text}`}>{details.risk_level}</p>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Risk Score</p>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-2xl font-bold tracking-tighter ${text}`}>{details.risk_score}</span>
                    <span className="text-xs text-muted-foreground mb-0.5">/100</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${details.risk_score}%` }}
                      transition={{ duration: 1.1, ease: "circOut" }}
                      className="h-full rounded-full"
                      style={{ background: chart }}
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Chart */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  6-Month Risk Trend
                </p>
                <ResponsiveContainer width="100%" height={110}>
                  <AreaChart data={details.timeline} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={chart} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={chart} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#666", opacity: 0.7 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "#666", opacity: 0.7 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "11px", color: "hsl(var(--foreground))" }}
                      formatter={(v: number) => [`${v}%`, "Risk"]}
                    />
                    <Area type="monotone" dataKey="risk" stroke={chart} strokeWidth={2} fill="url(#rg)" dot={false} animationDuration={1200} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Reasons */}
              {details.reasons.length > 0 && (
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Risk Factors</p>
                  <ul className="space-y-2">
                    {details.reasons.slice(0, 4).map((r, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-2 text-[12px] text-foreground/80"
                      >
                        <Shield className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${text}`} />
                        {r}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Action */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`rounded-2xl border p-4 ${bg} ${border}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className={`h-3.5 w-3.5 ${text}`} />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Suggested Action</p>
                </div>
                <p className={`text-[12px] font-medium leading-relaxed ${text}`}>
                  {details.suggestion}
                </p>
              </motion.div>

            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic text-center py-12">No data available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
