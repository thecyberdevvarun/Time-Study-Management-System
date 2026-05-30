export const mockStats = {
  totalStudies: 142,
  avgCycleTime: 284,
  lineEfficiency: 78.4,
  aiJobsToday: 12,
  vaPercent: 62,
  nvaPercent: 38,
}

export const mockStudies = [
  { id: "s1", title: "Weld Station A - Operator Ravi", workOrder: "WO-2024-1182", operator: "Ravi Patel", status: "completed", cycleTime: 320, vaTime: 198, nvaTime: 122, date: "2025-05-28", operations: 8, efficiency: 85 },
  { id: "s2", title: "Assembly Line 3 - Morning Shift", workOrder: "WO-2024-1183", operator: "Meena Shah", status: "ai_processing", cycleTime: 290, vaTime: 165, nvaTime: 125, date: "2025-05-29", operations: 6, efficiency: 72 },
  { id: "s3", title: "Brazing Cell B - Operator Suresh", workOrder: "WO-2024-1185", operator: "Suresh Kumar", status: "completed", cycleTime: 410, vaTime: 280, nvaTime: 130, date: "2025-05-27", operations: 11, efficiency: 91 },
  { id: "s4", title: "Inspection Station 2", workOrder: "WO-2024-1187", operator: "Priya Nair", status: "in_progress", cycleTime: 180, vaTime: 110, nvaTime: 70, date: "2025-05-30", operations: 4, efficiency: 68 },
  { id: "s5", title: "Packing Line - Evening", workOrder: "WO-2024-1190", operator: "Anand Joshi", status: "draft", cycleTime: 240, vaTime: 156, nvaTime: 84, date: "2025-05-30", operations: 7, efficiency: 79 },
  { id: "s6", title: "CNC Turning - Station 4", workOrder: "WO-2024-1191", operator: "Deepa Reddy", status: "completed", cycleTime: 520, vaTime: 390, nvaTime: 130, date: "2025-05-26", operations: 14, efficiency: 88 },
]

export const mockOperations = [
  { id: "op1", label: "Pick Housing", startMs: 3200, endMs: 7800, isVA: true, source: "manual", confidence: null },
  { id: "op2", label: "Align Parts", startMs: 8100, endMs: 14500, isVA: true, source: "ai", confidence: 0.93 },
  { id: "op3", label: "Weld Joint A", startMs: 15000, endMs: 42000, isVA: true, source: "manual", confidence: null },
  { id: "op4", label: "Walk to Bin", startMs: 42500, endMs: 51000, isVA: false, source: "ai", confidence: 0.87 },
  { id: "op5", label: "Wait for Fixture", startMs: 51500, endMs: 64000, isVA: false, source: "ai", confidence: 0.91 },
  { id: "op6", label: "Weld Joint B", startMs: 65000, endMs: 88000, isVA: true, source: "manual", confidence: null },
  { id: "op7", label: "Inspect Weld", startMs: 89000, endMs: 102000, isVA: true, source: "ai", confidence: 0.78 },
  { id: "op8", label: "Place Finished Part", startMs: 103000, endMs: 108000, isVA: true, source: "manual", confidence: null },
]

export const mockCycleTrend = [
  { day: "Mon", cycleTime: 340, target: 300 },
  { day: "Tue", cycleTime: 318, target: 300 },
  { day: "Wed", cycleTime: 305, target: 300 },
  { day: "Thu", cycleTime: 290, target: 300 },
  { day: "Fri", cycleTime: 284, target: 300 },
  { day: "Sat", cycleTime: 275, target: 300 },
]

export const mockVaNva = [
  { name: "Value Added", value: 62, color: "#22c55e" },
  { name: "Non-Value Added", value: 38, color: "#ef4444" },
]

export const mockOperatorPerf = [
  { name: "Ravi P.", efficiency: 85, cycleTime: 320 },
  { name: "Meena S.", efficiency: 72, cycleTime: 290 },
  { name: "Suresh K.", efficiency: 91, cycleTime: 410 },
  { name: "Priya N.", efficiency: 68, cycleTime: 180 },
  { name: "Anand J.", efficiency: 79, cycleTime: 240 },
]

export const mockActivityBreakdown = [
  { activity: "Welding", time: 520, va: true },
  { activity: "Assembly", time: 320, va: true },
  { activity: "Inspection", time: 180, va: true },
  { activity: "Walking", time: 145, va: false },
  { activity: "Waiting", time: 210, va: false },
  { activity: "Tool Change", time: 95, va: false },
]

export const mockBottlenecks = [
  { station: "Weld Station A", avgTime: 420, takt: 300, overrun: 40 },
  { station: "Brazing Cell B", avgTime: 340, takt: 300, overrun: 13 },
  { station: "Inspection 2", avgTime: 180, takt: 300, overrun: 0 },
  { station: "Assembly L3", avgTime: 290, takt: 300, overrun: 0 },
]
