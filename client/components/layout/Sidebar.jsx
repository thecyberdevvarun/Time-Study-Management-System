"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import {
  LayoutDashboard, Video, ClipboardList, Users, BarChart3,
  Settings, Factory, ChevronRight, Bell, Search, LogOut,
  Cpu, FileSpreadsheet
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "ie_analyst", "viewer"] },
  { href: "/studies", icon: ClipboardList, label: "Time Studies", roles: ["admin", "ie_analyst", "viewer"] },
  { href: "/videos", icon: Video, label: "Videos", roles: ["admin", "ie_analyst"] },
  { href: "/reports", icon: FileSpreadsheet, label: "Reports", roles: ["admin", "ie_analyst", "viewer"] },
  { href: "/operators", icon: Users, label: "Operators", roles: ["admin"] },
  { href: "/analytics", icon: BarChart3, label: "Analytics", roles: ["admin", "ie_analyst", "viewer"] },
]

const bottomItems = [
  { href: "/settings", icon: Settings, label: "Settings", roles: ["admin"] },
]

const ROLE_LABELS = {
  admin: "Admin",
  ie_analyst: "IE Analyst",
  viewer: "Viewer",
}

const ROLE_COLORS = {
  admin: "from-red-400 to-red-600",
  ie_analyst: "from-orange-400 to-orange-600",
  viewer: "from-blue-400 to-blue-600",
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load user from cookies
    const userCookie = Cookies.get('user')
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie))
      } catch (e) {
        console.error('Failed to parse user cookie:', e)
      }
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    Cookies.remove('user')
    router.push('/login')
  }

  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Factory size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">TSMS</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Time Study Pro</div>
          </div>
        </div>
      </div>

      {/* AI Status indicator */}
      <div className="mx-4 mt-4 px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-500/20">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-purple-400" />
          <span className="text-[11px] text-purple-400 font-medium">AI Engine Active</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 recording-pulse" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] text-slate-600 uppercase tracking-widest px-3 mb-2 font-medium">Navigation</div>
        {navItems
          .filter(item => !item.roles || item.roles.includes(user?.role))
          .map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  active
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                )}
              >
                <Icon size={16} className={active ? "text-orange-400" : "text-slate-500 group-hover:text-slate-300"} />
                {label}
                {active && <ChevronRight size={12} className="ml-auto text-orange-400/60" />}
              </Link>
            )
          })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-slate-800 pt-4 space-y-0.5">
        {bottomItems
          .filter(item => !item.roles || item.roles.includes(user?.role))
          .map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
            >
              <Icon size={16} className="text-slate-500" />
              {label}
            </Link>
          ))}
        {/* User */}
        <div className="mt-3 pt-3 border-t border-slate-800">
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer group transition-all">
              <div className={cn(
                "w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0",
                ROLE_COLORS[user.role] || "from-orange-400 to-orange-600"
              )}>
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-300 truncate">{user.name || user.email?.split('@')[0]}</div>
                <div className="text-[10px] text-slate-600 truncate">{ROLE_LABELS[user.role] || user.role}</div>
              </div>
              <button onClick={handleLogout} className="text-slate-600 group-hover:text-red-400 transition-colors">
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer group transition-all">
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-400 flex-shrink-0">
                ?
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-400 truncate">Not logged in</div>
                <div className="text-[10px] text-slate-600 truncate">—</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
