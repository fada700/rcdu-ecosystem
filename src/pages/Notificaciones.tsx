import { motion } from "framer-motion";
import { Bell, Check, ShoppingBag, IdCard, Star } from "lucide-react";
import { useState } from "react";

const tabs = ["Todas", "No leídas", "Sueldos", "Transferencias", "Alertas"];

const notifications = [
  { icon: ShoppingBag, title: "Compra Realizada", desc: 'Adquiriste "Teléfono Encriptado" por $10.000', time: "Hace 2h", read: false, color: "text-warning" },
  { icon: IdCard, title: "Cédula Emitida", desc: "Tu cédula de identidad ha sido creada. RUT: 17313023-6 · Roblox: @elcapitan1212", time: "Hace 5h", read: false, color: "text-primary" },
  { icon: Star, title: "¡Bienvenido a Chileverse!", desc: "Tu cuenta ha sido creada! Tienes $1.000.000 de saldo inicial. ¡Comienza creando tu cédula!", time: "1 día", read: true, color: "text-accent" },
];

export default function Notificaciones() {
  const [activeTab, setActiveTab] = useState("Todas");
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> Notificaciones
          </h1>
          <p className="text-sm text-muted-foreground">{unread} sin leer · {notifications.length} total</p>
        </div>
        <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
          <Check className="h-3 w-3" /> Marcar todas leídas
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total", value: notifications.length, color: "text-primary" },
          { label: "Sin leer", value: unread, color: "text-destructive" },
          { label: "Alertas", value: 0, color: "text-warning" },
          { label: "Sistema", value: 0, color: "text-accent" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-surface-3 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-4 rounded-xl border bg-card p-4 ${
              notif.read ? "border-border" : "border-primary/30 bg-primary/5"
            }`}
          >
            <div className={`rounded-lg bg-surface-3 p-2 ${notif.color}`}>
              <notif.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{notif.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{notif.desc}</p>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{notif.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
