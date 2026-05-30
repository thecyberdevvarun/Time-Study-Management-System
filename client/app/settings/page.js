"use client"
import { useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Save, Cpu, Database, Bell, Shield, Factory } from "lucide-react"

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={cn("w-10 h-5 rounded-full transition-all relative", enabled ? "bg-orange-500" : "bg-slate-700")}
  >
    <div className={cn("w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all", enabled ? "left-5" : "left-0.5")} />
  </button>
)

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    aiAutoDetect: true, aiConfidence: 65, taktTime: 300,
    emailNotify: true, aiNotify: false, weeklyReport: true,
  })
  const set = (k, v) => setSettings(prev => ({ ...prev, [k]: v }))

  return (
    <AppLayout>
      <Header title="Settings" subtitle="Configure your TSMS workspace" />
      <div className="p-6 max-w-2xl space-y-4">

        <Card>
          <CardHeader><div className="flex items-center gap-2"><Factory size={15} className="text-orange-400" /><CardTitle>Production Settings</CardTitle></div></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <div className="text-sm text-slate-200">Takt Time</div>
                <div className="text-xs text-slate-500">Customer demand rate in seconds</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.taktTime}
                  onChange={e => set("taktTime", e.target.value)}
                  className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none text-right"
                />
                <span className="text-xs text-slate-500">sec</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm text-slate-200">VA Threshold</div>
                <div className="text-xs text-slate-500">Minimum VA% target for line efficiency</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={65} className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 outline-none text-right" />
                <span className="text-xs text-slate-500">%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><div className="flex items-center gap-2"><Cpu size={15} className="text-purple-400" /><CardTitle>AI Pipeline</CardTitle></div></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <div>
                <div className="text-sm text-slate-200">Auto-run AI on upload</div>
                <div className="text-xs text-slate-500">Start YOLO detection automatically after video upload</div>
              </div>
              <Toggle enabled={settings.aiAutoDetect} onChange={v => set("aiAutoDetect", v)} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm text-slate-200">Confidence Threshold</div>
                <div className="text-xs text-slate-500">Minimum AI confidence to accept a detection</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range" min={50} max={95} value={settings.aiConfidence}
                  onChange={e => set("aiConfidence", e.target.value)}
                  className="w-24 accent-purple-500"
                />
                <span className="text-sm text-purple-400 w-10 text-right">{settings.aiConfidence}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><div className="flex items-center gap-2"><Bell size={15} className="text-sky-400" /><CardTitle>Notifications</CardTitle></div></CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "emailNotify", label: "Email alerts", desc: "Send email when a study is completed" },
              { key: "aiNotify", label: "AI job notifications", desc: "Notify when AI processing finishes" },
              { key: "weeklyReport", label: "Weekly digest", desc: "Auto-send weekly efficiency summary" },
            ].map(n => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div>
                  <div className="text-sm text-slate-200">{n.label}</div>
                  <div className="text-xs text-slate-500">{n.desc}</div>
                </div>
                <Toggle enabled={settings[n.key]} onChange={v => set(n.key, v)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button><Save size={13} /> Save Settings</Button>
        </div>
      </div>
    </AppLayout>
  )
}
