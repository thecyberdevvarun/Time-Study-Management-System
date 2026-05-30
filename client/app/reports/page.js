"use client"
import { useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockStudies } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  FileSpreadsheet, FileText, Download, Filter, Calendar,
  CheckCircle, Clock, TrendingUp, BarChart3, Eye, Loader2
} from "lucide-react"

const REPORT_TYPES = [
  {
    id: "cycle",
    title: "Cycle Time Report",
    desc: "Operation-wise start/end times, net cycle time, and VA/NVA split per study.",
    icon: Clock,
    color: "orange",
    formats: ["Excel", "PDF"],
  },
  {
    id: "efficiency",
    title: "Line Efficiency Report",
    desc: "Overall Equipment Effectiveness, bottleneck analysis, and shift-wise comparison.",
    icon: TrendingUp,
    color: "green",
    formats: ["Excel", "PDF"],
  },
  {
    id: "operator",
    title: "Operator Performance",
    desc: "Benchmark operators side-by-side with cycle time, VA%, and deviation from standard.",
    icon: BarChart3,
    color: "sky",
    formats: ["Excel", "PDF"],
  },
  {
    id: "summary",
    title: "Management Summary",
    desc: "One-page executive summary with KPIs, trend charts, and action items.",
    icon: FileText,
    color: "purple",
    formats: ["PDF"],
  },
]

export default function ReportsPage() {
  const [generating, setGenerating] = useState(null)

  const handleGenerate = (id, format) => {
    setGenerating(`${id}-${format}`)
    setTimeout(() => setGenerating(null), 2000)
  }

  const colorMap = {
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
    green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
    sky: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  }

  return (
    <AppLayout>
      <Header title="Reports" subtitle="Generate and export time study analysis reports" />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
            <Calendar size={13} className="text-slate-600" />
            <select className="bg-transparent text-xs text-slate-400 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
              <option>Custom range</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
            <Filter size={13} className="text-slate-600" />
            <select className="bg-transparent text-xs text-slate-400 outline-none">
              <option>All work centers</option>
              <option>Weld Shop</option>
              <option>Assembly</option>
              <option>Brazing</option>
            </select>
          </div>
        </div>

        {/* Report type cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPORT_TYPES.map(rt => {
            const c = colorMap[rt.color]
            const Icon = rt.icon
            return (
              <Card key={rt.id} className="hover:border-slate-700 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0", c.bg, c.border)}>
                      <Icon size={20} className={c.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-200">{rt.title}</div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rt.desc}</p>
                      <div className="flex items-center gap-2 mt-4">
                        {rt.formats.map(fmt => {
                          const key = `${rt.id}-${fmt}`
                          const isGenerating = generating === key
                          return (
                            <Button
                              key={fmt}
                              variant={fmt === "Excel" ? "success" : "outline"}
                              size="sm"
                              onClick={() => handleGenerate(rt.id, fmt)}
                              disabled={!!generating}
                            >
                              {isGenerating
                                ? <Loader2 size={12} className="animate-spin" />
                                : fmt === "Excel" ? <FileSpreadsheet size={12} /> : <FileText size={12} />
                              }
                              {isGenerating ? "Generating..." : `Export ${fmt}`}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent exports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {[
                { name: "Cycle_Time_Report_WO1182_20250528.xlsx", type: "Excel", size: "84 KB", time: "2h ago", status: "ready" },
                { name: "Operator_Performance_May2025.pdf", type: "PDF", size: "1.2 MB", time: "1d ago", status: "ready" },
                { name: "Line_Efficiency_Week22.xlsx", type: "Excel", size: "152 KB", time: "3d ago", status: "ready" },
                { name: "Management_Summary_Q2.pdf", type: "PDF", size: "640 KB", time: "5d ago", status: "ready" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/30 transition-all group">
                  {f.type === "Excel"
                    ? <FileSpreadsheet size={16} className="text-green-400 flex-shrink-0" />
                    : <FileText size={16} className="text-sky-400 flex-shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-300 truncate">{f.name}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{f.size} · {f.time}</div>
                  </div>
                  <Badge variant={f.type === "Excel" ? "success" : "info"}>{f.type}</Badge>
                  <Button variant="ghost" size="icon" className="w-7 h-7 opacity-0 group-hover:opacity-100">
                    <Download size={13} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
