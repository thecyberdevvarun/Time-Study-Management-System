import { cn } from "@/lib/utils"

export function Badge({ children, className, variant = "default" }) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border border-slate-700",
    primary: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  }
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  )
}
