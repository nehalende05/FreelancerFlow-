import { motion } from "framer-motion";

interface KanbanColumn {
  title: string;
  color: string;
  tasks: { id: string; title: string; client: string; priority: "high" | "medium" | "low" }[];
}

const columns: KanbanColumn[] = [
  {
    title: "To Do",
    color: "bg-muted-foreground",
    tasks: [
      { id: "1", title: "Design system refresh", client: "Acme Corp", priority: "high" },
      { id: "2", title: "API documentation", client: "TechStart", priority: "medium" },
    ],
  },
  {
    title: "In Progress",
    color: "bg-primary",
    tasks: [
      { id: "3", title: "Landing page redesign", client: "Nova Labs", priority: "high" },
      { id: "4", title: "Mobile app UI", client: "FinEdge", priority: "medium" },
      { id: "5", title: "Dashboard analytics", client: "Acme Corp", priority: "low" },
    ],
  },
  {
    title: "Review",
    color: "bg-warning",
    tasks: [
      { id: "6", title: "Brand guidelines", client: "CreativeX", priority: "medium" },
    ],
  },
  {
    title: "Done",
    color: "bg-success",
    tasks: [
      { id: "7", title: "E-commerce checkout", client: "ShopFlow", priority: "high" },
      { id: "8", title: "SEO optimization", client: "Nova Labs", priority: "low" },
    ],
  },
];

const priorityColors = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-warning/20 text-warning",
  low: "bg-accent/20 text-accent",
};

export const KanbanBoard = () => {
  return (
    <div className="flex gap-3 p-4 h-full overflow-x-auto">
      {columns.map((col, ci) => (
        <motion.div
          key={col.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-w-[200px]"
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className={`h-2 w-2 rounded-full ${col.color}`} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{col.title}</span>
            <span className="text-[10px] text-muted-foreground/50 ml-auto">{col.tasks.length}</span>
          </div>

          <div className="space-y-2">
            {col.tasks.map((task, ti) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 + ti * 0.05 }}
                whileHover={{ y: -1 }}
                className="glass-card p-3 cursor-pointer hover:bg-secondary/30 transition-colors"
              >
                <p className="text-xs font-medium text-foreground mb-1.5">{task.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{task.client}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
