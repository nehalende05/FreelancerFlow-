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
    <div className="p-6 h-screen overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track earnings, expenses, and profit</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            className="glass-card p-5"
          >
            <p className="stat-label">{s.label}</p>
            <p className="stat-value mt-1">{s.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs ${s.up ? "text-success" : "text-destructive"}`}>
              <s.icon className="h-3 w-3" /> {s.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-7 glass-card p-5"
        >
          <h3 className="stat-label mb-4">Monthly Breakdown</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={4}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(240, 5%, 55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(240, 6%, 10%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "hsl(0, 0%, 95%)" }} />
                <Bar dataKey="income" radius={[6, 6, 0, 0]} barSize={20}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill="hsl(263, 70%, 66%)" fillOpacity={0.8} />
                  ))}
                </Bar>
                <Bar dataKey="expense" radius={[6, 6, 0, 0]} barSize={20}>
                  {monthlyData.map((_, i) => (
                    <Cell key={i} fill="hsl(187, 92%, 55%)" fillOpacity={0.5} />
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
          className="lg:col-span-5 glass-card p-5"
        >
          <h3 className="stat-label mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center justify-between py-2 border-b border-border/20 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${t.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                    <ArrowUpRight className={`h-3.5 w-3.5 ${t.type === "income" ? "text-success" : "text-destructive rotate-180"}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{t.desc}</p>
                    <p className="text-[10px] text-muted-foreground">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium mono ${t.type === "income" ? "text-success" : "text-destructive"}`}>{t.amount}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Finance;
