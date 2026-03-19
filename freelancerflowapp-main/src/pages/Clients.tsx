import { motion } from "framer-motion";
import { Plus, Search, Star, AlertTriangle, CheckCircle } from "lucide-react";

const clients = [
  { id: 1, name: "Nova Labs", email: "hello@novalabs.io", projects: 3, totalPaid: "$18,400", rating: "good", lastContact: "2 days ago" },
  { id: 2, name: "Acme Corp", email: "pm@acmecorp.com", projects: 2, totalPaid: "$9,200", rating: "risky", lastContact: "1 week ago" },
  { id: 3, name: "FinEdge", email: "design@finedge.co", projects: 1, totalPaid: "$8,200", rating: "good", lastContact: "Yesterday" },
  { id: 4, name: "CreativeX", email: "team@creativex.io", projects: 1, totalPaid: "$2,800", rating: "good", lastContact: "3 days ago" },
  { id: 5, name: "ShopFlow", email: "dev@shopflow.com", projects: 1, totalPaid: "$6,100", rating: "slow", lastContact: "5 days ago" },
  { id: 6, name: "TechStart", email: "cto@techstart.dev", projects: 1, totalPaid: "$1,900", rating: "good", lastContact: "Today" },
];

const ratingConfig: Record<string, { icon: typeof Star; label: string; color: string }> = {
  good: { icon: CheckCircle, label: "Good", color: "text-success bg-success/10" },
  risky: { icon: AlertTriangle, label: "Risky", color: "text-destructive bg-destructive/10" },
  slow: { icon: Star, label: "Slow Payer", color: "text-warning bg-warning/10" },
};

const Clients = () => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Your client relationships at a glance</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
          <Plus className="h-4 w-4" /> Add Client
        </motion.button>
      </motion.div>

      <div className="glass-card flex items-center gap-3 px-4 py-3 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Search clients..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c, i) => {
          const rating = ratingConfig[c.rating];
          const RIcon = rating.icon;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="glass-card-hover p-5 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-foreground">
                  {c.name[0]}
                </div>
                <span className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-medium ${rating.color}`}>
                  <RIcon className="h-3 w-3" /> {rating.label}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{c.email}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
                <div>
                  <p className="text-[10px] text-muted-foreground/60">Total Paid</p>
                  <p className="text-sm font-semibold text-foreground mono">{c.totalPaid}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground/60">Projects</p>
                  <p className="text-sm font-semibold text-foreground">{c.projects}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground/60">Last Contact</p>
                  <p className="text-xs text-muted-foreground">{c.lastContact}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Clients;
