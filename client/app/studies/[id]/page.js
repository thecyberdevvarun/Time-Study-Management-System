"use client"
import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockOperations } from "@/lib/mock-data"
import { formatTimestamp, formatTime, cn } from "@/lib/utils"
import {
  Play, Pause, SkipBack, SkipForward, ChevronLeft, ChevronRight,
  Tag, CheckCircle, XCircle, Brain, Download, Clock,
  Zap, Trash2, Edit3, Plus, Volume2
} from "lucide-react"
import Link from "next/link"

const TOTAL_MS = 110000

export default function StudyDetailPage({ params }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentMs, setCurrentMs] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [tagging, setTagging] = useState(null)
  const [operations, setOperations] = useState(mockOperations)
  const [newLabel, setNewLabel] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [duration, setDuration] = useState(0)
  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  // Keyboard event listeners for S/E keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if not typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (!tagging && newLabel.trim()) {
          handleStartTag()
        }
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault()
        if (tagging) {
          handleEndTag()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tagging, newLabel])

  useEffect(() => {
    // Load video URL from API or use a sample video
    // For demo purposes, using a sample video
    setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4')
  }, [params])

  const handleProgress = (state) => {
    setCurrentMs(state.played * duration * 1000)
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleSeek = (ms) => {
    const player = playerRef.current
    if (player) {
      player.seekTo(ms / 1000 / duration, 'fraction')
    }
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        // ReactPlayer handles playback, this is for custom logic if needed
      }, 100)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed])

  const handleStartTag = () => {
    if (!newLabel.trim()) return
    setTagging({ label: newLabel, startMs: currentMs })
  }

  const handleEndTag = () => {
    if (!tagging) return
    const newOp = {
      id: `op${Date.now()}`,
      label: tagging.label,
      startMs: tagging.startMs,
      endMs: currentMs,
      isVA: true,
      source: "manual",
      confidence: null,
    }
    setOperations(prev => [...prev, newOp].sort((a, b) => a.startMs - b.startMs))
    setTagging(null)
    setNewLabel("")
  }

  const totalVA = operations.filter(o => o.isVA).reduce((s, o) => s + (o.endMs - o.startMs), 0)
  const totalNVA = operations.filter(o => !o.isVA).reduce((s, o) => s + (o.endMs - o.startMs), 0)
  const progressPct = duration > 0 ? (currentMs / (duration * 1000)) * 100 : 0

  return (
    <AppLayout>
      <Header
        title="Weld Station A — Operator Ravi"
        subtitle="WO-2024-1182 · 28 May 2025"
      />

      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left — Video player + controls */}
        <div className="xl:col-span-2 space-y-4">
          {/* Video viewport */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-slate-950 relative">
              {videoUrl ? (
                <ReactPlayer
                  ref={playerRef}
                  url={videoUrl}
                  playing={isPlaying}
                  playbackRate={speed}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  width="100%"
                  height="100%"
                  controls={false}
                  progressInterval={100}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center mx-auto">
                      <Play size={24} className="text-slate-600 ml-1" />
                    </div>
                    <div className="text-slate-600 text-sm">No video loaded</div>
                    <div className="text-slate-700 text-xs">Upload a video to begin</div>
                  </div>
                </div>
              )}

              {/* Timestamp overlay */}
              <div className="absolute top-3 left-3 bg-black/70 rounded px-2 py-1 text-xs font-mono text-green-400">
                {formatTimestamp(currentMs)}
              </div>

              {/* Speed badge */}
              <div className="absolute top-3 right-3 bg-black/70 rounded px-2 py-1 text-xs font-mono text-orange-400">
                {speed}×
              </div>

              {/* Active tag indicator */}
              {tagging && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-500/20 border border-orange-500/50 rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 recording-pulse" />
                  <span className="text-xs text-orange-400 font-medium">Tagging: {tagging.label}</span>
                  <span className="text-[10px] text-orange-400/70">started {formatTimestamp(tagging.startMs)}</span>
                </div>
              )}
            </div>

            {/* Timeline scrubber */}
            <div className="px-4 py-2 bg-slate-950 border-t border-slate-800">
              {/* Operation segments on timeline */}
              <div className="relative h-5 bg-slate-800 rounded-full overflow-hidden mb-2">
                {operations.map(op => (
                  <div
                    key={op.id}
                    className={cn("absolute top-0 h-full opacity-60 hover:opacity-90 transition-opacity cursor-pointer rounded-sm", op.isVA ? "bg-green-500" : "bg-red-500")}
                    style={{
                      left: duration > 0 ? `${(op.startMs / (duration * 1000)) * 100}%` : '0%',
                      width: duration > 0 ? `${Math.max(((op.endMs - op.startMs) / (duration * 1000)) * 100, 0.4)}%` : '0%'
                    }}
                    title={`${op.label}: ${formatTimestamp(op.startMs)} → ${formatTimestamp(op.endMs)}`}
                  />
                ))}
                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
                  style={{ left: `${progressPct}%` }}
                />
              </div>
              <input
                type="range" min={0} max={duration * 1000 || TOTAL_MS} value={currentMs}
                onChange={e => {
                  const newMs = Number(e.target.value)
                  setCurrentMs(newMs)
                  handleSeek(newMs)
                }}
                className="w-full h-1 accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Playback controls */}
            <div className="px-4 pb-3 pt-1 flex items-center gap-2 bg-slate-950">
              <Button variant="ghost" size="icon" onClick={() => {
                const newMs = Math.max(0, currentMs - 5000)
                setCurrentMs(newMs)
                handleSeek(newMs)
              }}>
                <SkipBack size={15} />
              </Button>
              <Button
                variant={isPlaying ? "outline" : "default"}
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => {
                const newMs = Math.min(duration * 1000 || TOTAL_MS, currentMs + 5000)
                setCurrentMs(newMs)
                handleSeek(newMs)
              }}>
                <SkipForward size={15} />
              </Button>

              <div className="flex items-center gap-1 ml-2">
                {[0.25, 0.5, 1, 1.5, 2].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={cn("px-2 py-1 rounded text-[10px] font-medium transition-all", speed === s ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-200")}
                  >
                    {s}×
                  </button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Volume2 size={13} />
                {formatTimestamp(currentMs)} / {formatTimestamp(duration * 1000 || TOTAL_MS)}
              </div>
            </div>
          </Card>

          {/* Tagging controls */}
          <Card>
            <CardHeader className="flex-row items-center gap-3">
              <Tag size={16} className="text-orange-400" />
              <CardTitle>Operation Tagger</CardTitle>
              <Badge variant="primary" className="ml-auto">Keyboard: S = Start · E = End</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3">
                <input
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  placeholder="Operation name (e.g. Weld Joint A)..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-colors"
                />
                {!tagging ? (
                  <Button onClick={handleStartTag} disabled={!newLabel.trim()} variant="success">
                    <Play size={13} /> Start
                  </Button>
                ) : (
                  <Button onClick={handleEndTag} variant="danger">
                    <Pause size={13} /> End Tag
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Brain size={13} className="text-purple-400" /> Run AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right — Operations panel */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">VA Time</div>
              <div className="text-xl font-bold text-green-400 mt-1">{formatTime(totalVA)}</div>
              <div className="text-[10px] text-green-600 mt-1">{Math.round((totalVA / (totalVA + totalNVA)) * 100)}% of total</div>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">NVA Time</div>
              <div className="text-xl font-bold text-red-400 mt-1">{formatTime(totalNVA)}</div>
              <div className="text-[10px] text-red-600 mt-1">{Math.round((totalNVA / (totalVA + totalNVA)) * 100)}% of total</div>
            </div>
          </div>

          {/* Operations list */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Operations ({operations.length})</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                <Download size={12} /> Export
              </Button>
            </CardHeader>
            <CardContent className="pt-0 space-y-1.5 max-h-[480px] overflow-y-auto pr-2">
              {operations.sort((a, b) => a.startMs - b.startMs).map((op, i) => (
                <div
                  key={op.id}
                  onClick={() => setCurrentMs(op.startMs)}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] group",
                    op.isVA
                      ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                      : "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] text-slate-600 font-mono w-4 flex-shrink-0">{i + 1}</span>
                      <span className="text-xs font-medium text-slate-200 truncate">{op.label}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {op.source === "ai" && (
                        <Badge variant="purple" className="text-[9px] px-1 py-0">
                          <Brain size={8} /> AI {Math.round(op.confidence * 100)}%
                        </Badge>
                      )}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-600">
                    <span className="font-mono">{formatTimestamp(op.startMs)}</span>
                    <ChevronRight size={8} />
                    <span className="font-mono">{formatTimestamp(op.endMs)}</span>
                    <span className={cn("ml-auto font-semibold", op.isVA ? "text-green-500" : "text-red-500")}>
                      {formatTime(op.endMs - op.startMs)}
                    </span>
                  </div>
                  {/* Mini bar */}
                  <div className="mt-1.5 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", op.isVA ? "bg-green-500" : "bg-red-500")}
                      style={{ width: duration > 0 ? `${((op.endMs - op.startMs) / (duration * 1000)) * 100 * 4}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
