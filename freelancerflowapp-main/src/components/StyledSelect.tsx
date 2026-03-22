import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  id: string | number;
  name: string;
}

interface StyledSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder: string;
  icon?: React.ReactNode;
}

export const StyledSelect = ({ options, value, onChange, placeholder, icon }: StyledSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => String(opt.id) === String(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 rounded-full bg-white/[0.03] border border-white/10 px-6 flex items-center justify-between group hover:border-white/20 transition-all text-sm"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-white/30">{icon}</span>}
          <span className={selectedOption ? "text-white" : "text-white/20"}>
            {selectedOption ? selectedOption.name : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/20 group-hover:text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 z-[110] mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl overflow-hidden py-2"
          >
            <div className="max-h-60 overflow-y-auto scrollbar-none">
              {options.length === 0 ? (
                <div className="px-6 py-4 text-xs text-white/20 italic font-light">
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-6 py-3 flex items-center justify-between text-sm transition-colors hover:bg-white/5 ${
                      String(option.id) === String(value) ? "text-white bg-white/[0.03]" : "text-white/40"
                    }`}
                  >
                    <span>{option.name}</span>
                    {String(option.id) === String(value) && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
