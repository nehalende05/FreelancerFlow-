import { DollarSign, FolderKanban, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/StatCard";
import { InsightItem } from "@/components/InsightItem";
import { KanbanBoard } from "@/components/KanbanBoard";
import { RevenueChart } from "@/components/RevenueChart";
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
      const token = localStorage.getItem("ff_token");
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
    <div className="p-4 sm:p-6 min-h-screen overflow-y-auto bg-black text-white flex justify-center selection:bg-white/20">
      <div className="glass-panel w-full max-w-[1400px] min-h-[calc(100vh-3rem)] p-6 md:p-10 flex flex-col relative my-4 sm:my-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-1.5">Good evening, {firstName}</h1>
            <p className="text-sm text-white/40 font-light tracking-wide italic">Your freelance cockpit is fueled and ready.</p>
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
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Expenses</span>
              </div>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-4 glass-card-premium p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <h3 className="stat-label">AI Copilot Insights</h3>
          </div>

          <div className="space-y-3">
            <InsightItem type="warning" text="Client 'Acme Corp' has a 40% probability of late payment" delay={0.5} />
            <InsightItem type="suggest" text="Recommended: Deep work on 'Project Phoenix' on Tuesday." delay={0.6} />
            <InsightItem type="positive" text="Revenue is up 12.5% vs last month. Keep it up!" delay={0.7} />
            <InsightItem type="deadline" text="'Nova Labs' deadline in 3 days. Progress: 72%." delay={0.8} />
          </div>
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
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Status: Optimal</span>
          </div>
          <KanbanBoard />
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
