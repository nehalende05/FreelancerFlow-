import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal } from "lucide-react";

const projects = [
  { id: 1, name: "Landing Page Redesign", client: "Nova Labs", status: "In Progress", progress: 72, deadline: "Mar 22", budget: "$4,500" },
  { id: 2, name: "Mobile App UI", client: "FinEdge", status: "In Progress", progress: 45, deadline: "Apr 10", budget: "$8,200" },
  { id: 3, name: "Brand Guidelines", client: "CreativeX", status: "Review", progress: 90, deadline: "Mar 20", budget: "$2,800" },
  { id: 4, name: "E-commerce Checkout", client: "ShopFlow", status: "Done", progress: 100, deadline: "Mar 15", budget: "$6,100" },
  { id: 5, name: "Dashboard Analytics", client: "Acme Corp", status: "In Progress", progress: 30, deadline: "Apr 5", budget: "$5,400" },
  { id: 6, name: "API Documentation", client: "TechStart", status: "To Do", progress: 0, deadline: "Apr 15", budget: "$1,900" },
];

const statusColors: Record<string, string> = {
  "To Do": "bg-muted-foreground/20 text-muted-foreground",
  "In Progress": "bg-primary/20 text-primary",
  "Review": "bg-warning/20 text-warning",
  "Done": "bg-success/20 text-success",
};

const Projects = () => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage and track all your projects</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
          <Plus className="h-4 w-4" /> New Project
        </motion.button>
      </motion.div>

      {/* Search */}
      <div className="glass-card flex items-center gap-3 px-4 py-3 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Search projects..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {["Project", "Client", "Status", "Progress", "Deadline", "Budget", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-foreground">{p.name}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{p.client}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-[80px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground mono">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground mono">{p.deadline}</td>
                <td className="px-5 py-3.5 text-sm text-foreground mono">{p.budget}</td>
                <td className="px-5 py-3.5">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
