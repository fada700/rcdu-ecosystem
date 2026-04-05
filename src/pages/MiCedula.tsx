import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function MiCedula() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" /> Mi Cédula de Identidad
        </h1>
        <p className="text-sm text-muted-foreground">Identidad oficial registrada</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg"
      >
        <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-surface-2 to-surface-3 p-6 glow-blue">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">República de Chileverse</p>
            <p className="text-sm font-bold text-primary uppercase tracking-wider">Cédula de Identidad</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Photo */}
            <div className="col-span-1">
              <div className="aspect-[3/4] rounded-lg bg-surface-4 border border-border flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-surface-3 flex items-center justify-center text-xl font-bold text-foreground">
                  RC
                </div>
              </div>
            </div>

            {/* Data */}
            <div className="col-span-2 space-y-2">
              {[
                { label: "APELLIDOS", value: "CHAVEZ GARCIA" },
                { label: "NOMBRES", value: "LUIS" },
                { label: "NACIONALIDAD", value: "CHILENA" },
                { label: "FECHA NAC.", value: "02/04/2009" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{field.label}</p>
                  <p className="text-xs font-semibold text-foreground">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RUT */}
          <div className="mt-4 rounded-lg bg-primary/10 border border-primary/20 px-4 py-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">RUT</p>
            <p className="text-lg font-mono font-bold text-primary text-glow-blue">17313023-6</p>
          </div>

          {/* Footer */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Emisión</p>
              <p className="text-xs font-mono text-foreground">05/04/2026</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">DOC. N°</p>
              <p className="text-xs font-mono text-foreground">DNI992KMERC-DU9</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-center text-[9px] text-muted-foreground">
              VersePay · República de Chileverse · Uso exclusivo plataforma
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
