import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// TODO: Add your Clerk publishable key here from https://dashboard.clerk.com
// Get it from: Dashboard → API Keys → Publishable Key
const CLERK_PUBLISHABLE_KEY = 'pk_test_Y29tcG9zZWQtb3dsLTE3LmNsZXJrLmFjY291bnRzLmRldiQ';

const App = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/user" element={<User />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
