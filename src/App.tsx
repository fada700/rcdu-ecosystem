import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import VersePay from "./pages/VersePay";
import MiCedula from "./pages/MiCedula";
import StorePage from "./pages/StorePage";
import Notificaciones from "./pages/Notificaciones";
import Emergencias from "./pages/Emergencias";
import Inventario from "./pages/Inventario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/versepay" element={<VersePay />} />
            <Route path="/cedula" element={<MiCedula />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
            <Route path="/emergencias" element={<Emergencias />} />
            <Route path="/inventario" element={<Inventario />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
