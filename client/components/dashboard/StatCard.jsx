import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function StatCard({ label, value, unit, change, changeLabel, icon: Icon, color = "orange", className }) {
  const colorMap = {
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", glow: "glow-orange" },
    sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", glow: "glow-sky" },
    green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", glow: "glow-green" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  }
  const c = colorMap[color]
  const isPositive = change > 0
  const isNeutral = change === 0

  return (
    <div className={cn("bg-slate-900 border border-slate-800 rounded-xl p-5 stat-card relative overflow-hidden", className)}>
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="text-[11px] text-slate-500 uppercase tracking-widest font-medium mb-1">{label}</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2 text-xs", isPositive ? "text-green-400" : isNeutral ? "text-slate-500" : "text-red-400")}>
              {isNeutral ? <Minus size={11} /> : isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              <span>{isPositive ? "+" : ""}{change}% {changeLabel}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", c.bg, c.border)}>
            <Icon size={18} className={c.text} />
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-0.5", c.bg)} />
    </div>
  )
}
