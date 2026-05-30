import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { StatCard } from "@/components/dashboard/StatCard"
import VaNvaChart from "@/components/charts/VaNvaChart"
import CycleTrendChart from "@/components/charts/CycleTrendChart"
import OperatorChart from "@/components/charts/OperatorChart"
import BottleneckTable from "@/components/dashboard/BottleneckTable"
import RecentStudies from "@/components/dashboard/RecentStudies"
import {
  mockStats, mockStudies, mockCycleTrend,
  mockVaNva, mockOperatorPerf, mockBottlenecks
} from "@/lib/mock-data"
import {
  ClipboardList, Timer, Gauge, Cpu, TrendingUp, AlertTriangle
} from "lucide-react"

export default function DashboardPage() {
  return (
    <AppLayout>
      <Header
        title="Dashboard"
        subtitle="Live overview of all time studies and line performance"
        action={{ href: "/studies/new", label: "New Study" }}
      />

      <div className="p-6 space-y-6 grid-bg min-h-screen">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Studies"
            value={mockStats.totalStudies}
            icon={ClipboardList}
            color="orange"
            change={12}
            changeLabel="this month"
          />
          <StatCard
            label="Avg Cycle Time"
            value={mockStats.avgCycleTime}
            unit="sec"
            icon={Timer}
            color="sky"
            change={-4.2}
            changeLabel="vs last week"
          />
          <StatCard
            label="Line Efficiency"
            value={`${mockStats.lineEfficiency}%`}
            icon={Gauge}
            color="green"
            change={2.1}
            changeLabel="vs yesterday"
          />
          <StatCard
            label="AI Jobs Today"
            value={mockStats.aiJobsToday}
            icon={Cpu}
            color="purple"
            change={0}
            changeLabel="same as avg"
          />
        </div>

        {/* Quick metrics row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <TrendingUp size={18} className="text-green-400" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest">VA Time</div>
              <div className="text-xl font-bold text-green-400">{mockStats.vaPercent}%</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[11px] text-slate-500 uppercase tracking-widest">NVA Time</div>
              <div className="text-xl font-bold text-red-400">{mockStats.nvaPercent}%</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <AlertTriangle size={18} className="text-amber-400" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest">Bottlenecks</div>
              <div className="text-xl font-bold text-amber-400">2</div>
              <div className="text-[10px] text-slate-600">Above takt time</div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <Gauge size={18} className="text-sky-400" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-widest">Takt Time</div>
              <div className="text-xl font-bold text-sky-400">300s</div>
              <div className="text-[10px] text-slate-600">Current demand rate</div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <CycleTrendChart data={mockCycleTrend} />
          </div>
          <div>
            <VaNvaChart data={mockVaNva} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentStudies studies={mockStudies.slice(0, 5)} />
          </div>
          <div className="space-y-4">
            <OperatorChart data={mockOperatorPerf} />
          </div>
        </div>

        {/* Bottlenecks */}
        <BottleneckTable data={mockBottlenecks} />
      </div>
    </AppLayout>
  )
}
