import { motion } from "framer-motion";
import { Plus, Download, FileText, Loader2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { InvoiceModal } from "@/components/InvoiceModal";
import { toast } from "sonner";

interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  amount?: string; // Legacy
  totalAmount: number;
  status: string;
  date: string;
  invoiceNumber: string;
}

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  return (
    <div className="p-6 h-screen overflow-y-auto selection:bg-white/20 scrollbar-none">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-white">Invoices</h1>
          <p className="text-sm text-white/40 font-light mt-1 italic">Professional billing for your high-end services.</p>
        </div>
        <motion.button 
          whileTap={{ scale: 0.97 }} 
          onClick={() => setShowModal(true)}
          className="btn-pill-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> New Invoice
        </motion.button>
      </motion.div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <input
          placeholder="Search by client or invoice #..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-pill w-full pl-11"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-white/20" />
          <p className="text-sm text-white/40 font-light italic">Fetching records...</p>
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
              className="glass-card-premium p-6 group flex flex-col relative overflow-hidden"
            >
              {/* Header: Amount & Status */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.2em] mb-1 block">Total Amount</span>
                  <p className="text-2xl font-bold text-white mono tracking-tighter">
                    ${inv.totalAmount?.toLocaleString() || inv.amount}
                  </p>
                </div>
                <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                  inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  inv.status === 'Pending' || inv.status === 'Sent' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  'bg-white/5 text-white/40 border border-white/10'
                }`}>
                  {inv.status}
                </span>
              </div>

              {/* Content: Client & Project */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">{inv.clientName}</h3>
                  <p className="text-xs text-white/40 font-light mt-0.5 italic">{inv.projectName || 'General Work'}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <FileText className="h-3 w-3 text-white/40" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30">{inv.invoiceNumber}</span>
                  </div>
                  <span className="text-[10px] font-mono italic text-white/30">{inv.date}</span>
                </div>
              </div>

              {/* Actions: Download */}
              <div className="mt-auto flex items-center gap-3">
                <button 
                  onClick={() => handleDownload(inv.id, inv.invoiceNumber)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black text-[12px] font-bold hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group/btn"
                >
                  <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" /> 
                  Download PDF
                </button>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center glass-card-premium border-dashed border-white/5">
              <p className="text-sm text-white/20 italic font-light italic tracking-tight">No invoices found matching current criteria.</p>
            </div>
          )}
        </div>
      )}

      <InvoiceModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSuccess={fetchInvoices} 
      />
    </div>
  );
};

export default Invoices;
