import { motion } from "framer-motion";
import { FolderKanban, CheckCircle, ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Visual Kanban board to drag and drop tasks",
  "Set milestones, deadlines, and reminders",
  "Track completion percentage per project",
  "Attach files and notes to any task",
  "Share project updates with clients",
  "Color-coded priority labels for urgency",
];

const ProjectsInfoPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="glass-panel w-full max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        <PublicNav />

        <div className="flex-1 flex flex-col lg:flex-row items-center gap-16 px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-6">
              <FolderKanban className="w-3 h-3" /> Project Management
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Your Projects.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                Always On Track.
              </span>
            </h1>
            <p className="text-white/50 text-lg font-light mb-10">
              Stop juggling spreadsheets and sticky notes. Freelancer Flow gives you a crystal-clear view of every project, deadline, and deliverable.
            </p>
            <ul className="space-y-4 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-white shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/?signup=true")}
              className="group flex items-center gap-2 h-12 px-8 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
            >
              Start Managing Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 rounded-full bg-white/30" />
                <span className="text-xs text-white/50 uppercase tracking-widest">Project Pipeline</span>
              </div>
              {[
                { name: "Website Redesign", client: "Acme Corp", progress: 75, status: "In Progress" },
                { name: "Mobile App UI", client: "FinEdge", progress: 40, status: "In Progress" },
                { name: "Brand Guidelines", client: "CreativeX", progress: 100, status: "Done" },
                { name: "SEO Audit", client: "Nova Labs", progress: 20, status: "To Do" },
              ].map((p) => (
                <div key={p.name} className="mb-5 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{p.name}</span>
                    <span className="text-xs text-white/40">{p.client}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-white/40">{p.status}</span>
                    <span className="text-[10px] text-white/60">{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsInfoPage;
