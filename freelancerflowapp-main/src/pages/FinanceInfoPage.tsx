import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, ArrowRight, CheckCircle } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Real-time revenue and expense tracking",
  "Visual income vs. expense charts",
  "Invoice generation with automated reminders",
  "Late payment risk prediction via AI",
  "Tax-ready financial reports for export",
  "Multi-currency support for global clients",
];

const FinanceInfoPage = () => {
  const navigate = useNavigate();
  return (
    <div className="dark">
      <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
        <div className="glass-panel w-full max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
          <PublicNav />

          <div className="flex-1 flex flex-col lg:flex-row items-center gap-16 px-6 md:px-12 py-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-6 font-sans">
                <DollarSign className="w-3 h-3" /> Smart Finance
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                Know Exactly Where<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Your Money Stands.</span>
              </h1>
              <p className="text-white/50 text-lg font-light mb-10 italic">
                No more guessing your monthly income. Freelancer Flow tracks every invoice, payment, and expense so your finances stay crystal clear.
              </p>
              <ul className="space-y-4 mb-10">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-white shrink-0" />{b}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/?signup=true")}
                className="group flex items-center gap-2 h-12 px-8 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
              >
                Track My Finances <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1 w-full max-w-lg space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Monthly Revenue", value: "$12,450", icon: TrendingUp, up: true },
                  { label: "Pending Invoices", value: "$3,200", icon: TrendingDown, up: false },
                  { label: "Expenses", value: "$1,650", icon: TrendingDown, up: false },
                  { label: "Net Profit", value: "$7,600", icon: TrendingUp, up: true },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <s.icon className={`w-4 h-4 ${s.up ? "text-green-400" : "text-red-400"}`} />
                    </div>
                    <p className="text-2xl font-semibold text-white">{s.value}</p>
                    <p className="text-xs text-white/40 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Recent Payments</p>
                {[
                  { client: "Acme Corp", amount: "+$2,500", status: "Paid" },
                  { client: "Nova Labs", amount: "+$1,800", status: "Paid" },
                  { client: "FinEdge", amount: "$900", status: "Pending" },
                ].map((t) => (
                  <div key={t.client} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-white">{t.client}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "Paid" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{t.status}</span>
                      <span className="text-sm font-medium text-white">{t.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceInfoPage;
