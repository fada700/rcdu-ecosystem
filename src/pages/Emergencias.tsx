import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Send } from "lucide-react";
import { useState } from "react";

const emergencyTypes = [
  "🚗 Robo de Vehículo",
  "🔫 Tiroteo",
  "🚨 Asalto",
  "🏥 Emergencia Médica",
  "🔥 Incendio",
  "📢 Otro",
];

export default function Emergencias() {
  const [selectedType, setSelectedType] = useState(emergencyTypes[0]);
  const [clickedPos, setClickedPos] = useState<{ x: number; y: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedPos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-destructive/10 p-2">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Reportar Emergencia</h1>
          <p className="text-sm text-muted-foreground">Selecciona la ubicación en el mapa · Llega al MDT en tiempo real</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
          EN VIVO
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-1 lg:col-span-3 relative"
        >
          <div
            className="relative cursor-crosshair rounded-xl border border-border overflow-hidden"
            onClick={handleMapClick}
          >
            <img
              src="/images/rensselaer-map.png"
              alt="Mapa de Rensselaer County"
              className="w-full h-auto"
            />
            {clickedPos && (
              <div
                className="absolute w-6 h-6 -ml-3 -mt-3 pointer-events-none"
                style={{ left: `${clickedPos.x}%`, top: `${clickedPos.y}%` }}
              >
                <MapPin className="h-6 w-6 text-destructive drop-shadow-lg" />
                <span className="absolute top-0 left-0 h-6 w-6 rounded-full bg-destructive/30 animate-ping" />
              </div>
            )}
            {!clickedPos && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-surface-2/90 backdrop-blur px-4 py-2 text-xs text-foreground border border-border">
                👆 Haz clic en el mapa para marcar la ubicación exacta
              </div>
            )}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-2 space-y-4"
        >
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Tipo de Emergencia</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
            >
              {emergencyTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Calle / Sector</label>
            <input
              placeholder="Ej: Av. Balmaceda con La Victoria"
              className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Descripción del Incidente</label>
            <textarea
              placeholder="¿Qué está ocurriendo? Sé específico..."
              rows={4}
              className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-surface-2 border border-border px-3 py-2.5 text-xs text-muted-foreground">
            <MapPin className="h-4 w-4 text-destructive" />
            {clickedPos
              ? `Ubicación marcada: Sector ${clickedPos.x}, ${clickedPos.y}`
              : "Selecciona la ubicación en el mapa"}
          </div>

          <div className="rounded-lg border border-warning/30 bg-warning/5 px-4 py-3">
            <p className="text-xs text-warning font-medium">⚠️ Los reportes falsos tienen consecuencias en el roleplay.</p>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground hover:bg-surface-3 transition-colors">
              Cancelar
            </button>
            <button className="flex-1 rounded-lg bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2">
              <Send className="h-4 w-4" /> Enviar reporte
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
