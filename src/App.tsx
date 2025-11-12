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
const CLERK_PUBLISHABLE_KEY = 'pk_test_your_key_here'; // Replace with your actual key

const App = () => {
  // If Clerk key is not configured, show a helpful message
  if (!CLERK_PUBLISHABLE_KEY || CLERK_PUBLISHABLE_KEY === 'pk_test_your_key_here') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-foreground mb-4">⚙️ Clerk Setup Required</h1>
          <p className="text-muted-foreground mb-6">
            To use authentication, you need to add your Clerk publishable key.
          </p>
          
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Setup Steps:</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Go to <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dashboard.clerk.com</a></li>
              <li>Sign up or log in to your account</li>
              <li>Create a new application or select an existing one</li>
              <li>Go to <strong>API Keys</strong> in the sidebar</li>
              <li>Copy your <strong>Publishable Key</strong> (starts with <code className="bg-muted px-2 py-1 rounded">pk_</code>)</li>
              <li>Open <code className="bg-muted px-2 py-1 rounded">src/App.tsx</code> in your project</li>
              <li>Replace <code className="bg-muted px-2 py-1 rounded">pk_test_your_key_here</code> with your actual key</li>
            </ol>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">🔐 Enable Google OAuth (Optional):</h3>
            <p className="text-sm text-muted-foreground">
              In your Clerk dashboard, go to <strong>User & Authentication → Social Connections</strong> and enable Google.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
