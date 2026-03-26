import { motion } from "framer-motion";
import { Plus, Download, FileText, Loader2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { InvoiceModal } from "@/components/InvoiceModal";
import { ReminderModal } from "@/components/ReminderModal";
import { toast } from "sonner";
import { Clock } from "lucide-react";

interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  amount?: string; // Legacy
  totalAmount: number;
  status: string;
  date: string;
  dueDate: string;
  invoiceNumber: string;
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [search, setSearch] = useState("");

  const fetchInvoices = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setInvoices(await res.json());
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load invoices");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDownload = async (id: string, num: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/invoices/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice_${num}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast.success("PDF Downloaded");
      } else {
        toast.error("Failed to generate PDF");
      }
    } catch (err) {
      toast.error("Download failed");
    }
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleReminder = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setShowReminderModal(true);
  };

  return (
    <div className="p-6 h-screen overflow-y-auto selection:bg-primary/20 scrollbar-none bg-background text-foreground">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground font-light mt-1 italic">Professional billing for your high-end services.</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.97 }} 
          onClick={() => setShowModal(true)}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Invoice
        </motion.button>
      </motion.div>

      {/* Search */}
      <div className="relative mb-8 max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <input
          placeholder="Search by client or invoice #..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary/20" />
          <p className="text-sm text-muted-foreground font-light italic">Fetching records...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filtered.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card-premium p-6 group flex flex-col relative overflow-hidden border border-border dark:border-white/10"
            >
              {/* Header: Amount & Status */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mb-1 block">Total Amount</span>
                  <p className="text-2xl font-bold text-foreground mono tracking-tighter">
                    ${inv.totalAmount?.toLocaleString() || inv.amount}
                  </p>
                </div>
                <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                  inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  inv.status === 'Pending' || inv.status === 'Sent' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                  'bg-secondary text-muted-foreground border-border dark:border-white/10'
                }`}>
                  {inv.status}
                </span>
              </div>

              {/* Content: Client & Project */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight">{inv.clientName}</h3>
                  <p className="text-xs text-muted-foreground font-light mt-0.5 italic">{inv.projectName || 'General Work'}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-secondary/50 dark:bg-white/5 border border-border dark:border-white/10">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{inv.invoiceNumber}</span>
                  </div>
                  <span className="text-[10px] font-mono italic text-muted-foreground">{inv.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex items-center gap-2">
                <button 
                  onClick={() => handleDownload(inv.id, inv.invoiceNumber)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-md group/btn"
                >
                  <Download className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5" /> 
                  Download
                </button>
                <button 
                  onClick={() => handleReminder(inv)}
                  className="px-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/80 dark:bg-white/5 border border-border dark:border-white/10 text-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-secondary dark:hover:bg-white/10 active:scale-95 transition-all group/btn"
                >
                  <Clock className="h-3.5 w-3.5 transition-transform group-hover/btn:rotate-12" />
                </button>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card-premium border-dashed border-border dark:border-white/10">
              <p className="text-sm text-muted-foreground italic font-light tracking-tight">No invoices found matching current criteria.</p>
            </div>
          )}
        </div>
      )}

      <InvoiceModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={fetchInvoices} 
      />

      <ReminderModal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default Invoices;
