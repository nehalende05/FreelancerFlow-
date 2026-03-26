import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 hover:bg-secondary dark:hover:bg-white/10 transition-all group overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-2 z-10">
        <div className="relative w-4 h-4">
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "dark" ? 0 : 90,
              scale: theme === "dark" ? 1 : 0,
              opacity: theme === "dark" ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center text-foreground"
          >
            <Moon className="w-3.5 h-3.5" />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ 
              rotate: theme === "light" ? 0 : -90,
              scale: theme === "light" ? 1 : 0,
              opacity: theme === "light" ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center text-amber-500"
          >
            <Sun className="w-3.5 h-3.5" />
          </motion.div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors uppercase">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      </div>
      
      {/* Subtle background glow */}
      {theme === "light" && (
        <motion.div 
          layoutId="toggle-glow"
          className="absolute inset-0 bg-amber-500/5 blur-md"
        />
      )}
    </button>
  );
};
