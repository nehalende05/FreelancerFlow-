import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, Users, DollarSign, Clock,
  FileText, ChevronLeft, ChevronRight, Zap,
} from "lucide-react";
import Logo from "./Logo";
import { UserDropdown } from "./UserDropdown";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: DollarSign, label: "Finance", path: "/finance" },
  { icon: Clock, label: "Time Tracking", path: "/time" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-screen flex flex-col bg-background/40 backdrop-blur-2xl border-r border-border dark:border-white/5 relative z-40 shrink-0"
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 mb-4">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = "/dashboard"}>
          <div className="h-9 w-9 rounded-xl bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/20 transition-all">
            <Logo size={22} className="text-foreground" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-semibold text-foreground tracking-tighter whitespace-nowrap"
              >
                Freelancer Flow
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 group relative ${
                isActive
                  ? "text-primary-foreground"
                  : "text-foreground/50 hover:text-foreground hover:bg-secondary/50 dark:hover:bg-white/5"
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-primary-foreground" : "group-hover:text-foreground"}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap tracking-tight"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 space-y-2 mt-auto">
        <UserDropdown collapsed={collapsed} />
        
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-foreground/40 hover:text-foreground hover:bg-secondary/50 dark:hover:bg-white/5 transition-all group"
        >
          <div className="h-4 w-4 flex items-center justify-center">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
          {!collapsed && <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};
