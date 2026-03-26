import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ArrowRight, Eye, EyeOff, User, Triangle, Hexagon, Circle,
  Sparkles, FolderKanban, Users, DollarSign, X, CheckCircle, TrendingUp, TrendingDown, BarChart2, Clock, FileText, AlertTriangle, Shield
} from "lucide-react";
import Logo from "../components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

/* ─────────────── Constellation Node ─────────────── */
const ConstellationNode = ({ x, y, label, value, icon: Icon, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 1 }}
    className="absolute flex items-center gap-2 text-white/70"
    style={{ left: x, top: y }}
  >
    <div className="flex flex-col items-end text-right">
      <span className="text-xs font-semibold text-white/70">{label}</span>
      <span className="text-[10px] text-white/40">{value}</span>
    </div>
    <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <Icon className="w-3 h-3 text-white" />
      <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white" style={{ animationDuration: '3s' }} />
    </div>
  </motion.div>
);

/* ─────────────── Panel Contents ─────────────── */
const featuresData = [
  { icon: FolderKanban, title: "Project Management", desc: "Kanban boards, deadlines, progress tracking, and milestone planning — all in one place." },
  { icon: Users, title: "Client Management", desc: "Full client profiles with contact history, notes, and payment records." },
  { icon: DollarSign, title: "Smart Finance", desc: "Real-time revenue, expense tracking, and profit/loss dashboard." },
  { icon: Sparkles, title: "AI Copilot", desc: "Smart suggestions, task planning, payment risk prediction, and proposal generation." },
  { icon: Clock, title: "Time Tracking", desc: "Log billable hours per project and generate time-based invoices automatically." },
  { icon: FileText, title: "Invoicing", desc: "Professional invoices with automated reminders and PDF export." },
  { icon: BarChart2, title: "Analytics", desc: "Visual reports on revenue, top clients, project health, and productivity." },
  { icon: Shield, title: "Secure & Private", desc: "All your data is encrypted. Your business stays yours." },
];

const FeaturesPanel = ({ onSignUp }: { onSignUp: () => void }) => (
  <div className="p-6 md:p-10 h-full overflow-y-auto">
    <h2 className="text-3xl font-semibold text-white mb-2">All Features</h2>
    <p className="text-white/50 mb-8">Everything included. No extra plugins.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {featuresData.map((f, i) => (
        <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <f.icon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
          <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
    <div className="mt-10 text-center">
      <button onClick={onSignUp} className="h-11 px-8 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all">
        Get Started Free →
      </button>
    </div>
  </div>
);

const ProjectsPanel = ({ onSignUp }: { onSignUp: () => void }) => (
  <div className="p-6 md:p-10 h-full overflow-y-auto">
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <div className="flex-1">
        <h2 className="text-3xl font-semibold text-white mb-2">Project Management</h2>
        <p className="text-white/50 mb-6">Stop juggling spreadsheets. Get a crystal-clear view of every project, deadline, and deliverable.</p>
        <ul className="space-y-3 mb-8">
          {["Visual Kanban board with drag & drop", "Set milestones and reminders", "Track completion percentage", "Attach files and notes to tasks", "Color-coded priority labels"].map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-white/70">
              <CheckCircle className="w-4 h-4 text-white shrink-0" />{b}
            </li>
          ))}
        </ul>
        <button onClick={onSignUp} className="h-11 px-8 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all">Start Managing Projects →</button>
      </div>
      <div className="flex-1 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Project Pipeline</p>
        {[
          { name: "Website Redesign", client: "Acme Corp", progress: 75 },
          { name: "Mobile App UI", client: "FinEdge", progress: 40 },
          { name: "Brand Guidelines", client: "CreativeX", progress: 100 },
          { name: "SEO Audit", client: "Nova Labs", progress: 20 },
        ].map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-white">{p.name}</span>
              <span className="text-xs text-white/40">{p.client}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${p.progress}%` }} />
            </div>
            <span className="text-[10px] text-white/40">{p.progress}% complete</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FinancePanel = ({ onSignUp }: { onSignUp: () => void }) => (
  <div className="p-6 md:p-10 h-full overflow-y-auto">
    <div className="flex flex-col lg:flex-row gap-10 items-start">
      <div className="flex-1">
        <h2 className="text-3xl font-semibold text-white mb-2">Smart Finance</h2>
        <p className="text-white/50 mb-6">Know exactly where your money stands — every invoice, payment, and expense tracked in real time.</p>
        <ul className="space-y-3 mb-8">
          {["Real-time revenue & expense tracking", "Visual income vs. expense charts", "Invoice generation with reminders", "Late payment risk AI prediction", "Tax-ready financial reports", "Multi-currency support"].map((b) => (
            <li key={b} className="flex items-center gap-3 text-sm text-white/70">
              <CheckCircle className="w-4 h-4 text-white shrink-0" />{b}
            </li>
          ))}
        </ul>
        <button onClick={onSignUp} className="h-11 px-8 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all">Track My Finances →</button>
      </div>
      <div className="flex-1 w-full max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Monthly Revenue", value: "$12,450", icon: TrendingUp, up: true },
            { label: "Pending Invoices", value: "$3,200", icon: TrendingDown, up: false },
            { label: "Expenses", value: "$1,650", icon: TrendingDown, up: false },
            { label: "Net Profit", value: "$7,600", icon: TrendingUp, up: true },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <s.icon className={`w-4 h-4 mb-2 ${s.up ? "text-emerald-500" : "text-rose-500"}`} />
              <p className="text-xl font-semibold text-white">{s.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Recent Payments</p>
          {[{ client: "Acme Corp", amount: "+$2,500", paid: true }, { client: "Nova Labs", amount: "+$1,800", paid: true }, { client: "FinEdge", amount: "$900", paid: false }].map((t) => (
            <div key={t.client} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-sm text-white">{t.client}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.paid ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{t.paid ? "Paid" : "Pending"}</span>
                <span className="text-sm font-medium text-white">{t.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AICopilotPanel = ({ onSignUp }: { onSignUp: () => void }) => {
  const chatMessages = [
    { role: "user", text: "Which client is most likely to pay late this month?" },
    { role: "ai", text: "Based on past patterns, Acme Corp has a 62% chance of late payment. I recommend sending a reminder 5 days before due date." },
    { role: "user", text: "Suggest my priorities for tomorrow." },
    { role: "ai", text: "1. Finish Nova Labs homepage by 3pm\n2. Send invoice to FinEdge\n3. Review Brand Guidelines with CreativeX" },
  ];
  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-white mb-2">AI Copilot</h2>
          <p className="text-white/50 mb-6">Your smartest business partner — working 24/7 to keep your freelance career on track.</p>
          <ul className="space-y-3 mb-8">
            {["Smart task suggestions based on workload", "Predicts which clients will pay late", "Recommends optimal deadlines", "Answers questions about your business", "Creates proposals and email drafts", "Weekly AI productivity summaries"].map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-white/70">
                <CheckCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />{c}
              </li>
            ))}
          </ul>
          <button onClick={onSignUp} className="h-11 px-8 bg-foreground text-background text-sm font-semibold rounded-full hover:opacity-90 transition-all">Try AI Copilot →</button>
        </div>
        <div className="flex-1 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center"><Sparkles className="w-3 h-3 text-black" /></div>
            <span className="text-sm font-medium text-white">AI Copilot</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">Online</span>
          </div>
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === "user" ? "bg-white text-black" : "bg-white/10 text-white/80 border border-white/10 shadow-sm"
                }`}>{msg.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── Main Login / Landing ─────────────── */
type PanelId = "features" | "projects" | "finance" | "ai-copilot" | null;

const Login = () => {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const { login: authLogin } = useAuth();

  const navLinks: { label: string; panel: PanelId }[] = [
    { label: "Features", panel: "features" },
    { label: "Projects", panel: "projects" },
    { label: "Finance", panel: "finance" },
    { label: "AI Copilot", panel: "ai-copilot" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
    const body = isSignUp ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        authLogin(data.accessToken, data.user);
        toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || (isSignUp ? "Signup failed." : "Login failed."));
      }
    } catch {
      toast.error("Connection error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  const openSignUp = () => { setActivePanel(null); setIsSignUp(true); setShowAuth(true); };

  return (
    <div className="dark">
      <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-white/10">
        
        {/* Massive Central Glass Panel */}
        <div className="glass-panel w-full max-w-[1400px] min-h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden text-white">
          
          {/* Top Navigation */}
          <nav className="flex items-center justify-between p-6 relative z-20">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActivePanel(null)}
            >
              <Logo size={32} color="currentColor" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              <span className="text-sm font-semibold text-white hidden sm:block">Freelancer Flow</span>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md">
              <button
                onClick={() => setActivePanel(null)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${!activePanel ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/10"}`}
              >
                Home
              </button>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActivePanel(item.panel)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    activePanel === item.panel ? "bg-white text-black" : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setShowAuth(true); setIsSignUp(false); setActivePanel(null); }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={openSignUp}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:opacity-90 transition-colors"
              >
                <User className="w-3 h-3" /> Get Started
              </button>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            
            {/* Constellation BG */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 250 300 Q 400 300 500 450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-white/20" />
                <path d="M 1000 250 Q 800 250 700 450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-white/20" />
                <path d="M 200 600 Q 400 600 500 450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-white/20" />
              </svg>
              <ConstellationNode x="20%" y="35%" label="Projects" value="Active: 4" icon={Triangle} delay={0.2} />
              <ConstellationNode x="75%" y="30%" label="Clients" value="Total: 12" icon={Hexagon} delay={0.4} />
              <ConstellationNode x="15%" y="65%" label="Invoices" value="$12.4k" icon={Circle} delay={0.6} />
              <ConstellationNode x="80%" y="60%" label="Analytics" value="Updated" icon={Zap} delay={0.8} />
            </div>

            {/* Hero Content — always rendered, dimmed when a panel is active */}
            <motion.div
              animate={{ opacity: activePanel ? 0.15 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col"
            >
              <div className="w-full overflow-y-auto pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center pt-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-8 backdrop-blur-md">
                    <Logo size={14} color="currentColor" /> The AI-powered command center for freelancers <ArrowRight className="w-3 h-3" />
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6 leading-tight">
                    Manage Your Freelance Business <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/30">— Without the Chaos</span>
                  </h1>
                  <p className="text-base sm:text-lg text-white/50 mb-10 max-w-2xl mx-auto font-light italic">
                    Freelancer Flow turns chaos into clarity — projects, clients, deadlines, all automated seamlessly in one intelligent workspace.
                  </p>
                  <Button
                    onClick={() => { setShowAuth(true); setIsSignUp(true); }}
                    className="group relative h-12 px-8 text-sm font-medium bg-white text-black rounded-full overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/90 transition-colors z-0" />
                  </Button>
                </div>

                {/* Feature Cards */}
                <div className="w-full max-w-6xl mx-auto mt-32">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Everything You Need</h2>
                    <p className="text-white/40 text-sm italic">Click a card or use the nav above to explore each feature.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {[
                      { icon: FolderKanban, title: "Project Management", panel: "projects" as PanelId, desc: "Organize tasks, track progress, and meet deadlines effortlessly." },
                      { icon: Users, title: "Client Management", panel: "features" as PanelId, desc: "Keep track of clients, communication, and payment history." },
                      { icon: DollarSign, title: "Smart Finance", panel: "finance" as PanelId, desc: "Monitor earnings, expenses, and profits in real time." },
                      { icon: Sparkles, title: "AI Assistant", panel: "ai-copilot" as PanelId, desc: "Get smart suggestions, task planning, and productivity insights." },
                    ].map((f) => (
                      <button
                        key={f.title}
                        onClick={() => setActivePanel(f.panel)}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                      >
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                          <f.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-medium text-white mb-2">{f.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                        <span className="text-xs text-white/30 mt-3 flex items-center gap-1">Learn more <ArrowRight className="w-3 h-3" /></span>
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-8 opacity-30 grayscale pb-8">
                    {['Upwork', 'Fiverr', 'Stripe', 'PayPal', 'Slack', 'Notion', 'Asana'].map((brand) => (
                      <div key={brand} className="text-sm font-bold tracking-widest text-white">{brand}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overlay Panel */}
            <AnimatePresence>
              {activePanel && (
                <motion.div
                  key={activePanel}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-20 bg-black/70 backdrop-blur-xl rounded-b-[32px] overflow-hidden"
                >
                  <button
                    onClick={() => setActivePanel(null)}
                    className="absolute top-5 right-5 z-30 h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {activePanel === "features" && <FeaturesPanel onSignUp={openSignUp} />}
                  {activePanel === "projects" && <ProjectsPanel onSignUp={openSignUp} />}
                  {activePanel === "finance" && <FinancePanel onSignUp={openSignUp} />}
                  {activePanel === "ai-copilot" && <AICopilotPanel onSignUp={openSignUp} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Auth Modal */}
        <AnimatePresence>
          {showAuth && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 shadow-2xl relative"
              >
                <button onClick={() => setShowAuth(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-2">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                  <p className="text-sm text-white/50">{isSignUp ? "Enter your details to get started" : "Enter your credentials to access your dashboard"}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <Input 
                        placeholder="Full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/30" 
                      />
                    </motion.div>
                  )}
                  <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/30" />
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/30 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full h-12 bg-white text-black font-medium text-sm mt-4 hover:opacity-90 transition-opacity shadow-md">
                    {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-white/50 hover:text-white transition-colors italics font-light">
                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
