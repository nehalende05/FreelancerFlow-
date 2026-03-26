import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const AIChat = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please check your login session." }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "ai", content: "Connection failed. Is the backend running?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-28 right-8 z-[60] w-80 h-[450px] bg-black rounded-3xl flex flex-col shadow-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,1)] overflow-hidden border border-white/10"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-white">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
              AI Copilot
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none bg-transparent">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-6 w-6 text-white/20" />
                </div>
                <p className="text-xs text-white/40 font-light italic px-8">
                  Ask me anything about your projects, clients, or financial status.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-white text-black font-medium rounded-tr-none shadow-sm" 
                    : "bg-white/5 text-white/80 rounded-tl-none border border-white/10 shadow-none"
                }`}>
                  {msg.role === "ai" ? (
                    <div className="prose prose-invert prose-xs max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-none">
                  <Loader2 className="h-3 w-3 animate-spin text-white/40" />
                  <span className="text-[10px] text-white/40 italic">Thinking...</span>
                </div>
              </div>
            )}
          </div>

           <div className="p-4 border-t border-white/5 bg-white/[0.01]">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
               <input
                placeholder="Message Gemini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-10 px-4 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/10 transition-all shadow-none"
              />
               <button 
                type="submit" 
                disabled={isLoading}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>

      )}
    </AnimatePresence>
  );
};
