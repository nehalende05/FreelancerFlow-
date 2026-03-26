import React, { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: {
    invoiceNumber: string;
    clientName: string;
    totalAmount: number;
    dueDate: string;
  } | null;
}

type Tone = "Polite" | "Neutral" | "Strict";

export const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, invoice }) => {
  const [tone, setTone] = useState<Tone>("Polite");
  const [copied, setCopied] = useState(false);

  if (!invoice) return null;

  const getMessage = (tone: Tone) => {
    const amount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.totalAmount);
    
    switch (tone) {
      case "Polite":
        return `Hi ${invoice.clientName},\n\nI hope you're having a great week! This is just a friendly reminder regarding invoice #${invoice.invoiceNumber} for ${amount}, which is due on ${invoice.dueDate}. \n\nPlease let me know if you have any questions. Thank you!`;
      case "Neutral":
        return `Hello ${invoice.clientName},\n\nI am reaching out to follow up on invoice #${invoice.invoiceNumber} (${amount}). According to my records, the payment is due by ${invoice.dueDate}.\n\nYou can find the invoice attached for your convenience. Best regards.`;
      case "Strict":
        return `Urgent: Payment Reminder for Invoice #${invoice.invoiceNumber}\n\nDear ${invoice.clientName},\n\nThis is a formal reminder that payment for invoice #${invoice.invoiceNumber} in the amount of ${amount} is due on ${invoice.dueDate}. \n\nPlease ensure the payment is settled by the due date to avoid any service interruptions or late fees. \n\nRegards.`;
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getMessage(tone));
    setCopied(true);
    toast.success("Reminder message copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-panel border dark:border-white/10 p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">Generate Reminder</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  Invoice {invoice.invoiceNumber} · {invoice.clientName}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Tone Selection */}
            <div className="flex gap-2 p-1 bg-secondary/50 dark:bg-white/5 rounded-2xl border border-border dark:border-white/10">
              {(["Polite", "Neutral", "Strict"] as Tone[]).map((t) => {
                const isActive = tone === t;
                const Icon = t === "Polite" ? Sparkles : t === "Neutral" ? MessageSquare : ShieldAlert;
                return (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="tone-bg"
                        className="absolute inset-0 bg-primary rounded-xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="h-3 h-3" />
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Message Preview */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative p-6 rounded-2xl bg-background/50 border border-border dark:border-white/10 font-mono text-[11px] leading-relaxed text-foreground min-h-[160px] whitespace-pre-wrap shadow-inner">
                {getMessage(tone)}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] border-border dark:border-white/10 h-11"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCopy}
              className="flex-1 rounded-xl font-bold uppercase tracking-widest text-[10px] h-11"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" /> Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" /> Copy Message
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
