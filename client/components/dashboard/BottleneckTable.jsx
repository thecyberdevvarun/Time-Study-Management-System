import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BottleneckTable({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bottleneck Analysis</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {data.map((row, i) => {
            const isBottleneck = row.overrun > 0
            const pct = Math.min((row.avgTime / row.takt) * 100, 150)
            return (
              <div key={i} className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                isBottleneck ? "bg-red-500/5 border-red-500/20" : "bg-green-500/5 border-green-500/10"
              )}>
                {isBottleneck
                  ? <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                  : <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-200 truncate">{row.station}</div>
                  <div className="mt-1.5 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", isBottleneck ? "bg-red-500" : "bg-green-500")}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={cn("text-xs font-bold", isBottleneck ? "text-red-400" : "text-green-400")}>
                    {row.avgTime}s
                  </div>
                  {isBottleneck && (
                    <div className="text-[10px] text-red-400/70">+{row.overrun}% over takt</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-600">
          <span>Takt time: 300s</span>
          <span>Updated just now</span>
        </div>
      </CardContent>
    </Card>
  )
}
