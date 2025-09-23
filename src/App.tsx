import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import MapView from "./pages/MapView";
import Sensors from "./pages/Sensors";
import RiskForecast from "./pages/RiskForecast";
import AlertsDispatch from "./pages/AlertsDispatch";
import VolunteerCommunity from "./pages/VolunteerCommunity";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/risk-forecast" element={<RiskForecast />} />
          <Route path="/alerts" element={<AlertsDispatch />} />
          <Route path="/volunteers" element={<VolunteerCommunity />} />
          <Route path="/admin" element={<AdminSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
