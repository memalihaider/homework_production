'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Trash2,
  MapPin,
  Phone,
  Mail,
  X,
  FileText,
  Zap,
  UserCheck,
  BarChart3,
  MessageSquare,
  ChevronRight
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [showNewBookingModal, setShowNewBookingModal] = useState(false)
  const [showActivityDetails, setShowActivityDetails] = useState<number | null>(null)
  const [exportLoading, setExportLoading] = useState(false)
  const [newBooking, setNewBooking] = useState({
    clientName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    address: ''
  })

  // Data
  const salesData = [
    { month: 'Jan', sales: 45000, expenses: 32000 },
    { month: 'Feb', sales: 52000, expenses: 35000 },
    { month: 'Mar', sales: 48000, expenses: 31000 },
    { month: 'Apr', sales: 61000, expenses: 42000 },
    { month: 'May', sales: 55000, expenses: 38000 },
    { month: 'Jun', sales: 67000, expenses: 45000 }
  ]

  const leadData = [
    { name: 'New', value: 45, color: '#3b82f6' },
    { name: 'Contacted', value: 30, color: '#10b981' },
    { name: 'Quoted', value: 20, color: '#f59e0b' },
    { name: 'Confirmed', value: 15, color: '#8b5cf6' }
  ]

  const kpis = [
    { title: 'Total Revenue', value: 'AED 328,000', change: '+12.5%', trend: 'up' as const, icon: Wallet, color: 'blue' },
    { title: 'Active Jobs', value: '24', change: '+5', trend: 'up' as const, icon: Briefcase, color: 'green' },
    { title: 'New Leads', value: '18', change: '+8', trend: 'up' as const, icon: Users, color: 'purple' },
    { title: 'Conversion Rate', value: '64%', change: '-2.1%', trend: 'down' as const, icon: TrendingUp, color: 'orange' }
  ]

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, user: 'Ahmed Khan', action: 'completed job', target: '#J-8821', time: '2 mins ago', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 2, user: 'Sarah Smith', action: 'created new lead', target: 'Villa 45, Palm', time: '15 mins ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 3, user: 'System', action: 'payment received', target: 'INV-2024', time: '1 hour ago', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 4, user: 'John Doe', action: 'flagged issue', target: '#J-8819', time: '3 hours ago', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ])

  // Handlers
  const handleExportData = useCallback(() => {
    setExportLoading(true)
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(
        "Month,Revenue,Expenses\n" + salesData.map(d => `${d.month},${d.sales},${d.expenses}`).join("\n")
      )
      const link = document.createElement("a")
      link.setAttribute("href", csvContent)
      link.setAttribute("download", `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`)
      link.click()
      setExportLoading(false)
    }, 800)
  }, [])

  const handleNewBooking = useCallback(() => {
    if (newBooking.clientName && newBooking.email && newBooking.service && newBooking.date) {
      alert(`✓ Booking created!\nClient: ${newBooking.clientName}\nService: ${newBooking.service}\nDate: ${newBooking.date}`)
      setNewBooking({ clientName: '', email: '', phone: '', service: '', date: '', address: '' })
      setShowNewBookingModal(false)
    } else {
      alert('Please fill all required fields')
    }
  }, [newBooking])

  const handleDeleteActivity = useCallback((id: number) => {
    setRecentActivities(prev => prev.filter(a => a.id !== id))
    setShowActivityDetails(null)
  }, [])

  const handleViewLog = useCallback(() => {
    alert('Navigating to full activity logs...')
  }, [])

  const handleViewTeamMap = useCallback(() => {
    alert('Opening team map visualization...')
  }, [])

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin. Here&apos;s the latest performance data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportData}
            disabled={exportLoading}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {exportLoading ? 'Exporting...' : 'Export Data'}
          </button>
          <button 
            onClick={() => setShowNewBookingModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="h-4 w-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Link href="/admin/jobs" className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-600">Active Jobs</h3>
          <p className="text-2xl font-black text-gray-900 mt-2">24</p>
          <p className="text-xs text-gray-500 mt-1">View all jobs</p>
        </Link>

        <Link href="/admin/crm" className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-300 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-600">CRM Leads</h3>
          <p className="text-2xl font-black text-gray-900 mt-2">18</p>
          <p className="text-xs text-gray-500 mt-1">View CRM Pipeline</p>
        </Link>

        <Link href="/admin/quotations" className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-600">Quotations</h3>
          <p className="text-2xl font-black text-gray-900 mt-2">12</p>
          <p className="text-xs text-gray-500 mt-1">Pending approvals</p>
        </Link>

        <Link href="/admin/finance" className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform">
              <Wallet className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-600">Pending Invoices</h3>
          <p className="text-2xl font-black text-gray-900 mt-2">8</p>
          <p className="text-xs text-gray-500 mt-1">View Finance</p>
        </Link>

        <Link href="/admin/marketing" className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-pink-100 text-pink-600 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-pink-600 transition-colors" />
          </div>
          <h3 className="text-sm font-bold text-gray-600">Marketing</h3>
          <p className="text-2xl font-black text-gray-900 mt-2">156</p>
          <p className="text-xs text-gray-500 mt-1">Active leads</p>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-gray-100 text-gray-700 group-hover:scale-110 transition-transform">
                <kpi.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {kpi.change}
                {kpi.trend === 'up' ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-600">{kpi.title}</h3>
            <p className="text-3xl font-black text-gray-900 mt-2">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-gray-900">Revenue vs Expenses</h3>
              <p className="text-sm text-gray-500">Monthly financial performance</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                Revenue
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                Expenses
              </div>
            </div>
          </div>
          <div className="h-87.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="expenses" stroke="#a855f7" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-black text-gray-900 mb-2">Lead Distribution</h3>
          <p className="text-sm text-gray-500 mb-8">Leads by pipeline stage</p>
          <div className="h-75 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                  {leadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-900">110</span>
              <span className="text-xs font-bold text-gray-500 uppercase">Total Leads</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {leadData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-gray-700">{item.name}</span>
                <span className="text-xs font-black ml-auto text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-black text-gray-900">Recent Activity</h3>
            <button 
              onClick={handleViewLog}
              className="text-sm text-blue-600 font-bold hover:underline"
            >
              View All Logs
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                <div className={`p-2.5 rounded-xl ${activity.bg}`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">
                    <span className="font-black">{activity.user}</span> {activity.action} <span className="text-blue-600 font-bold">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowActivityDetails(showActivityDetails === activity.id ? null : activity.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Card */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-gray-900 shadow-xl relative overflow-hidden border border-blue-200">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-2xl font-black mb-2">Operational Health</h3>
              <p className="text-gray-600">All 12 teams are active and dispatched.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 space-y-3 border border-blue-200">
              <div className="flex justify-between text-sm font-bold text-gray-900">
                <span>Daily Target</span>
                <span>85%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[85%] rounded-full"></div>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900">
                <span>Team Utilization</span>
                <span>92%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[92%] rounded-full"></div>
              </div>
            </div>
            <button 
              onClick={handleViewTeamMap}
              className="w-full py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all"
            >
              View Team Map
            </button>
          </div>
          <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* New Booking Modal */}
      {showNewBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <h2 className="text-2xl font-black text-gray-900">Create New Booking</h2>
              <button 
                onClick={() => setShowNewBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900">Client Name *</label>
                  <input 
                    type="text"
                    value={newBooking.clientName}
                    onChange={(e) => setNewBooking({...newBooking, clientName: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900">Email *</label>
                  <input 
                    type="email"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({...newBooking, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900">Phone</label>
                  <input 
                    type="tel"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                    placeholder="+971 50 000 0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900">Service *</label>
                  <select 
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({...newBooking, service: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select Service</option>
                    <option value="Residential">Residential Cleaning</option>
                    <option value="Commercial">Commercial Cleaning</option>
                    <option value="Deep">Deep Cleaning</option>
                    <option value="AC">AC Duct Cleaning</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900">Preferred Date *</label>
                <input 
                  type="date"
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900">Address</label>
                <textarea 
                  value={newBooking.address}
                  onChange={(e) => setNewBooking({...newBooking, address: e.target.value})}
                  placeholder="123 Main St, Dubai"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowNewBookingModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-900 font-black rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewBooking}
                  className="flex-1 py-3 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 transition-all"
                >
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
