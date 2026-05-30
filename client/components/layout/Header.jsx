"use client"
import { Bell, Search, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header({ title, subtitle, action }) {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
        {subtitle && <p className="text-[11px] text-slate-500 truncate">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-52">
        <Search size={13} className="text-slate-600" />
        <input
          type="text"
          placeholder="Search studies..."
          className="bg-transparent text-xs text-slate-400 placeholder:text-slate-600 outline-none w-full"
        />
      </div>

      {/* Notifications */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
        <Bell size={15} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-400 rounded-full" />
      </button>

      {/* Action */}
      {action && (
        <Link href={action.href}>
          <Button size="sm">
            <Plus size={13} />
            {action.label}
          </Button>
        </Link>
      )}
    </header>
  )
}
