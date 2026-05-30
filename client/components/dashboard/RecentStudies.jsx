import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"
import { getStatusColor, formatTime } from "@/lib/utils"

export default function RecentStudies({ studies }) {
  const statusLabel = {
    completed: "Completed",
    in_progress: "In Progress",
    ai_processing: "AI Processing",
    draft: "Draft",
    pending: "Pending",
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Studies</CardTitle>
        <Link href="/studies">
          <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-orange-400 -mr-1">
            View all <ArrowRight size={11} />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {studies.map((s) => (
            <Link key={s.id} href={`/studies/${s.id}`}>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all cursor-pointer group">
                {/* Efficiency ring */}
                <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                  style={{
                    borderColor: s.efficiency >= 85 ? "#22c55e" : s.efficiency >= 75 ? "#f59e0b" : "#f97316",
                    color: s.efficiency >= 85 ? "#22c55e" : s.efficiency >= 75 ? "#f59e0b" : "#f97316",
                  }}>
                  {s.efficiency}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-200 truncate group-hover:text-white transition-colors">{s.title}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-600">
                      <User size={9} /> {s.operator}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-600">
                      <Clock size={9} /> {s.cycleTime}s
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(s.status)}>
                  {statusLabel[s.status]}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
