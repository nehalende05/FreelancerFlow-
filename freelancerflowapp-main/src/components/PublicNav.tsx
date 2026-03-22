import { useNavigate, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Projects", path: "/projects-info" },
  { label: "Finance", path: "/finance-info" },
  { label: "AI Copilot", path: "/ai-copilot" },
];

export const PublicNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between p-6 relative z-20">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Logo size={32} color="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
        <span className="text-sm font-semibold text-white hidden sm:block">
          Freelancer Flow
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-md">
        {navLinks.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/?signin=true")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/?signup=true")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
        >
          <User className="w-3 h-3" /> Get Started
        </button>
      </div>
    </nav>
  );
};
