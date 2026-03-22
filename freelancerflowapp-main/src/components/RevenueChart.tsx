import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 4200, expenses: 1800 },
  { month: "Feb", revenue: 5800, expenses: 2100 },
  { month: "Mar", revenue: 7200, expenses: 2400 },
  { month: "Apr", revenue: 6100, expenses: 1900 },
  { month: "May", revenue: 8900, expenses: 2800 },
  { month: "Jun", revenue: 12450, expenses: 3200 },
];

export const RevenueChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass-card p-5 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="stat-label">Revenue Overview</h3>
          <p className="text-xl font-bold text-foreground mt-1">$44,650</p>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">Expenses</span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(263, 70%, 66%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(187, 92%, 55%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(187, 92%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(240, 5%, 55%)" }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "rgba(12, 12, 12, 0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "white",
              }}
              itemStyle={{ color: "white" }}
              labelStyle={{ color: "rgba(255,255,255,0.5)", fontWeight: "600", marginBottom: "4px" }}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(263, 70%, 66%)" fill="url(#revGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" stroke="hsl(187, 92%, 55%)" fill="url(#expGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
