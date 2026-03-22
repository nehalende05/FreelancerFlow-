import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CursorGlow = () => {
  console.log("CursorGlow mounted");
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for the trailing ring
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // No return null here to ensure it's always in the DOM

  // Copper color palette
  const copperColor = "#CD7F32"; // Classic metallic copper
  const copperGlow = "rgba(205, 127, 50, 0.4)";

  return (
    <>
      {/* 1. Precise Dot Pointer (Instantly follows mouse) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] shadow-[0_0_10px_rgba(205,127,50,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: copperColor,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
      />

      {/* 2. Trailing Outer Ring (Smoothly lags behind) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[1.2px] pointer-events-none z-[99998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: copperColor,
          opacity: 0.6,
        }}
        animate={{
          width: isHovering ? 36 : 24,
          height: isHovering ? 36 : 24,
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      />
    </>
  );
};
