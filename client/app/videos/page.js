"use client"
import { useState } from "react"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Film, Play, Trash2, Download, Brain, Clock, HardDrive, CheckCircle, Loader2, Upload } from "lucide-react"

const videos = [
  { id: "v1", name: "weld_station_A_20250528.mp4", size: "1.2 GB", duration: "01:50:00", study: "WO-2024-1182", status: "processed", fps: 30 },
  { id: "v2", name: "assembly_line3_morning.mp4", size: "890 MB", duration: "01:12:00", study: "WO-2024-1183", status: "processing", fps: 30 },
  { id: "v3", name: "brazing_cell_B_suresh.mp4", size: "1.8 GB", duration: "02:20:00", study: "WO-2024-1185", status: "processed", fps: 60 },
  { id: "v4", name: "inspection_station2.mp4", size: "430 MB", duration: "00:48:00", study: "WO-2024-1187", status: "uploaded", fps: 30 },
  { id: "v5", name: "packing_line_evening.mp4", size: "720 MB", duration: "01:05:00", study: "WO-2024-1190", status: "uploaded", fps: 30 },
]

const statusMap = {
  processed: { label: "Processed", variant: "success", icon: CheckCircle },
  processing: { label: "Processing", variant: "purple", icon: Loader2 },
  uploaded: { label: "Uploaded", variant: "info", icon: Film },
}

export default function VideosPage() {
  return (
    <AppLayout>
      <Header title="Videos" subtitle={`${videos.length} videos · ${videos.reduce((s,v) => s + parseFloat(v.size), 0).toFixed(1)} GB total`} />

      <div className="p-6 space-y-4">
        {/* Upload prompt */}
        <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors cursor-pointer group">
          <Upload size={28} className="text-slate-600 group-hover:text-orange-400 transition-colors mx-auto mb-2" />
          <div className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Drop video files here or click to upload</div>
          <div className="text-xs text-slate-600 mt-1">MP4, MOV, AVI · Max 5 GB per file</div>
        </div>

        {/* Video list */}
        <div className="space-y-2">
          {videos.map(v => {
            const s = statusMap[v.status]
            const Icon = s.icon
            return (
              <div key={v.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex items-center gap-4 transition-all group">
                {/* Thumbnail placeholder */}
                <div className="w-24 h-14 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700">
                  <Film size={20} className="text-slate-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{v.name}</div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={10} /> {v.duration}</span>
                    <span className="flex items-center gap-1"><HardDrive size={10} /> {v.size}</span>
                    <span>{v.fps} FPS</span>
                    <span className="text-slate-600">Study: {v.study}</span>
                  </div>
                </div>

                <Badge variant={s.variant}>
                  <Icon size={10} className={v.status === "processing" ? "animate-spin" : ""} />
                  {s.label}
                </Badge>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Play size={14} className="text-orange-400 ml-0.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Brain size={14} className="text-purple-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Download size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppLayout>
  )
}
