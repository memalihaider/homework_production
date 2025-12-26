'use client'

import { ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  FileText, 
  HelpCircle,
  LogOut,
  Bell,
  Menu,
  Search
} from 'lucide-react'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    
    try {
      // Clear localStorage
      localStorage.removeItem('homeware_client_token')
      localStorage.removeItem('homeware_client_email')
      localStorage.removeItem('homeware_client_remember')
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Redirect to login
      router.push('/login')
    } catch (err) {
      console.error('Sign out failed:', err)
      setIsSigningOut(false)
    }
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/client/dashboard' },
    { icon: User, label: 'My Profile', href: '/client/profile' },
    { icon: Calendar, label: 'My Bookings', href: '/client/bookings' },
    { icon: FileText, label: 'Invoices', href: '/client/invoices' },
    { icon: HelpCircle, label: 'Support', href: '/client/support' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-card hidden lg:flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-6 border-b flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            H
          </div>
          <div>
            <span className="font-black text-lg tracking-tighter block leading-none uppercase">Homeware</span>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Client Portal</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <item.icon className={`h-5 w-5 transition-colors ${
                  isActive ? 'text-white' : 'text-muted-foreground group-hover:text-blue-600'
                }`} />
                {item.label}
                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="bg-muted/50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 font-bold">
                AA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Ahmed Al-Mansoori</p>
                <p className="text-xs text-muted-foreground truncate">ahmed@example.com</p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-100 dark:border-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="h-3.5 w-3.5" />
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b bg-card/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-6 flex-1">
            <button className="lg:hidden p-2 hover:bg-accent rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-sm font-bold text-muted-foreground hidden md:block">Welcome back, Ahmed!</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl hover:bg-accent relative transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-600 rounded-full border-2 border-card"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto bg-muted/20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}