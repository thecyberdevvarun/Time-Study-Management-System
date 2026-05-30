"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const RADIAN = Math.PI / 180

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function VaNvaChart({ data }) {
  const va = data.find(d => d.name === "Value Added")
  const nva = data.find(d => d.name === "Non-Value Added")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>VA / NVA Split</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#94a3b8" }}
                formatter={(v) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Value Added</div>
            <div className="text-lg font-bold text-green-400 mt-0.5">{va?.value}%</div>
            <div className="text-[10px] text-slate-600">Target &gt; 65%</div>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Non-Value Added</div>
            <div className="text-lg font-bold text-red-400 mt-0.5">{nva?.value}%</div>
            <div className="text-[10px] text-slate-600">Target &lt; 35%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
