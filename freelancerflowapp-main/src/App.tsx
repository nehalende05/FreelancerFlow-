import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { AIOrb } from "@/components/AIOrb";
import { CursorGlow } from "@/components/CursorGlow";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";

import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Finance from "./pages/Finance";
import TimeTracking from "./pages/TimeTracking";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import FeaturesPage from "./pages/FeaturesPage";
import ProjectsInfoPage from "./pages/ProjectsInfoPage";
import FinanceInfoPage from "./pages/FinanceInfoPage";
import AICopilotPage from "./pages/AICopilotPage";
import PricingPage from "./pages/PricingPage";

const queryClient = new QueryClient();

import { AIChat } from "@/components/AIChat";
import { useState } from "react";

const MainLayout = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <Routes>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/time" element={<TimeTracking />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <CommandPalette />
      <AIOrb onClick={() => setIsAIChatOpen(!isAIChatOpen)} />
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/projects-info" element={<ProjectsInfoPage />} />
              <Route path="/finance-info" element={<FinanceInfoPage />} />
              <Route path="/ai-copilot" element={<AICopilotPage />} />
              <Route path="/*" element={<MainLayout />} />
            </Routes>
            <CursorGlow />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
