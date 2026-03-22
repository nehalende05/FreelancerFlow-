import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PublicNav } from "@/components/PublicNav";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started.",
    features: ["Up to 3 projects", "5 clients", "Basic invoicing", "Time tracking", "Community support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For freelancers who mean business.",
    features: ["Unlimited projects", "Unlimited clients", "AI Copilot access", "Smart Finance dashboard", "Invoice automation", "Priority support"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Studio",
    price: "$29",
    period: "per month",
    desc: "For agencies and small teams.",
    features: ["Everything in Pro", "Up to 5 team members", "Shared project boards", "Client portal access", "Custom branding", "Dedicated support"],
    cta: "Talk to Sales",
    highlight: false,
  },
];

const PricingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="glass-panel w-full max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        <PublicNav />

        <div className="flex-1 px-6 md:px-12 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-6">
              <Logo size={14} color="white" /> Simple Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Plans That Grow With You</h1>
            <p className="text-white/50 text-lg font-light">Start free, upgrade when you're ready. No hidden fees, no surprises.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col border ${
                  plan.highlight
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                }`}
              >
                <div className="mb-6">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? "text-black/50" : "text-white/50"}`}>{plan.name}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? "text-black/50" : "text-white/40"}`}>/{plan.period}</span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlight ? "text-black/60" : "text-white/50"}`}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-black" : "text-white"}`} />
                      <span className={plan.highlight ? "text-black" : "text-white/70"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/?signup=true")}
                  className={`group flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                    plan.highlight
                      ? "bg-black text-white hover:bg-black/80"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-white/30 mt-10">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
