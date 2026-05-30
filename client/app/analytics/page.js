"use client"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CycleTrendChart from "@/components/charts/CycleTrendChart"
import OperatorChart from "@/components/charts/OperatorChart"
import VaNvaChart from "@/components/charts/VaNvaChart"
import { mockCycleTrend, mockOperatorPerf, mockVaNva, mockActivityBreakdown } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { cn, formatTime } from "@/lib/utils"
import { TrendingDown, AlertTriangle, CheckCircle, Zap } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <Header title="Analytics" subtitle="Deep dive into time study data and process efficiency" />

      <div className="p-6 space-y-6">
        {/* Top insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-red-400">Bottleneck Detected</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">Weld Station A</div>
              <div className="text-xs text-slate-500 mt-1">40% over takt · 420s avg vs 300s target</div>
            </div>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
            <TrendingDown size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-amber-400">High NVA Detected</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">Walking + Waiting</div>
              <div className="text-xs text-slate-500 mt-1">355s total NVA · 38% of cycle time</div>
            </div>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-green-400">Best Performer</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">Suresh Kumar</div>
              <div className="text-xs text-slate-500 mt-1">91% efficiency · 74% VA time</div>
            </div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CycleTrendChart data={mockCycleTrend} />
          <VaNvaChart data={mockVaNva} />
        </div>

        {/* Activity breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Time Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActivityBreakdown.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400 text-right flex-shrink-0">{a.activity}</div>
                  <div className="flex-1 h-6 bg-slate-800 rounded-md overflow-hidden">
                    <div
                      className={cn("h-full rounded-md flex items-center px-2 transition-all", a.va ? "bg-green-500/40" : "bg-red-500/40")}
                      style={{ width: `${(a.time / 520) * 100}%` }}
                    >
                      <span className="text-[10px] font-medium text-white">{a.time}s</span>
                    </div>
                  </div>
                  <Badge variant={a.va ? "success" : "danger"} className="flex-shrink-0 w-12 justify-center">
                    {a.va ? "VA" : "NVA"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <OperatorChart data={mockOperatorPerf} />
      </div>
    </AppLayout>
  )
}
