import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, ChevronUp, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const UserDropdown = ({ collapsed, position = "top" }: { collapsed?: boolean; position?: "top" | "bottom" }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user?.name.split(" ").map(n => n[0]).join("").toUpperCase() || "??";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${position === "top" ? "w-full px-3 mb-2" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between p-2 rounded-2xl transition-all duration-300 ${
          isOpen ? "bg-white/10 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "hover:bg-white/5 border-transparent"
        } border group ${position === "top" ? "w-full" : "gap-3"}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg group-hover:border-white/20 transition-all">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex flex-col items-start overflow-hidden text-left">
              <span className="text-sm font-semibold text-white whitespace-nowrap truncate w-full tracking-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-white/40 font-medium truncate w-full tracking-wider uppercase">
                Pro Account
              </span>
            </div>
          )}
        </div>
        {!collapsed && (
          <ChevronUp className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${position === "bottom" ? "rotate-180" : ""}`} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`absolute z-50 ${position === "top" ? "bottom-full mb-3 left-0 right-0" : "top-full mt-3 right-0 w-64"} bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-1.5 overflow-hidden`}
          >
            <div className="px-3 py-2 border-b border-white/5 mb-1.5">
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-0.5">Account Info</p>
              <p className="text-xs font-medium text-white/90 truncate">{user?.email}</p>
            </div>
            
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs font-medium group">
              <User className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              Profile Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs font-medium group">
              <Settings className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              Preferences
            </button>
            
            <div className="h-px bg-white/5 my-1.5 mx-2" />
            
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-xs font-medium group"
            >
              <LogOut className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
