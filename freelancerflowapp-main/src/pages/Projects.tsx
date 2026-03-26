import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreHorizontal, X, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  deadline: string;
  budget: string;
}

const defaultProjects: Project[] = [
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

const STORAGE_KEY = "ff_projects";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", client: "", status: "To Do", deadline: "", budget: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      id: Date.now(),
      name: form.name,
      client: form.client,
      status: form.status,
      progress: form.status === "Done" ? 100 : 0,
      deadline: form.deadline,
      budget: form.budget.startsWith("$") ? form.budget : `$${form.budget}`,
    };
    setProjects([newProject, ...projects]);
    setForm({ name: "", client: "", status: "To Do", deadline: "", budget: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen overflow-y-auto selection:bg-white/20">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground font-light mt-1 italic">Real-time tracking of your active missions.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="btn-pill-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Project
        </motion.button>
      </motion.div>

      {/* Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-card-premium p-6 flex flex-col group relative overflow-hidden"
          >
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground font-light mt-1 italic tracking-wide">{p.client}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-rose-400 hover:border-rose-500/20 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                title="Archive Mission"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="stat-label uppercase !text-[9px]">Progress</span>
                <span className="text-xs font-mono text-white/40">{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  transition={{ delay: i * 0.05 + 0.3, duration: 1, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-zinc-500/30 via-zinc-500/60 to-zinc-500 rounded-full shadow-[0_0_8px_rgba(113,113,122,0.2)]"
                />
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
              <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                p.status === 'Done' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                p.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                p.status === 'Review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-white/5 text-white/40 border border-white/10'
              }`}>
                {p.status}
              </span>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1">Budget</p>
                <p className="text-sm font-semibold text-foreground mono tracking-tighter">{p.budget}</p>
              </div>
            </div>

            {/* Subtle bottom-right indicator */}
            <div className="absolute bottom-4 left-6 flex items-center gap-1.5">
               <div className="w-1 h-1 rounded-full bg-foreground/20" />
               <span className="text-[10px] font-mono italic text-muted-foreground/40">{p.deadline}</span>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center glass-card-premium">
            <p className="text-sm text-muted-foreground italic font-light">No active missions found in current sector.</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
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
              className="w-full max-w-md bg-black border border-white/10 rounded-[32px] p-8 shadow-2xl relative"
            >
              {/* Subtle mesh background for modal */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 p-2 text-muted-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all z-50 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-foreground mb-1 tracking-tight">New Project</h2>
                <p className="text-sm text-muted-foreground mb-8 font-light italic">Define the parameters of your next mission.</p>
                
                <form onSubmit={handleAdd} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="stat-label">Project Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Website Redesign" className="input-pill w-full px-6" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="stat-label">Client</label>
                    <input required value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="e.g. Acme Corp" className="input-pill w-full px-6" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="stat-label">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="input-pill w-full px-6 appearance-none"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="stat-label">Deadline</label>
                      <input value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} placeholder="e.g. Apr 30" className="input-pill w-full px-6" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="stat-label">Budget</label>
                    <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. $5,000" className="input-pill w-full px-6" />
                  </div>
                  
                  <button type="submit" className="btn-pill-primary w-full mt-2">
                    Initialize Project
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
