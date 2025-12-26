'use client'

import { ReactNode, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {  
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase, 
  UserCircle, 
  Calendar, 
  Wallet, 
  Settings as SettingsIcon,
  Globe,
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronDown,
  TrendingUp,
  MessageSquare,
  UserCheck,
  Ruler,
  Map,
  DollarSign,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  BarChart3,
  Zap,
  Wrench,
  Navigation,
  AlertTriangle,
  Zap as Zap2,
  Star,
  CreditCard,
  AlertTriangle as AlertTriangleIcon,
  BarChart3 as BarChartIcon,
  Shield,
  Lock,
  Activity,
  Brain,
  Lightbulb,
  Package
} from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [crmOpen, setCrmOpen] = useState(pathname.startsWith('/admin/crm'))
  const [surveysOpen, setSurveysOpen] = useState(pathname.startsWith('/admin/surveys'))
  const [quotationsOpen, setQuotationsOpen] = useState(pathname.startsWith('/admin/quotations'))
  const [hrOpen, setHrOpen] = useState(pathname.startsWith('/admin/hr'))
  const [financeOpen, setFinanceOpen] = useState(pathname.startsWith('/admin/finance'))
  const [meetingsOpen, setMeetingsOpen] = useState(pathname.startsWith('/admin/meetings'))
  const [adminMgmtOpen, setAdminMgmtOpen] = useState(pathname.startsWith('/admin/admin-management'))
  const [aiOpen, setAiOpen] = useState(pathname.startsWith('/admin/ai-command-center'))
  const [productsOpen, setProductsOpen] = useState(pathname.startsWith('/admin/products'))

  const handleSignOut = async () => {
    setIsSigningOut(true)
    
    try {
      // Clear localStorage
      localStorage.removeItem('homeware_admin_token')
      localStorage.removeItem('homeware_admin_email')
      localStorage.removeItem('homeware_admin_remember')
      
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
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { 
      icon: Users, 
      label: 'CRM', 
      href: '/admin/crm',
      submenu: [
        { label: 'Lead Dashboard', href: '/admin/crm', icon: Users },
        { label: 'Communications', href: '/admin/crm/communications', icon: MessageSquare },
        { label: 'Clients', href: '/admin/crm/clients', icon: UserCheck },
      ]
    },
    {
      icon: Ruler,
      label: 'Surveys',
      href: '/admin/surveys',
      submenu: [
        { label: 'Assignment', href: '/admin/surveys', icon: Map },
        { label: 'Form', href: '/admin/surveys/form', icon: FileText },
        { label: 'Pricing', href: '/admin/surveys/pricing', icon: DollarSign },
      ]
    },
    {
      icon: FileText,
      label: 'Quotations',
      href: '/admin/quotations',
      submenu: [
        { label: 'Builder', href: '/admin/quotations/builder', icon: FileText },
        { label: 'Preview', href: '/admin/quotations/preview', icon: Eye },
        { label: 'Approvals', href: '/admin/quotations/approval', icon: CheckCircle },
      ]
    },
    {
      icon: Wrench,
      label: 'Product Management',
      href: '/admin/products',
      submenu: [
        { label: 'Categories', href: '/admin/products/categories', icon: Archive },
        { label: 'Services', href: '/admin/products/services', icon: Zap },
        { label: 'Products', href: '/admin/products/products', icon: Package },
      ]
    },
    { icon: Briefcase, label: 'Jobs', href: '/admin/jobs' },
    {
      icon: UserCircle,
      label: 'HR Management',
      href: '/admin/hr',
      submenu: [
        { label: 'Employee Directory', href: '/admin/hr/employee-directory', icon: Users },
        { label: 'Attendance', href: '/admin/hr/attendance', icon: Clock },
        { label: 'Leave Management', href: '/admin/hr/leave-management', icon: Calendar },
        { label: 'Payroll', href: '/admin/hr/payroll', icon: DollarSign },
        { label: 'Performance Dashboard', href: '/admin/hr/performance-dashboard', icon: BarChart3 },
      ]
    },
    {
      icon: Calendar,
      label: 'Meetings',
      href: '/admin/meetings',
      submenu: [
        { label: 'Meeting Calendar', href: '/admin/meetings/calendar', icon: Calendar },
        { label: 'Meeting Detail', href: '/admin/meetings/detail', icon: FileText },
        { label: 'Notes & Decisions', href: '/admin/meetings/notes-decisions', icon: FileText },
        { label: 'Follow-Up Tracker', href: '/admin/meetings/follow-up-tracker', icon: CheckCircle },
      ]
    },
    {
      icon: Wallet,
      label: 'Finance',
      href: '/admin/finance',
      submenu: [
        { label: 'Invoice Generator', href: '/admin/finance/invoice-generator', icon: FileText },
        { label: 'Payment Tracker', href: '/admin/finance/payment-tracker', icon: CreditCard },
        { label: 'Finance Center', href: '/admin/finance/finance-reports', icon: BarChartIcon },
      ]
    },
    {
      icon: Shield,
      label: 'Admin Management',
      href: '/admin/admin-management',
      submenu: [
        { label: 'Role Manager', href: '/admin/admin-management/role-manager', icon: UserCheck },
        { label: 'Permission Matrix', href: '/admin/admin-management/permission-matrix', icon: Lock },
        { label: 'User Accounts', href: '/admin/admin-management/user-accounts', icon: Users },
        { label: 'Audit Logs', href: '/admin/admin-management/audit-logs', icon: Activity },
      ]
    },
    {
      icon: Brain,
      label: 'AI Command Center',
      href: '/admin/ai-command-center',
      submenu: [
        { label: 'AI Recommendations', href: '/admin/ai-command-center/recommendations', icon: Lightbulb },
      ]
    },
    { icon: Globe, label: 'CMS', href: '/admin/cms' },
    { icon: SettingsIcon, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-12'} border-r bg-card hidden lg:flex flex-col sticky top-0 h-screen shadow-sm transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className={`${sidebarOpen ? 'flex' : 'hidden'} items-center gap-3`}>
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
              H
            </div>
            <div>
              <span className="font-black text-lg tracking-tighter block leading-none">HOMEWARE</span>
              <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Hygiene ERP</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-accent rounded-lg transition-all duration-200 group"
            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            <Menu className={`h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-transform duration-200 ${sidebarOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className={`px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 ${sidebarOpen ? '' : 'hidden'}`}>Main Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const hasSubmenu = 'submenu' in item
            const isSubmenuActive = hasSubmenu && pathname.startsWith(item.href)
            const isCrmItem = item.label === 'CRM'
            const isSurveysItem = item.label === 'Surveys'
            const isQuotationsItem = item.label === 'Quotations'
            const isHrItem = item.label === 'HR Management'
            const isFinanceItem = item.label === 'Finance'
            const isMeetingsItem = item.label === 'Meetings'
            const isAdminMgmtItem = item.label === 'Admin Management'
            const isAiItem = item.label === 'AI Command Center'
            
            return (
              <div key={item.label}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => {
                        if (isCrmItem) setCrmOpen(!crmOpen)
                        if (isSurveysItem) setSurveysOpen(!surveysOpen)
                        if (isQuotationsItem) setQuotationsOpen(!quotationsOpen)
                        if (isHrItem) setHrOpen(!hrOpen)
                        if (isFinanceItem) setFinanceOpen(!financeOpen)
                        if (isMeetingsItem) setMeetingsOpen(!meetingsOpen)
                        if (isAdminMgmtItem) setAdminMgmtOpen(!adminMgmtOpen)
                        if (isAiItem) setAiOpen(!aiOpen)
                        if (item.label === 'Product Management') setProductsOpen(!productsOpen)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                        isSubmenuActive 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                      title={sidebarOpen ? '' : item.label}
                    >
                      <item.icon className={`h-5 w-5 transition-colors shrink-0 ${
                        isSubmenuActive ? 'text-white' : 'text-muted-foreground group-hover:text-blue-600'
                      }`} />
                      <span className={`flex-1 text-left transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{item.label}</span>
                      {sidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${
                        (isCrmItem && crmOpen) || (isSurveysItem && surveysOpen) || (isQuotationsItem && quotationsOpen) || (isHrItem && hrOpen) || (isFinanceItem && financeOpen) || (isMeetingsItem && meetingsOpen) || (isAdminMgmtItem && adminMgmtOpen) || (isAiItem && aiOpen) || (item.label === 'Product Management' && productsOpen) ? 'rotate-180' : ''
                      }`} />}
                    </button>
                    {sidebarOpen && ((isCrmItem && crmOpen) || (isSurveysItem && surveysOpen) || (isQuotationsItem && quotationsOpen) || (isHrItem && hrOpen) || (isFinanceItem && financeOpen) || (isMeetingsItem && meetingsOpen) || (isAdminMgmtItem && adminMgmtOpen) || (isAiItem && aiOpen) || (item.label === 'Product Management' && productsOpen)) && (
                      <div className="ml-2 mt-1 space-y-1 border-l-2 border-muted pl-2">
                        {('submenu' in item && item.submenu) && item.submenu.map((subitem: any) => {
                          const isSubActive = pathname === subitem.href
                          return (
                            <Link
                              key={subitem.label}
                              href={subitem.href}
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 group ${
                                isSubActive 
                                  ? 'bg-pink-100 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300' 
                                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                              }`}
                            >
                              <subitem.icon className={`h-4 w-4 ${
                                isSubActive ? 'text-pink-600' : 'text-muted-foreground group-hover:text-pink-600'
                              }`} />
                              <span className="flex-1">{subitem.label}</span>
                              {subitem.badge && (
                                <span className="text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full ml-1">
                                  {subitem.badge}
                                </span>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                    title={sidebarOpen ? '' : item.label}
                  >
                    <item.icon className={`h-5 w-5 transition-colors shrink-0 ${
                      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-blue-600'
                    }`} />
                    <span className={`flex-1 text-left transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>{item.label}</span>
                    {isActive && sidebarOpen && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-4">
          <div className={`bg-muted/50 rounded-2xl p-4 ${sidebarOpen ? '' : 'p-2'}`}>
            {sidebarOpen ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                    AD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@homeware.ae</p>
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
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/30" title="Admin User">
                  AD
                </div>
                <button 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="p-2 rounded-lg text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={isSigningOut ? 'Signing Out...' : 'Sign Out'}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b bg-card/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-6 flex-1">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-accent rounded-lg">
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl hover:bg-accent relative transition-colors group">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-600 rounded-full border-2 border-card"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto bg-muted/20">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}