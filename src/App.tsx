
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import AddCrop from "./pages/AddCrop";
import CropIdentification from "./pages/CropIdentification";
import Market from "./pages/Market";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Weather from "./pages/Weather";
import CropDetail from "./pages/CropDetail";

// Contexts
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/crops/add" element={<AddCrop />} />
              <Route path="/crops/:id" element={<CropDetail />} />
              <Route path="/crop-identification" element={<CropIdentification />} />
              <Route path="/market" element={<Market />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
