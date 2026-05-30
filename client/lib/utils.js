import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatTime(ms) {
  if (!ms) return "0s"
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0) return `${h}h ${m}m ${s}s`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function formatTimestamp(ms) {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600).toString().padStart(2, "0")
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0")
  const s = (totalSec % 60).toString().padStart(2, "0")
  return `${h}:${m}:${s}`
}

export function getEfficiencyColor(pct) {
  if (pct >= 85) return "text-green-400"
  if (pct >= 70) return "text-amber-400"
  return "text-red-400"
}

export function getStatusColor(status) {
  const map = {
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    in_progress: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ai_processing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  }
  return map[status] || map.draft
}
