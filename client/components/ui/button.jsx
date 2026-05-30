import { cn } from "@/lib/utils"

export function Button({ children, className, variant = "default", size = "md", disabled, onClick, type = "button", ...props }) {
  const variants = {
    default: "bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20",
    outline: "border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white hover:bg-slate-800",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    success: "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20",
    sky: "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700",
  }
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-sm",
    icon: "p-2",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
