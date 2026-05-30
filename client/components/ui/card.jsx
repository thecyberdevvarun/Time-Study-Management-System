import { cn } from "@/lib/utils"

export function Card({ children, className, ...props }) {
  return (
    <div className={cn("bg-slate-900 border border-slate-800 rounded-xl", className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return <div className={cn("px-5 pt-5 pb-3", className)}>{children}</div>
}

export function CardTitle({ children, className }) {
  return <h3 className={cn("text-sm font-semibold text-slate-300 uppercase tracking-wider", className)}>{children}</h3>
}

export function CardContent({ children, className }) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>
}
