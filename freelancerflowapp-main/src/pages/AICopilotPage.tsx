import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { useNavigate } from "react-router-dom";

const capabilities = [
  "Auto-generates smart task suggestions based on your workload",
  "Predicts which clients are likely to pay late",
  "Recommends optimal project deadlines using past data",
  "Answers questions about your freelance business",
  "Creates proposals and email drafts in seconds",
  "Weekly AI productivity summaries delivered to you",
];

const chatMessages = [
  { role: "user", text: "Which client is most likely to pay late this month?" },
  { role: "ai", text: "Based on past patterns, Acme Corp has a 62% chance of late payment. I recommend sending a reminder 5 days before due date." },
  { role: "user", text: "Suggest my priorities for tomorrow." },
  { role: "ai", text: "1. Finish Nova Labs homepage by 3pm  2. Send invoice to FinEdge  3. Review Brand Guidelines with CreativeX" },
];

const AICopilotPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10 selection:bg-white/20">
      <div className="glass-panel w-full max-w-[1400px] mx-auto min-h-[calc(100vh-5rem)] flex flex-col relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <PublicNav />

        <div className="flex-1 flex flex-col lg:flex-row items-center gap-16 px-6 md:px-16 py-20 relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-8">
              <Sparkles className="w-3 h-3" /> Intelligence Layer
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-8 leading-[1.1]">
              Your Smartest<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">Business Associate.</span>
            </h1>
            <p className="text-white/40 text-lg font-light mb-12 leading-relaxed">
              Freelancer Flow AI works behind the scenes—calculating risks, organizing priorities, and drafting your correspondence before you even ask.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-12">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 text-xs text-white/60 font-medium leading-normal tracking-tight">
                  <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                  </div>
                  {c}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate("/?signup=true")}
              className="btn-pill-primary group flex items-center gap-2"
            >
              Initialize AI Copilot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-1 w-full max-w-lg">
            <div className="glass-card-premium p-8 scale-105 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white tracking-tight block">FF-Intelligence</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400/80 tracking-widest flex items-center gap-1.5 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Neural Link
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[90%] px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed font-light ${
                      msg.role === "user"
                        ? "bg-white text-black font-medium"
                        : "bg-white/5 text-white/70 border border-white/10"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AICopilotPage;
