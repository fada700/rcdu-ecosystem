import { motion } from "framer-motion";
import { CreditCard, Send, ArrowDownLeft, ArrowUpRight, History, Wallet } from "lucide-react";

const transactions = [
  { label: "Compra Vehículo", amount: "-$22.000.000", date: "05/04/2026", type: "out" },
  { label: "Sueldo Mensual", amount: "+$150.000", date: "04/04/2026", type: "in" },
  { label: "Multa Pagada", amount: "-$50.000", date: "03/04/2026", type: "out" },
  { label: "Transferencia Recibida", amount: "+$82.918", date: "02/04/2026", type: "in" },
];

export default function VersePay() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" /> VersePay
        </h1>
        <p className="text-sm text-muted-foreground">Tu billetera digital en Chileverse</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, rotateY: -10 }}
          animate={{ opacity: 1, rotateY: 0 }}
          className="col-span-1 lg:col-span-2"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-3 via-surface-2 to-surface-4 p-6 border border-border glow-blue">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">VersePay</p>
            <p className="mt-4 text-3xl font-bold text-foreground">$917.082</p>
            <p className="mt-6 font-mono text-lg tracking-[0.3em] text-muted-foreground">0000 0014 1333 3e4d</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">TITULAR</p>
                <p className="text-sm font-semibold text-foreground">EQOX_</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">VENCE</p>
                <p className="text-sm font-semibold text-foreground">04/28</p>
              </div>
              <div className="flex gap-1">
                <div className="h-8 w-8 rounded-full bg-destructive/60" />
                <div className="h-8 w-8 -ml-3 rounded-full bg-warning/60" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transfer panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5 space-y-4"
        >
          <h2 className="text-sm font-bold text-foreground">Nueva Transferencia</h2>
          <input
            placeholder="Usuario o RUT destinatario"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <input
            placeholder="Monto en CHP"
            type="number"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <button className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
            <Send className="h-4 w-4" /> Transferir ahora
          </button>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: Wallet, label: "Recargar" },
          { icon: Send, label: "Transferir" },
          { icon: ArrowDownLeft, label: "Solicitar" },
          { icon: History, label: "Historial" },
        ].map((action, i) => (
          <button key={action.label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card py-4 card-hover">
            <action.icon className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Transaction history */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Historial de Transacciones</h2>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between rounded-lg bg-surface-2 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {tx.type === "in" ? (
                  <ArrowDownLeft className="h-4 w-4 text-accent" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <p className={`font-mono text-sm font-semibold ${tx.type === "in" ? "text-accent" : "text-destructive"}`}>
                {tx.amount}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
