import { motion } from "framer-motion";
import { useState } from "react";

interface AIOrbProps {
  onClick?: () => void;
}

export const AIOrb = ({ onClick }: AIOrbProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className="relative h-16 w-16 cursor-pointer group"
        whileTap={{ scale: 0.95 }}
      >
        {/* Rotating outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-full border border-primary/30" style={{
            borderImage: "linear-gradient(135deg, hsl(var(--glow-violet)), hsl(var(--glow-cyan))) 1",
            borderRadius: "50%",
          }} />
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />

        {/* Core */}
        <div className="absolute inset-1 bg-background/90 rounded-full backdrop-blur-xl flex items-center justify-center"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <motion.div
            animate={isHovered ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="h-3 w-3 rounded-full bg-gradient-to-br from-primary to-accent"
            style={{ boxShadow: "0 0 15px hsl(var(--glow-violet) / 0.8), 0 0 30px hsl(var(--glow-cyan) / 0.4)" }}
          />
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground"
        >
          AI Copilot
        </motion.div>
      </motion.div>
    </div>
  );
};
