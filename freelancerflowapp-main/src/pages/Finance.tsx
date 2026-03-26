import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from "recharts";

const monthlyData = [
  { month: "Jan", income: 4200, expense: 1800 },
  { month: "Feb", income: 5800, expense: 2100 },
  { month: "Mar", income: 7200, expense: 2400 },
  { month: "Apr", income: 6100, expense: 1900 },
  { month: "May", income: 8900, expense: 2800 },
  { month: "Jun", income: 12450, expense: 3200 },
];

const transactions = [
  { id: 1, desc: "Nova Labs – Landing Page", amount: "+$4,500", type: "income", date: "Mar 18" },
  { id: 2, desc: "Figma Subscription", amount: "-$15", type: "expense", date: "Mar 17" },
  { id: 3, desc: "FinEdge – Mobile App Milestone 1", amount: "+$3,200", type: "income", date: "Mar 15" },
  { id: 4, desc: "Adobe Creative Suite", amount: "-$55", type: "expense", date: "Mar 14" },
  { id: 5, desc: "ShopFlow – E-commerce", amount: "+$6,100", type: "income", date: "Mar 12" },
];

const Finance = () => {
  const totalIncome = 44650;
  const totalExpense = 14200;
  const profit = totalIncome - totalExpense;

  return (
    <div className="p-6 h-screen overflow-y-auto selection:bg-white/20">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tighter text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground font-light mt-1 italic">Real-time health of your freelance operation.</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Income", value: `$${totalIncome.toLocaleString()}`, trend: "+12.5%", up: true, icon: TrendingUp },
          { label: "Total Expenses", value: `$${totalExpense.toLocaleString()}`, trend: "+8.2%", up: false, icon: TrendingDown },
          { label: "Net Profit", value: `$${profit.toLocaleString()}`, trend: "+15.1%", up: true, icon: DollarSign },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="glass-card-premium p-6 group"
          >
            <p className="stat-label mb-2">{s.label}</p>
            <p className="stat-value">{s.value}</p>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold mt-4 w-fit border ${
              s.up ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
            }`}>
              {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {s.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 glass-card-premium p-6"
        >
          <h3 className="stat-label mb-8">Mission Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <Tooltip 
                  cursor={{ fill: 'currentColor', opacity: 0.03 }}
                  contentStyle={{ 
                    background: "var(--popover)", 
                    backdropFilter: "blur(16px)",
                    border: "1px solid var(--border)", 
                    borderRadius: "16px", 
                    fontSize: "12px", 
                    color: "var(--foreground)" 
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                  labelStyle={{ color: "var(--muted-foreground)", fontWeight: "600", marginBottom: "4px" }}
                />
                <Bar dataKey="income" radius={[4, 4, 0, 0]} barSize={16}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill="currentColor" fillOpacity={0.9} className="text-foreground" />
                  ))}
                </Bar>
                <Bar dataKey="expense" radius={[4, 4, 0, 0]} barSize={16}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill="currentColor" fillOpacity={0.15} className="text-foreground" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 glass-card-premium p-6"
        >
          <h3 className="stat-label mb-8">Ledger History</h3>
          <div className="space-y-4">
            {transactions.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center justify-between py-1 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    t.type === "income" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"
                  }`}>
                    <ArrowUpRight className={`h-4 w-4 ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400 rotate-180"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{t.desc}</p>
                    <p className="text-[10px] text-muted-foreground/40 font-mono italic mt-0.5">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold mono tracking-tight ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{t.amount}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Finance;
