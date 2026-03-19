import { motion } from "framer-motion";
import { Plus, Download, Send, FileText } from "lucide-react";

const invoices = [
  { id: "INV-001", client: "Nova Labs", project: "Landing Page Redesign", amount: "$4,500", status: "Paid", date: "Mar 10" },
  { id: "INV-002", client: "FinEdge", project: "Mobile App UI", amount: "$3,200", status: "Sent", date: "Mar 15" },
  { id: "INV-003", client: "Acme Corp", project: "Design System", amount: "$5,400", status: "Overdue", date: "Mar 1" },
  { id: "INV-004", client: "CreativeX", project: "Brand Guidelines", amount: "$2,800", status: "Draft", date: "Mar 18" },
  { id: "INV-005", client: "ShopFlow", project: "E-commerce Checkout", amount: "$6,100", status: "Paid", date: "Mar 5" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-success/20 text-success",
  Sent: "bg-primary/20 text-primary",
  Overdue: "bg-destructive/20 text-destructive",
  Draft: "bg-muted-foreground/20 text-muted-foreground",
};

const Invoices = () => {
  return (
    <div className="p-6 h-screen overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Generate and manage invoices</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
          <Plus className="h-4 w-4" /> New Invoice
        </motion.button>
      </motion.div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              {["Invoice", "Client", "Project", "Amount", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
              >
                <td className="px-5 py-3.5 text-sm font-medium text-primary mono">{inv.id}</td>
                <td className="px-5 py-3.5 text-sm text-foreground">{inv.client}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{inv.project}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground mono">{inv.amount}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusColors[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground mono">{inv.date}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Download PDF">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Send">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Preview">
                      <FileText className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
