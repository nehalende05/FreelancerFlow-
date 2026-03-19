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
    <div className="p-6 h-screen overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Time Tracking</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track time spent on each project</p>
      </motion.div>

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-6 text-center glow-border"
      >
        <p className="stat-label mb-4">Current Session</p>
        <motion.p
          key={seconds}
          className="text-5xl font-bold text-foreground mono tracking-wider"
        >
          {formatTime(seconds)}
        </motion.p>
        <p className="text-sm text-muted-foreground mt-2">Landing Page Redesign – Nova Labs</p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRunning(!isRunning)}
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
              isRunning
                ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSeconds(0); setIsRunning(false); }}
            className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border/30">
          <h3 className="stat-label">Recent Sessions</h3>
        </div>
        {timeEntries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center justify-between px-5 py-3.5 border-b border-border/20 last:border-0 hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{entry.project}</p>
                <p className="text-[10px] text-muted-foreground">{entry.client}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground mono">{entry.duration}</p>
              <p className="text-[10px] text-muted-foreground">{entry.date}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TimeTracking;
