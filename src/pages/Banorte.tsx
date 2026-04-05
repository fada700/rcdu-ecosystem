import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Send, ArrowDownLeft, ArrowUpRight, History, Wallet, Loader2, CheckCircle } from "lucide-react";
import { useCitizen, useTransactions, formatMoney } from "@/hooks/useData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Banorte() {
  const { user } = useAuth();
  const { data: citizen, isLoading } = useCitizen();
  const { data: transactions } = useTransactions();
  const queryClient = useQueryClient();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transferring, setTransferring] = useState(false);

  const displayName = citizen?.roblox_nickname || user?.user_metadata?.discord_username || "Usuario";
  const balance = citizen?.balance ?? 0;
  const folio = citizen?.folio_dni || "—";

  const handleTransfer = async () => {
    if (!recipient.trim()) {
      toast.error("Ingresa el destinatario");
      return;
    }
    const parsedAmount = parseInt(amount, 10);
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Ingresa un monto válido");
      return;
    }
    if (parsedAmount > balance) {
      toast.error("Saldo insuficiente");
      return;
    }

    setTransferring(true);
    try {
      const { data, error } = await supabase.functions.invoke("transfer", {
        body: {
          recipient_query: recipient.trim(),
          amount: parsedAmount,
          description: description.trim() || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(
        `Transferencia exitosa a ${data.recipient_name}`,
        { icon: <CheckCircle className="h-4 w-4 text-accent" /> }
      );
      setRecipient("");
      setAmount("");
      setDescription("");

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["citizen"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    } catch (err: any) {
      toast.error(err.message || "Error al transferir");
    } finally {
      setTransferring(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" /> Banorte
        </h1>
        <p className="text-sm text-muted-foreground">Tu billetera digital en RCDU</p>
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Banorte · RCDU</p>
            <p className="mt-4 text-3xl font-bold text-foreground">{formatMoney(balance)}</p>
            <p className="mt-6 font-mono text-lg tracking-[0.3em] text-muted-foreground">
              {folio !== "—" ? folio : "•••• •••• •••• ••••"}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">TITULAR</p>
                <p className="text-sm font-semibold text-foreground uppercase">{displayName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">DNI FOLIO</p>
                <p className="text-sm font-mono font-semibold text-foreground">{folio}</p>
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
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            placeholder="Usuario o DNI Folio destinatario"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <input
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/\D/g, ""))}
            placeholder="Monto"
            type="text"
            inputMode="numeric"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />
          {amount && parseInt(amount) > 0 && (
            <p className="text-xs text-muted-foreground">
              Enviar <span className="font-semibold text-accent">{formatMoney(parseInt(amount))}</span> · Saldo restante: <span className="font-semibold">{formatMoney(Math.max(0, balance - parseInt(amount)))}</span>
            </p>
          )}
          <button
            onClick={handleTransfer}
            disabled={transferring || !recipient || !amount}
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {transferring ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {transferring ? "Transfiriendo..." : "Transferir ahora"}
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
        ].map((action) => (
          <button key={action.label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card py-4 card-hover">
            <action.icon className="h-5 w-5 text-primary" />
            <span className="text-xs font-medium text-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Transaction history */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Historial de Transacciones</h2>
        {transactions && transactions.length > 0 ? (
          <div className="space-y-2">
            {transactions.map((tx) => {
              const isIncoming = tx.receiver_citizen_id === citizen?.id;
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-lg bg-surface-2 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    {isIncoming ? (
                      <ArrowDownLeft className="h-4 w-4 text-accent" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.descripcion || tx.tipo}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString("es-CL")}</p>
                    </div>
                  </div>
                  <p className={`font-mono text-sm font-semibold ${isIncoming ? "text-accent" : "text-destructive"}`}>
                    {isIncoming ? "+" : "-"}{formatMoney(tx.monto)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No hay transacciones registradas</p>
        )}
      </div>
    </div>
  );
}
