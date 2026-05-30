"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { authAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Mail, AlertCircle, Factory } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Mock authentication for frontend-only testing
      // In production, this would call: await authAPI.login(email, password)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Mock user database
      const mockUsers = {
        'admin@company.com': { password: 'admin123', role: 'admin', name: 'Admin User', id: '1' },
        'analyst@company.com': { password: 'analyst123', role: 'ie_analyst', name: 'IE Analyst', id: '2' },
        'viewer@company.com': { password: 'viewer123', role: 'viewer', name: 'Viewer User', id: '3' },
      }

      const user = mockUsers[email]

      if (!user || user.password !== password) {
        throw new Error('Invalid credentials')
      }

      // Generate mock tokens
      const mockAccessToken = 'mock_access_token_' + Date.now()
      const mockRefreshToken = 'mock_refresh_token_' + Date.now()

      // Store tokens in cookies
      Cookies.set('token', mockAccessToken, { expires: 1 }) // 1 day
      Cookies.set('refreshToken', mockRefreshToken, { expires: 7 }) // 7 days
      Cookies.set('user', JSON.stringify({
        id: user.id,
        email: email,
        name: user.name,
        role: user.role,
      }), { expires: 1 })

      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/dashboard')
      } else if (user.role === 'ie_analyst') {
        router.push('/studies')
      } else if (user.role === 'viewer') {
        router.push('/studies')
      } else {
        router.push('/dashboard')
      }

      toast.success(`Welcome back, ${user.name}!`)
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardContent className="p-8">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Factory size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TSMS</h1>
              <p className="text-xs text-slate-500">Time Study Management System</p>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-colors"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><span className="text-orange-400">Admin:</span> admin@company.com / admin123</p>
              <p><span className="text-orange-400">IE Analyst:</span> analyst@company.com / analyst123</p>
              <p><span className="text-orange-400">Viewer:</span> viewer@company.com / viewer123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
