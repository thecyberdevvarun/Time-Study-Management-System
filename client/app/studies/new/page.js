"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/layout/AppLayout"
import Header from "@/components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { studiesAPI, videosAPI } from "@/lib/api"
import toast from "react-hot-toast"
import {
  Upload, QrCode, User, ClipboardList, CheckCircle,
  CloudUpload, Film, X, ArrowRight, Loader2
} from "lucide-react"

const STEPS = ["Work Order", "Operator", "Upload Video", "Review"]

export default function NewStudyPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ workOrder: "", partNumber: "", operator: "", notes: "" })
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [createdStudyId, setCreatedStudyId] = useState(null)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const handleCreateStudy = async () => {
    try {
      setUploading(true)
      
      // Create study first
      const studyData = {
        work_order: form.workOrder,
        part_number: form.partNumber,
        operator_id: form.operator,
        notes: form.notes,
      }
      
      const study = await studiesAPI.create(studyData)
      setCreatedStudyId(study.id)

      // Upload video if file exists
      if (file) {
        await videosAPI.upload(file, study.id, (progress) => {
          setUploadProgress(progress)
        })
      }

      // Redirect to study detail page
      router.push(`/studies/${study.id}`)
      toast.success('Study created successfully!')
    } catch (error) {
      console.error('Error creating study:', error)
      toast.error('Failed to create study. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const mockOperators = [
    { id: "1", name: "Ravi Patel", dept: "Weld Shop", studies: 28 },
    { id: "2", name: "Meena Shah", dept: "Assembly", studies: 15 },
    { id: "3", name: "Suresh Kumar", dept: "Brazing", studies: 34 },
    { id: "4", name: "Priya Nair", dept: "Inspection", studies: 9 },
  ]

  return (
    <AppLayout>
      <Header title="New Time Study" subtitle="Record and analyze a new shop floor operation" />

      <div className="p-6 max-w-2xl mx-auto space-y-6">
        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                  i < step ? "border-green-500 bg-green-500/10 text-green-400"
                    : i === step ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-slate-700 text-slate-600"
                )}>
                  {i < step ? <CheckCircle size={13} /> : i + 1}
                </div>
                <span className={cn("text-xs font-medium hidden sm:block", i === step ? "text-orange-400" : i < step ? "text-slate-400" : "text-slate-600")}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-2", i < step ? "bg-green-500/30" : "bg-slate-800")} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Work Order */}
        {step === 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ClipboardList size={16} className="text-orange-400" />
                <CardTitle>Work Order Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Work Order Number *</label>
                <div className="flex gap-2">
                  <input
                    value={form.workOrder}
                    onChange={e => update("workOrder", e.target.value)}
                    placeholder="e.g. WO-2024-1195"
                    className="flex-1 bg-slate-800 border border-slate-700 focus:border-orange-500/60 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                  />
                  <Button variant="outline" size="md">
                    <QrCode size={14} /> Scan QR
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Part Number</label>
                <input
                  value={form.partNumber}
                  onChange={e => update("partNumber", e.target.value)}
                  placeholder="e.g. HOUSING-4521-A"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500/60 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  rows={3}
                  placeholder="Any special conditions, first-time study, etc."
                  className="w-full bg-slate-800 border border-slate-700 focus:border-orange-500/60 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(1)} disabled={!form.workOrder}>
                  Next <ArrowRight size={13} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Operator */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User size={16} className="text-orange-400" />
                <CardTitle>Select Operator</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockOperators.map(op => (
                <div
                  key={op.id}
                  onClick={() => update("operator", op.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    form.operator === op.id
                      ? "border-orange-500/50 bg-orange-500/5"
                      : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                  )}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {op.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-200">{op.name}</div>
                    <div className="text-xs text-slate-500">{op.dept}</div>
                  </div>
                  <Badge variant="default">{op.studies} studies</Badge>
                  {form.operator === op.id && <CheckCircle size={15} className="text-orange-400" />}
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)} disabled={!form.operator}>Next <ArrowRight size={13} /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Video Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload size={16} className="text-orange-400" />
                <CardTitle>Upload Video</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); setFile(e.dataTransfer.files[0]) }}
                onClick={() => document.getElementById('file-input').click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer",
                  dragOver ? "border-orange-500 bg-orange-500/5" : "border-slate-700 hover:border-slate-500"
                )}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {file ? (
                  <div className="space-y-2">
                    <Film size={28} className="text-orange-400 mx-auto" />
                    <div className="text-sm font-medium text-slate-200">{file.name}</div>
                    <div className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null) }} className="text-red-400 text-xs hover:text-red-300 flex items-center gap-1 mx-auto">
                      <X size={11} /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <CloudUpload size={32} className="text-slate-600 mx-auto" />
                    <div>
                      <div className="text-sm text-slate-300 font-medium">Drop your video here</div>
                      <div className="text-xs text-slate-600 mt-1">MP4, MOV, AVI up to 5GB</div>
                    </div>
                    <Button variant="outline" size="sm">Browse files</Button>
                  </div>
                )}
              </div>

              <div className="bg-sky-500/5 border border-sky-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs text-sky-400">
                  <CheckCircle size={13} />
                  <span className="font-medium">AI Auto-detection available</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 ml-5">
                  After upload, run YOLOv8 AI to auto-detect Pick, Place, Weld, Walk, and Idle activities.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next <ArrowRight size={13} /></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-orange-400" />
                <CardTitle>Review & Create</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Work Order</span>
                  <span className="text-slate-200 font-medium">{form.workOrder || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Part Number</span>
                  <span className="text-slate-200">{form.partNumber || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operator</span>
                  <span className="text-slate-200">{mockOperators.find(op => op.id === form.operator)?.name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Video</span>
                  <span className="text-slate-200">{file?.name || "No video uploaded"}</span>
                </div>
              </div>

              {uploading && (
                <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Uploading video...</span>
                    <span className="text-orange-400 font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} disabled={uploading}>Back</Button>
                <Button onClick={handleCreateStudy} disabled={uploading}>
                  {uploading ? (
                    <>
                      <Loader2 size={13} className="animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={13} /> Create Study
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
