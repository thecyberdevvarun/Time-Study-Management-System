"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function OperatorChart({ data }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Operator Efficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#475569" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#475569" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#94a3b8" }}
                formatter={(v) => [`${v}%`, "Efficiency"]}
              />
              <Bar dataKey="efficiency" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.efficiency >= 85 ? "#22c55e" : entry.efficiency >= 75 ? "#f59e0b" : "#f97316"} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Mini legend */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500 inline-block" /> ≥85% Excellent</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> ≥75% Good</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-orange-500 inline-block" /> &lt;75% Needs attention</span>
        </div>
      </CardContent>
    </Card>
  )
}
