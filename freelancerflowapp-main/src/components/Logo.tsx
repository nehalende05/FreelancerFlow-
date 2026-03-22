import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className, size = 32, color = "currentColor" }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ rotate: -10, opacity: 0, scale: 0.8 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Three rounded interlocking hooks */}
      <g transform="translate(50, 48)">
        {[0, 120, 240].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <motion.path
              d="M -18, -12 L -18, 12 C -18, 22 -10, 30 0, 30 L 25, 30 C 35, 30 42, 22 42, 12"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: angle / 360, ease: "easeOut" }}
            />
          </g>
        ))}
      </g>
    </motion.svg>
  );
};

export default Logo;
