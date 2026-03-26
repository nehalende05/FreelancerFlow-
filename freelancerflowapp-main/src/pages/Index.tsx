import { DollarSign, FolderKanban, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { KanbanBoard } from "@/components/KanbanBoard";
import { RevenueChart } from "@/components/RevenueChart";
import { AICopilotInsights } from "@/components/AICopilotInsights";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { UserDropdown } from "@/components/UserDropdown";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] || "Guest";

  // Calculate Revenue Forecast
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    }
  });

  const forecastValue = (projects as any[])
    .filter(p => p.status !== 'Done')
    .reduce((sum, p) => {
      const budgetValue = typeof p.budget === 'string' 
        ? parseFloat(p.budget.replace(/[^0-9.]/g, '')) 
        : p.budget;
      return sum + (budgetValue || 0);
    }, 0);

  const formattedForecast = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(forecastValue);

  return (
    <div className="p-4 sm:p-6 min-h-screen overflow-y-auto bg-background text-foreground flex justify-center selection:bg-primary/10">
      <div className="glass-panel w-full max-w-[1400px] min-h-[calc(100vh-3rem)] p-6 md:p-10 flex flex-col relative my-4 sm:my-6 border dark:border-white/5">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-foreground mb-1.5">Good evening, {firstName}</h1>
            <p className="text-sm text-foreground/50 font-light tracking-wide italic leading-relaxed">Your freelance cockpit is fueled and ready.</p>
          </div>
        <div className="flex items-center gap-3">
          <UserDropdown position="bottom" />
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard icon={DollarSign} label="Monthly Revenue" value="$12,450" trend="+12.5%" trendUp delay={0} />
        <StatCard icon={FolderKanban} label="Active Projects" value="6" trend="On Track" trendUp delay={0.1} />
        <StatCard icon={Clock} label="Pending Payments" value="$3,200" trend="2 overdue" trendUp={false} delay={0.2} />
        <StatCard icon={TrendingUp} label="Revenue Forecast" value={formattedForecast} trend="In Pipeline" trendUp delay={0.3} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-8 glass-card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="stat-label">Revenue Growth</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Expenses</span>
              </div>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* AI Copilot Insights */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-4"
        >
          <AICopilotInsights />
        </motion.div>

        {/* Kanban Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-12 glass-card-premium overflow-hidden"
          style={{ height: 360 }}
        >
          <div className="px-6 pt-5 pb-2 flex items-center justify-between">
            <h3 className="stat-label">Project Pipeline</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Status: Optimal</span>
          </div>
          <KanbanBoard />
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
