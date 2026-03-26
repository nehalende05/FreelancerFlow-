import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Calendar, User, Briefcase, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { StyledSelect } from "./StyledSelect";

interface Client {
  id: string | number;
  name: string;
}

interface Project {
  id: string | number;
  name: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const InvoiceModal = ({ isOpen, onClose, onSuccess }: InvoiceModalProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    clientName: "",
    projectName: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
    items: [{ name: "", quantity: 1, rate: 0, total: 0 }],
  });

  useEffect(() => {
    const loadLocalData = () => {
      const savedClients = localStorage.getItem("ff_clients");
      const savedProjects = localStorage.getItem("ff_projects");
      
      if (savedClients) setClients(JSON.parse(savedClients));
      if (savedProjects) setProjects(JSON.parse(savedProjects));
    };

    const fetchApiData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [clientsRes, projectsRes] = await Promise.all([
          fetch("/api/clients", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/projects", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if (clientsRes.ok && projectsRes.ok) {
          const apiClients = await clientsRes.json();
          const apiProjects = await projectsRes.json();
          
          // Merge API data with local data if local is empty
          setClients(prev => prev.length > 0 ? prev : apiClients);
          setProjects(prev => prev.length > 0 ? prev : apiProjects);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (isOpen) {
      loadLocalData();
      fetchApiData();
    }
  }, [isOpen]);

  const handleAddItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: 1, rate: 0, total: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    if (form.items.length === 1) return;
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...form.items];
    const item = { ...newItems[index], [field]: value };
    if (field === "quantity" || field === "rate") {
      item.total = (item.quantity || 0) * (item.rate || 0);
    }
    newItems[index] = item;
    setForm({ ...form, items: newItems });
  };

  const totalAmount = form.items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientId) return toast.error("Please select a client");
    
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const selectedClient = clients.find(c => String(c.id) === String(form.clientId));
      console.log("Submitting invoice for client:", selectedClient?.name, "ID:", form.clientId);
      
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
           ...form,
           clientName: selectedClient?.name || ""
        }),
      });

      if (res.ok) {
        toast.success("Invoice created successfully");
        onSuccess();
        onClose();
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error("Server error:", errorData);
        toast.error(errorData.message || "Failed to create invoice");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
                  <FileText className="h-6 w-6 text-white/20" />
                  Generate Invoice
                </h2>
                <p className="text-sm text-white/50 font-light italic mt-1">Professional billing for your high-end projects.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-none">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="stat-label flex items-center gap-2"><User className="h-3 w-3" /> Client</label>
                  <StyledSelect
                    options={clients}
                    value={form.clientId}
                    onChange={(val) => setForm({ ...form, clientId: String(val) })}
                    placeholder="Select Client"
                    icon={<User className="h-3 w-3" />}
                  />
                </div>
                <div className="space-y-2">
                  <label className="stat-label flex items-center gap-2"><Briefcase className="h-3 w-3" /> Project (Optional)</label>
                  <StyledSelect
                    options={projects}
                    value={form.projectName}
                    onChange={(val) => setForm({ ...form, projectName: String(val) })}
                    placeholder="Select Project"
                    icon={<Briefcase className="h-3 w-3" />}
                  />
                </div>
                <div className="space-y-2">
                  <label className="stat-label flex items-center gap-2"><Calendar className="h-3 w-3" /> Issue Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="input-pill w-full px-6 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="stat-label flex items-center gap-2"><Calendar className="h-3 w-3" /> Due Date</label>
                  <input
                    type="date"
                    required
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="input-pill w-full px-6 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="stat-label">Line Items</label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="rounded-full h-8 text-[10px] uppercase font-bold tracking-widest border-white/10 text-white/40 hover:text-white">
                    <Plus className="h-3 w-3 mr-1" /> Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {form.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-end group">
                      <div className="flex-1 space-y-1">
                        <input
                          placeholder="Item Description"
                          required
                          value={item.name}
                          onChange={(e) => updateItem(index, "name", e.target.value)}
                          className="input-pill w-full px-5 h-10 border-white/10 bg-white/[0.02]"
                        />
                      </div>
                      <div className="w-20 space-y-1">
                        <input
                          type="number"
                          placeholder="Qty"
                          required
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                          className="input-pill w-full px-4 h-10 border-white/10 bg-white/[0.02] text-center"
                        />
                      </div>
                      <div className="w-32 space-y-1 text-right">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10">$</span>
                          <input
                            type="number"
                            placeholder="Rate"
                            required
                            min="0"
                            value={item.rate}
                            onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value))}
                            className="input-pill w-full pl-8 pr-4 h-10 border-white/10 bg-white/[0.02]"
                          />
                        </div>
                      </div>
                      <div className="w-32 py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-right text-xs font-mono text-white/40">
                        ${item.total.toLocaleString()}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className={`p-2.5 rounded-full bg-rose-500/10 text-rose-500/50 hover:text-rose-500 transition-all ${form.items.length === 1 ? 'opacity-0 cursor-default' : ''}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/50">
                <div className="md:col-span-2 space-y-2">
                  <label className="stat-label">Notes (Optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Provide additional instructions or bank details..."
                    className="w-full h-32 rounded-3xl bg-white/5 border border-white/10 p-5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-all font-light"
                  />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col justify-center items-center text-center">
                  <span className="stat-label mb-2">Total Amount</span>
                  <p className="text-4xl font-bold text-white mono tracking-tighter">${totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="p-8 border-t border-white/10 bg-white/[0.02] flex justify-end gap-4 shrink-0">
               <button type="button" onClick={onClose} className="px-6 py-2 rounded-full text-white/40 hover:text-white transition-colors">
                 Cancel
               </button>
               <Button 
                onClick={handleSubmit} 
                disabled={isLoading}
                className="btn-pill-primary px-12"
               >
                 {isLoading ? "Saving..." : "Generate & Finalize"}
               </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
