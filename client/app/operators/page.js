"use client"
import { useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Search, TrendingUp, Clock, ClipboardList, BarChart3, Plus, MoreHorizontal } from "lucide-react"

const operators = [
  { id: "1", name: "Ravi Patel", dept: "Weld Shop", shift: "Morning", studies: 28, avgCycle: 320, efficiency: 85, va: 68, trend: +3 },
  { id: "2", name: "Meena Shah", dept: "Assembly", shift: "Morning", studies: 15, avgCycle: 290, efficiency: 72, va: 61, trend: -2 },
  { id: "3", name: "Suresh Kumar", dept: "Brazing", shift: "Evening", studies: 34, avgCycle: 410, efficiency: 91, va: 74, trend: +5 },
  { id: "4", name: "Priya Nair", dept: "Inspection", shift: "Morning", studies: 9, avgCycle: 180, efficiency: 68, va: 59, trend: +1 },
  { id: "5", name: "Anand Joshi", dept: "Packing", shift: "Evening", studies: 21, avgCycle: 240, efficiency: 79, va: 66, trend: -1 },
  { id: "6", name: "Deepa Reddy", dept: "CNC", shift: "Night", studies: 17, avgCycle: 520, efficiency: 88, va: 71, trend: +4 },
]

export default function OperatorsPage() {
  const [search, setSearch] = useState("")
  const filtered = operators.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.dept.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppLayout>
      <Header title="Operators" subtitle={`${operators.length} registered operators`} action={{ href: "/operators/new", label: "Add Operator" }} />

      <div className="p-6 space-y-4">
        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Operators", value: operators.length, color: "text-orange-400" },
            { label: "Avg Efficiency", value: `${Math.round(operators.reduce((s,o)=>s+o.efficiency,0)/operators.length)}%`, color: "text-green-400" },
            { label: "Avg Cycle Time", value: `${Math.round(operators.reduce((s,o)=>s+o.avgCycle,0)/operators.length)}s`, color: "text-sky-400" },
            { label: "Total Studies", value: operators.reduce((s,o)=>s+o.studies,0), color: "text-purple-400" },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</div>
              <div className={cn("text-2xl font-bold mt-1", s.color)}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 max-w-xs">
          <Search size={13} className="text-slate-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search operators..."
            className="bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>

        {/* Operator cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(op => (
            <Card key={op.id} className="hover:border-slate-700 transition-all stat-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-base font-bold text-white">
                      {op.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{op.name}</div>
                      <div className="text-xs text-slate-500">{op.dept} · {op.shift}</div>
                    </div>
                  </div>
                  <button className="text-slate-600 hover:text-slate-400 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Efficiency meter */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Efficiency</span>
                    <span className={cn("text-xs font-bold", op.efficiency >= 85 ? "text-green-400" : op.efficiency >= 75 ? "text-amber-400" : "text-orange-400")}>
                      {op.efficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", op.efficiency >= 85 ? "bg-green-500" : op.efficiency >= 75 ? "bg-amber-500" : "bg-orange-500")}
                      style={{ width: `${op.efficiency}%` }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-slate-200">{op.studies}</div>
                    <div className="text-[10px] text-slate-600">Studies</div>
                  </div>
                  <div className="text-center border-x border-slate-800">
                    <div className="text-sm font-bold text-sky-400">{op.avgCycle}s</div>
                    <div className="text-[10px] text-slate-600">Avg Cycle</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{op.va}%</div>
                    <div className="text-[10px] text-slate-600">VA Time</div>
                  </div>
                </div>

                {/* Trend */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className={cn("flex items-center gap-1 text-xs", op.trend > 0 ? "text-green-400" : op.trend < 0 ? "text-red-400" : "text-slate-500")}>
                    <TrendingUp size={11} />
                    <span>{op.trend > 0 ? "+" : ""}{op.trend}% vs last month</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-orange-400">
                    View studies
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
