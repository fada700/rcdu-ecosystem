import { Search, Bell, Power } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
        <span className="text-sm font-bold text-foreground">ChileVerse</span>
        <span className="text-xs text-muted-foreground">| Portal de USUARIO</span>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 w-80">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-surface-3 hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-warning" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-surface-3 flex items-center justify-center text-xs font-bold text-foreground">
            RC
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-foreground">eqox_</p>
            <p className="text-[10px] font-mono text-muted-foreground">17313023-6</p>
          </div>
        </div>
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
          <Power className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
