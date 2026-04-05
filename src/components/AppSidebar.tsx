import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Bell,
  CreditCard,
  IdCard,
  Store,
  Package,
  AlertTriangle,
} from "lucide-react";

const navItems = [
  { label: "PRINCIPAL", items: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Bell, label: "Notificaciones", path: "/notificaciones", badge: 1 },
  ]},
  { label: "IDENTIDAD", items: [
    { icon: IdCard, label: "Mi Cédula", path: "/cedula" },
  ]},
  { label: "ECONOMÍA", items: [
    { icon: CreditCard, label: "VersePay", path: "/versepay" },
  ]},
  { label: "CIUDAD", items: [
    { icon: Store, label: "Store", path: "/store" },
    { icon: Package, label: "Inventario", path: "/inventario" },
    { icon: AlertTriangle, label: "Emergencias 911", path: "/emergencias" },
  ]},
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      {/* User profile */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-surface-3 flex items-center justify-center text-sm font-bold text-foreground">
              RC
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-sidebar bg-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">eqox_</p>
            <p className="text-xs text-accent">● En línea</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-surface-3 hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <item.icon className="relative z-10 h-5 w-5" />
                    <span className="relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className="relative z-10 ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
