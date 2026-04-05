import { motion } from "framer-motion";
import {
  Wallet,
  Package,
  Bell,
  IdCard,
  CreditCard,
  Store,
  ArrowRight,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

const statsCards = [
  { icon: Wallet, label: "BALANCE", value: "$917.082", sub: "Saldo disponible", color: "text-accent", borderColor: "border-t-accent", badgeText: "BALANCE", badgeColor: "bg-accent/10 text-accent" },
  { icon: Package, label: "ITEMS", value: "1", sub: "En tu inventario", color: "text-primary", borderColor: "border-t-primary", badgeText: "ITEMS", badgeColor: "bg-primary/10 text-primary" },
  { icon: Bell, label: "NOTIFICACIONES", value: "1", sub: "Notificaciones sin leer", color: "text-warning", borderColor: "border-t-warning", badgeText: "1 NUEVA", badgeColor: "bg-warning/10 text-warning" },
  { icon: IdCard, label: "CÉDULA", value: "Verificado", sub: "Cédula de identidad", color: "text-primary", borderColor: "border-t-primary", badgeText: "ACTIVA", badgeColor: "bg-primary/10 text-primary" },
];

const quickActions = [
  { icon: CreditCard, label: "VersePay", color: "text-accent" },
  { icon: Store, label: "Tienda", color: "text-primary" },
  { icon: Package, label: "Inventario", color: "text-destructive" },
  { icon: DollarSign, label: "Sueldos", color: "text-warning" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Emergency banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 p-4 cursor-pointer hover:bg-destructive/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <div>
            <p className="text-sm font-semibold text-destructive">Reportar Emergencia</p>
            <p className="text-xs text-muted-foreground">Envía un llamado al MDT policial en tiempo real</p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </motion.div>

      {/* Welcome card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Bienvenido, <span className="text-accent">eqox_</span> 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Sunday 05 de April, 2026</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              En línea · Chileverse
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Balance Actual</p>
            <p className="text-3xl font-bold text-accent text-glow-emerald">$917.082</p>
            <p className="text-xs text-muted-foreground">Pesos Chileverse</p>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className={`rounded-xl border border-border ${card.borderColor} border-t-2 bg-card p-4 card-hover cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${card.badgeColor}`}>
                {card.badgeText}
              </span>
            </div>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickActions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 card-hover"
          >
            <div className="rounded-xl bg-surface-3 p-3">
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Transactions + Notifications */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Transacciones Recientes</h2>
            <button className="text-xs font-medium text-primary hover:underline">Ver todas →</button>
          </div>
          <div className="space-y-3">
            {[
              { label: "Compra Vehículo", amount: "-$22.000.000", date: "Hoy", color: "text-destructive" },
              { label: "Sueldo Recibido", amount: "+$150.000", date: "Ayer", color: "text-accent" },
              { label: "Multa Pagada", amount: "-$50.000", date: "03/04", color: "text-destructive" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-surface-2 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={`text-sm font-mono font-semibold ${tx.color}`}>{tx.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Notificaciones</h2>
            <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">1 sin leer</span>
          </div>
          <div className="space-y-3">
            {[
              { title: "¡Bienvenido a Chileverse!", desc: "Tu cuenta ha sido creada. ¡Comienza creando tu cédula!", type: "info" },
              { title: "Cédula Emitida", desc: "Tu cédula de identidad ha sido creada. RUT: 17313023-6", type: "success" },
            ].map((notif, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-surface-2 px-4 py-3">
                <Bell className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{notif.title}</p>
                  <p className="text-xs text-muted-foreground">{notif.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
