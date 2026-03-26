import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Star, AlertTriangle, CheckCircle, X, Trash2, Shield, Brain, TrendingDown, Info, BarChart2 } from "lucide-react";
import { ClientRiskModal } from "@/components/ClientRiskModal";

interface Client {
  id: number | string;
  name: string;
  email: string;
  projects: number;
  totalPaid: string;
  rating: string;
  lastContact: string;
  risk_score?: number;
  risk_level?: string;
  insight?: string;
  late_payments?: number;
  overdue_invoices?: number;
  avg_response_time_days?: number;
  completed_projects?: number;
}

const defaultClients: Client[] = [
  { id: 1, name: "Nova Labs", email: "hello@novalabs.io", projects: 3, totalPaid: "$18,400", rating: "good", lastContact: "2 days ago", risk_score: 0, risk_level: "Good", insight: "Clean payment history — reliable client", late_payments: 0, overdue_invoices: 0, avg_response_time_days: 1, completed_projects: 6 },
  { id: 2, name: "Acme Corp", email: "pm@acmecorp.com", projects: 2, totalPaid: "$9,200", rating: "risky", lastContact: "1 week ago", risk_score: 70, risk_level: "Risky", insight: "⚠ 3 late payments · 1 overdue invoice", late_payments: 3, overdue_invoices: 1, avg_response_time_days: 4, completed_projects: 2 },
  { id: 3, name: "FinEdge", email: "design@finedge.co", projects: 1, totalPaid: "$8,200", rating: "good", lastContact: "Yesterday", risk_score: 0, risk_level: "Good", insight: "Clean payment history — reliable client", late_payments: 0, overdue_invoices: 0, avg_response_time_days: 2, completed_projects: 3 },
  { id: 4, name: "CreativeX", email: "team@creativex.io", projects: 1, totalPaid: "$2,800", rating: "good", lastContact: "3 days ago", risk_score: 10, risk_level: "Good", insight: "Minor flags, but overall dependable", late_payments: 1, overdue_invoices: 0, avg_response_time_days: 1, completed_projects: 1 },
  { id: 5, name: "ShopFlow", email: "dev@shopflow.com", projects: 1, totalPaid: "$6,100", rating: "slow", lastContact: "5 days ago", risk_score: 50, risk_level: "Medium", insight: "Slow response time (~3 days)", late_payments: 2, overdue_invoices: 1, avg_response_time_days: 3, completed_projects: 1 },
  { id: 6, name: "TechStart", email: "cto@techstart.dev", projects: 1, totalPaid: "$1,900", rating: "good", lastContact: "Today", risk_score: 0, risk_level: "Good", insight: "Clean payment history — reliable client", late_payments: 0, overdue_invoices: 0, avg_response_time_days: 1, completed_projects: 1 },
];

const STORAGE_KEY = "ff_clients";

const riskConfig: Record<string, { icon: typeof Shield; color: string; bg: string; border: string; barColor: string }> = {
  Good: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    barColor: "from-emerald-500/60 to-emerald-400",
  },
  Medium: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    barColor: "from-amber-500/60 to-amber-400",
  },
  Risky: {
    icon: TrendingDown,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    barColor: "from-rose-500/60 to-rose-400",
  },
};

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultClients;
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const [hoveredRisk, setHoveredRisk] = useState<number | string | null>(null);
  const [riskModalClient, setRiskModalClient] = useState<{ id: string | number; name: string } | null>(null);

  // Fetch enriched clients from API (with risk scores)
  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("/api/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const apiClients = await res.json();
          setClients(apiClients);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(apiClients));
        }
      } catch (err) {
        // Fallback to localStorage if API unavailable
        console.error("API fetch failed, using local data:", err);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      projects: 0,
      totalPaid: "$0",
      rating: "good",
      lastContact: "Just now",
      risk_score: 0,
      risk_level: "Good",
      insight: "New client — no data yet",
      late_payments: 0,
      overdue_invoices: 0,
      avg_response_time_days: 0,
      completed_projects: 0,
    };
    setClients([newClient, ...clients]);
    setForm({ name: "", email: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number | string) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen overflow-y-auto selection:bg-white/20">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-white">Clients</h1>
          <p className="text-sm text-white/40 font-light mt-1 italic flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5 text-white/20" />
            AI-powered risk analysis for your network.
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="btn-pill-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Client
        </motion.button>
      </motion.div>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-pill w-full pl-11"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c, i) => {
          const riskLevel = c.risk_level || "Good";
          const riskScore = c.risk_score ?? 0;
          const insight = c.insight || "No risk data available";
          const risk = riskConfig[riskLevel] || riskConfig.Good;
          const RIcon = risk.icon;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card-premium p-6 group relative"
            >
              {/* Delete button */}
              <button
                onClick={() => handleDelete(c.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-white/10 text-white/30 hover:text-red-400 z-20"
                title="Delete client"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              {/* Header: Avatar + Risk Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lg font-bold text-white group-hover:border-white/20 transition-colors">
                  {c.name[0]}
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredRisk(c.id)}
                  onMouseLeave={() => setHoveredRisk(null)}
                >
                  <span className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${risk.color} ${risk.bg} border ${risk.border} cursor-help`}>
                    <RIcon className="h-3 w-3" /> {riskLevel}
                  </span>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredRisk === c.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 z-50 w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <Info className="h-3 w-3 text-white/30" />
                          <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">AI Risk Analysis</span>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed">
                          Based on payment history and response behavior
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Name & Email */}
              <h3 className="text-base font-semibold text-white tracking-tight">{c.name}</h3>
              <p className="text-xs text-white/40 mt-0.5 font-light italic">{c.email}</p>

              {/* AI Insight */}
              <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <Shield className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${risk.color}`} />
                <p className="text-[11px] text-white/40 leading-relaxed font-light">{insight}</p>
              </div>

              {/* Risk Score Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] text-white/20 uppercase font-bold tracking-[0.2em]">Risk Score</span>
                  <span className={`text-[11px] font-mono font-bold ${risk.color}`}>{riskScore}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                    transition={{ delay: i * 0.06 + 0.4, duration: 1.2, ease: "circOut" }}
                    className={`h-full bg-gradient-to-r ${risk.barColor} rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]`}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.15em] mb-1">Paid</p>
                  <p className="text-sm font-semibold text-white mono tracking-tighter">{c.totalPaid}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.15em] mb-1">Projects</p>
                  <p className="text-sm font-semibold text-white">{c.projects}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-white/20 uppercase font-bold tracking-[0.15em] mb-1">Contact</p>
                  <p className="text-[10px] text-white/40 italic mt-0.5">{c.lastContact}</p>
                </div>
              </div>
              {/* View Risk Details */}
              <button
                onClick={() => setRiskModalClient({ id: c.id, name: c.name })}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-white/10 hover:scale-[1.01] active:scale-95 ${risk.color}`}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                View Risk Details
              </button>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-sm text-white/20 italic">
            No clients found in current network.
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-[32px] p-8 shadow-2xl relative"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-white mb-1 tracking-tight">Add Client</h2>
                <p className="text-sm text-white/40 mb-2 font-light italic">Expand your network and project scope.</p>
                <p className="text-[10px] text-white/20 mb-8 flex items-center gap-1.5">
                  <Brain className="h-3 w-3" />
                  AI Risk Score will be calculated automatically
                </p>
                
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="stat-label">Client Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Nova Labs" className="input-pill w-full px-6" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="stat-label">Email Address</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="e.g. hello@client.com" className="input-pill w-full px-6" />
                  </div>
                  
                  <button type="submit" className="btn-pill-primary w-full mt-2">
                    Onboard Client
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      {/* Risk Details Modal */}
      <ClientRiskModal
        isOpen={!!riskModalClient}
        onClose={() => setRiskModalClient(null)}
        client={riskModalClient}
      />
    </AnimatePresence>
  </div>
  );
};

export default Clients;
