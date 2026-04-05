import { motion } from "framer-motion";
import { Store as StoreIcon, Search, Car } from "lucide-react";
import { useState } from "react";

const categories = ["Todos", "Vehículos", "Armas", "Tecnología", "Licencias"];

const vehicles = [
  { name: "Bullhorn Determinator", brand: "Bullhorn · 2030", price: "$22.000.000", tag: "GAMA ALTA", tagColor: "bg-destructive/80 text-destructive-foreground" },
  { name: "Falcon Asvancer 350", brand: "Falcon · 2030", price: "$28.000.000", tag: "GAMA ALTA", tagColor: "bg-destructive/80 text-destructive-foreground" },
  { name: "Vallfire Everest VRD Max", brand: "Vallfire · 2033", price: "$28.000.000", tag: "GAMA ALTA", tagColor: "bg-destructive/80 text-destructive-foreground" },
  { name: "Chevron Amigo S", brand: "Chevron · 2011", price: "$27.000.000", tag: "GAMA ALTA", tagColor: "bg-destructive/80 text-destructive-foreground" },
  { name: "Nitro Speedster X1", brand: "Nitro · 2028", price: "$15.000.000", tag: "GAMA MEDIA", tagColor: "bg-warning/80 text-warning-foreground" },
  { name: "Urban Runner 200", brand: "Urban · 2025", price: "$8.500.000", tag: "GAMA BAJA", tagColor: "bg-primary/80 text-primary-foreground" },
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <StoreIcon className="h-6 w-6 text-primary" /> Store
        </h1>
        <p className="text-sm text-muted-foreground">{filtered.length} items disponibles</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 flex-1 max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar item..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground hover:bg-surface-3"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((vehicle, i) => (
          <motion.div
            key={vehicle.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-xl border border-border bg-card overflow-hidden card-hover"
          >
            <div className="relative aspect-video bg-surface-3 flex items-center justify-center">
              <Car className="h-12 w-12 text-muted-foreground/30" />
              <span className={`absolute top-2 right-2 rounded px-2 py-0.5 text-[10px] font-bold ${vehicle.tagColor}`}>
                {vehicle.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground">{vehicle.name}</h3>
              <p className="text-xs text-muted-foreground">{vehicle.brand}</p>
              <p className="mt-2 text-lg font-bold text-accent">{vehicle.price}</p>
              <button className="mt-3 w-full rounded-lg border border-primary/30 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
                💳 Saldo Insuficiente
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
