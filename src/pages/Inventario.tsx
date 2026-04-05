import { Package } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { name: "Teléfono Encriptado", category: "Tecnología", qty: 1 },
];

export default function Inventario() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" /> Inventario
        </h1>
        <p className="text-sm text-muted-foreground">{items.length} items en tu inventario</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 card-hover"
          >
            <div className="aspect-square rounded-lg bg-surface-3 flex items-center justify-center mb-3">
              <Package className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.category}</p>
            <p className="mt-1 text-xs text-primary font-medium">Cantidad: {item.qty}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
