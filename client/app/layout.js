import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "TSMS — Time Study Management System",
  description: "AI-powered industrial time study platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" toastOptions={{
          className: 'bg-slate-900 text-white border border-slate-800',
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }} />
      </body>
    </html>
  )
}
