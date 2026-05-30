import Sidebar from "@/components/layout/Sidebar"

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#020817]">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
