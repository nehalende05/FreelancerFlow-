import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

const timeEntries = [
  { id: 1, project: "Landing Page Redesign", client: "Nova Labs", duration: "3h 24m", date: "Today" },
  { id: 2, project: "Mobile App UI", client: "FinEdge", duration: "2h 10m", date: "Today" },
  { id: 3, project: "Dashboard Analytics", client: "Acme Corp", duration: "1h 45m", date: "Yesterday" },
  { id: 4, project: "Brand Guidelines", client: "CreativeX", duration: "4h 12m", date: "Yesterday" },
  { id: 5, project: "E-commerce Checkout", client: "ShopFlow", duration: "5h 30m", date: "Mar 16" },
];

const TimeTracking = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = useCallback((s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className="p-6 h-screen overflow-y-auto selection:bg-white/20">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tighter text-foreground">Time Tracking</h1>
        <p className="text-sm text-muted-foreground font-light mt-1 italic">Precision tracking for high-performance deep work.</p>
      </motion.div>

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-premium p-10 mb-8 text-center relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <p className="stat-label mb-6">Active Mission Session</p>
        <motion.p
          key={seconds}
          className="text-6xl md:text-7xl font-semibold text-foreground mono tracking-tighter selection:bg-primary/10"
        >
          {formatTime(seconds)}
        </motion.p>
        <p className="text-sm text-muted-foreground mt-4 font-light italic tracking-wide">Landing Page Redesign &ndash; Nova Labs</p>

        <div className="flex items-center justify-center gap-6 mt-10">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsRunning(!isRunning)}
            className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
              isRunning
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
            }`}
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => { setSeconds(0); setIsRunning(false); }}
            className="h-16 w-16 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground/40 hover:text-foreground hover:border-primary/20 dark:hover:border-white/20 transition-all"
          >
            <RotateCcw className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card-premium overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
          <h3 className="stat-label">Mission History</h3>
        </div>
        <div className="divide-y divide-white/5">
          {timeEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center justify-between px-6 py-4.5 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center group-hover:border-primary/20 dark:group-hover:border-white/20 transition-colors">
                  <Clock className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground tracking-tight">{entry.project}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-light mt-0.5">{entry.client}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground mono tracking-tighter">{entry.duration}</p>
                <p className="text-[10px] text-muted-foreground/60 font-mono italic mt-0.5">{entry.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TimeTracking;
