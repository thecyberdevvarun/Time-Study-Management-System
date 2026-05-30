"use client"
import { useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockStudies } from "@/lib/mock-data"
import { getStatusColor } from "@/lib/utils"
import {
  Search, Filter, Download, Eye, Trash2,
  Clock, User, Activity, ChevronUp, ChevronDown,
  PlayCircle, Brain
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const STATUS_FILTERS = ["All", "completed", "in_progress", "ai_processing", "draft"]
const STATUS_LABELS = {
  All: "All",
  completed: "Completed",
  in_progress: "In Progress",
  ai_processing: "AI Processing",
  draft: "Draft",
}

export default function StudiesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortKey, setSortKey] = useState("date")
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = mockStudies
    .filter(s => statusFilter === "All" || s.status === statusFilter)
    .filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.operator.toLowerCase().includes(search.toLowerCase()) ||
      s.workOrder.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortKey], bVal = b[sortKey]
      if (typeof aVal === "string") aVal = aVal.toLowerCase(), bVal = bVal.toLowerCase()
      return sortAsc ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
    })

  const toggleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(false) }
  }

  const SortIcon = ({ field }) => {
    if (sortKey !== field) return <ChevronUp size={11} className="opacity-20" />
    return sortAsc ? <ChevronUp size={11} className="text-orange-400" /> : <ChevronDown size={11} className="text-orange-400" />
  }

  return (
    <AppLayout>
      <Header
        title="Time Studies"
        subtitle={`${mockStudies.length} total studies`}
        action={{ href: "/studies/new", label: "New Study" }}
      />

      <div className="p-6 space-y-4">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-48 max-w-xs">
            <Search size={13} className="text-slate-600 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search studies, operators..."
              className="bg-transparent text-xs text-slate-300 placeholder:text-slate-600 outline-none w-full"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  statusFilter === s
                    ? "bg-orange-500 text-white"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter size={13} /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={13} /> Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    {[
                      { key: "title", label: "Study" },
                      { key: "workOrder", label: "Work Order" },
                      { key: "operator", label: "Operator" },
                      { key: "status", label: "Status" },
                      { key: "cycleTime", label: "Cycle Time" },
                      { key: "efficiency", label: "Efficiency" },
                      { key: "date", label: "Date" },
                    ].map(col => (
                      <th
                        key={col.key}
                        onClick={() => toggleSort(col.key)}
                        className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-300 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          {col.label} <SortIcon field={col.key} />
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filtered.map(s => (
                    <tr key={s.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-slate-200 max-w-52 truncate group-hover:text-white">{s.title}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{s.operations} operations</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-400 font-mono">{s.workOrder}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">
                            {s.operator.charAt(0)}
                          </div>
                          <span className="text-xs text-slate-400">{s.operator}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={getStatusColor(s.status)}>
                          {STATUS_LABELS[s.status] || s.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs text-slate-300">
                          <Clock size={11} className="text-slate-600" />
                          {s.cycleTime}s
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full w-16 overflow-hidden">
                            <div
                              className={cn("h-full rounded-full", s.efficiency >= 85 ? "bg-green-500" : s.efficiency >= 75 ? "bg-amber-500" : "bg-orange-500")}
                              style={{ width: `${s.efficiency}%` }}
                            />
                          </div>
                          <span className={cn("text-xs font-semibold", s.efficiency >= 85 ? "text-green-400" : s.efficiency >= 75 ? "text-amber-400" : "text-orange-400")}>
                            {s.efficiency}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-500">{s.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/studies/${s.id}`}>
                            <Button variant="ghost" size="icon" className="w-7 h-7">
                              <Eye size={13} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="w-7 h-7 text-purple-400">
                            <Brain size={13} />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-7 h-7 text-red-400 hover:text-red-300">
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-600 text-sm">
                No studies match your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
