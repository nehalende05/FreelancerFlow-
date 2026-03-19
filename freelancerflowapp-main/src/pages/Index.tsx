import { DollarSign, FolderKanban, Clock, AlertTriangle, Zap } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { InsightItem } from "@/components/InsightItem";
import { KanbanBoard } from "@/components/KanbanBoard";
import { RevenueChart } from "@/components/RevenueChart";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good evening, Alex</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Here's your freelance cockpit overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
            A
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={DollarSign} label="Monthly Revenue" value="$12,450" trend="+12.5%" trendUp accentColor="from-primary to-accent" delay={0} />
        <StatCard icon={FolderKanban} label="Active Projects" value="6" trend="On Track" trendUp accentColor="from-accent to-primary" delay={0.1} />
        <StatCard icon={Clock} label="Pending Payments" value="$3,200" trend="2 overdue" trendUp={false} accentColor="from-warning to-destructive" delay={0.2} />
        <StatCard icon={Zap} label="Burnout Risk" value="Low" trend="Healthy" trendUp accentColor="from-success to-accent" delay={0.3} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-8">
          <RevenueChart />
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-4 glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 text-primary-foreground" />
            </div>
            <h3 className="stat-label">AI Copilot Insights</h3>
          </div>

          <div className="space-y-3">
            <InsightItem type="warning" text="Client 'Acme Corp' has a 40% probability of late payment based on historical patterns." delay={0.5} />
            <InsightItem type="suggest" text="You have a 4-hour gap on Tuesday. Recommended: Deep work on 'Project Phoenix'." delay={0.6} />
            <InsightItem type="positive" text="Revenue is up 12.5% vs last month. Keep the momentum going!" delay={0.7} />
            <InsightItem type="deadline" text="'Nova Labs' deadline is in 3 days. Current progress: 72%. You're on track." delay={0.8} />
          </div>
        </motion.div>

        {/* Kanban Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-12 glass-card overflow-hidden"
          style={{ height: 320 }}
        >
          <div className="px-5 pt-4 pb-2 flex items-center justify-between">
            <h3 className="stat-label">Project Pipeline</h3>
            <span className="text-[10px] text-muted-foreground/50">8 tasks across 4 stages</span>
          </div>
          <KanbanBoard />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
