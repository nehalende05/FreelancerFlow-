import { motion } from "framer-motion";
import { FolderKanban, Users, DollarSign, Sparkles, Clock, FileText, BarChart2, Shield } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";

const features = [
  { icon: FolderKanban, title: "Project Management", desc: "Create projects, assign deadlines, track milestones, and never miss a delivery date again." },
  { icon: Users, title: "Client Management", desc: "Maintain a full client database with contact history, notes, and payment records." },
  { icon: DollarSign, title: "Smart Finance", desc: "Real-time earnings overview, expense tracking, and profit/loss dashboard." },
  { icon: Sparkles, title: "AI Copilot", desc: "Let AI suggest your next tasks, predict payment delays, and generate proposals." },
  { icon: Clock, title: "Time Tracking", desc: "Log billable hours per project and generate time-based invoices automatically." },
  { icon: FileText, title: "Invoicing", desc: "Professional invoice generation with client branding, due dates, and PDF export." },
  { icon: BarChart2, title: "Analytics", desc: "Visual reports on revenue, top clients, project health, and productivity trends." },
  { icon: Shield, title: "Secure & Private", desc: "All your data is encrypted and stored securely. Your business stays yours." },
];

const FeaturesPage = () => (
  <div className="dark">
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="glass-panel w-full max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        <PublicNav />

        <div className="flex-1 px-6 md:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-6 font-sans">
              Everything Included
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              All the Features You Need
            </h1>
            <p className="text-white/50 text-lg font-light italic">
              Freelancer Flow comes packed with every tool a modern freelancer needs — no extra plugins, no complexity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturesPage;
