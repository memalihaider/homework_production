'use client'

import { useState, useMemo } from 'react'
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Filter, 
  Plus, 
  TrendingDown,
  Search,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  Activity,
  Target,
  ShieldCheck,
  Heart,
  Baby,
  Stethoscope,
  Palmtree,
  XCircle,
  CheckCircle2
} from 'lucide-react'

export default function LeaveManagement() {
  const [selectedLeaveType, setSelectedLeaveType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const leaveRequests = [
    { id: 1, employee: 'Ahmed Al-Mazrouei', type: 'Annual Leave', startDate: '2025-02-10', endDate: '2025-02-14', days: 5, status: 'Approved', approver: 'Fatima', reason: 'Personal vacation' },
    { id: 2, employee: 'Mohammed Bin Ali', type: 'Sick Leave', startDate: '2025-01-22', endDate: '2025-01-23', days: 2, status: 'Pending', approver: 'Ahmed', reason: 'Medical appointment' },
    { id: 3, employee: 'Hassan Al-Mazrouei', type: 'Compassionate Leave', startDate: '2025-01-21', endDate: '2025-01-21', days: 1, status: 'Approved', approver: 'Ahmed', reason: 'Family emergency' },
    { id: 4, employee: 'Sara Al-Noor', type: 'Annual Leave', startDate: '2025-03-01', endDate: '2025-03-10', days: 10, status: 'Approved', approver: 'Fatima', reason: 'Summer vacation' },
    { id: 5, employee: 'Layla Al-Mansouri', type: 'Maternity Leave', startDate: '2025-04-01', endDate: '2025-07-31', days: 120, status: 'Approved', approver: 'Fatima', reason: 'Maternity' },
    { id: 6, employee: 'Omar Khan', type: 'Unpaid Leave', startDate: '2025-02-20', endDate: '2025-02-21', days: 2, status: 'Rejected', approver: 'Ahmed', reason: 'High operational period' },
  ]

  const leaveBalance = [
    { employee: 'Ahmed Al-Mazrouei', annual: 15, sick: 10, compassionate: 3, unpaid: 'Unlimited', maternity: 0 },
    { employee: 'Mohammed Bin Ali', annual: 18, sick: 8, compassionate: 3, unpaid: 'Unlimited', maternity: 0 },
    { employee: 'Hassan Al-Mazrouei', annual: 12, sick: 6, compassionate: 3, unpaid: 'Unlimited', maternity: 0 },
    { employee: 'Sara Al-Noor', annual: 20, sick: 10, compassionate: 3, unpaid: 'Unlimited', maternity: 120 },
    { employee: 'Layla Al-Mansouri', annual: 8, sick: 9, compassionate: 3, unpaid: 'Unlimited', maternity: 0 },
    { employee: 'Omar Khan', annual: 19, sick: 10, compassionate: 3, unpaid: 'Unlimited', maternity: 0 },
  ]

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter(req => {
      const typeMatch = selectedLeaveType === 'all' || req.type === selectedLeaveType
      const statusMatch = selectedStatus === 'all' || req.status === selectedStatus
      return typeMatch && statusMatch
    })
  }, [selectedLeaveType, selectedStatus])

  const leaveTypes = ['all', 'Annual Leave', 'Sick Leave', 'Compassionate Leave', 'Maternity Leave', 'Unpaid Leave']
  const statuses = ['all', 'Pending', 'Approved', 'Rejected']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      case 'Rejected': return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'Annual Leave': return Palmtree
      case 'Sick Leave': return Stethoscope
      case 'Compassionate Leave': return Heart
      case 'Maternity Leave': return Baby
      default: return Calendar
    }
  }

  const complianceMetrics = useMemo(() => {
    const totalRequests = leaveRequests.length
    const approved = leaveRequests.filter(r => r.status === 'Approved').length
    const pending = leaveRequests.filter(r => r.status === 'Pending').length
    const approved_rate = Math.round((approved / totalRequests) * 100)

    return {
      totalRequests,
      approved,
      pending,
      approvalRate: approved_rate,
      avgProcessingTime: '2.3 days'
    }
  }, [])

  return (
    <div className="space-y-8 pb-10 bg-white text-black">
      {/* Header */}
      <div className="relative overflow-hidden rounded-4xl bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center border border-rose-300">
                <Calendar className="h-5 w-5 text-rose-600" />
              </div>
              <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">Workforce Mobility</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Leave Management</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Streamlined leave requests, balance tracking, and UAE labor law compliance monitoring.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-5 w-5" />
              New Request
            </button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-rose-100 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-purple-100 blur-[100px]"></div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Requests', value: complianceMetrics.totalRequests, color: 'rose', icon: Activity, trend: 'This month' },
          { label: 'Approval Rate', value: `${complianceMetrics.approvalRate}%`, color: 'emerald', icon: CheckCircle2, trend: `${complianceMetrics.approved} approved` },
          { label: 'Pending Review', value: complianceMetrics.pending, color: 'amber', icon: Clock, trend: 'Awaiting action' },
          { label: 'Avg Processing', value: '2.3d', color: 'purple', icon: Target, trend: 'Days to approve' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-4xl border border-gray-300 group hover:border-rose-500/30 transition-all">
            <div className={`p-4 rounded-2xl bg-${stat.color}-100 text-${stat.color}-600 border border-${stat.color}-300`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <span className={`text-${stat.color}-600 text-[10px] font-black uppercase tracking-widest`}>{stat.trend}</span>
            <p className="text-xs font-black text-gray-600 uppercase tracking-widest mt-6">{stat.label}</p>
            <p className="text-4xl font-black text-black mt-2 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-4xl border border-gray-300 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
            <Filter className="h-6 w-6 text-rose-600" />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Leave Type</p>
              <select
                value={selectedLeaveType}
                onChange={(e) => setSelectedLeaveType(e.target.value)}
                className="bg-transparent text-black font-black text-sm focus:outline-none w-full appearance-none cursor-pointer"
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type} className="bg-white">{type === 'all' ? 'All Types' : type}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</p>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-black font-black text-sm focus:outline-none w-full appearance-none cursor-pointer"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-white">{status === 'all' ? 'All Status' : status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
            <Search className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Quick Search</p>
            <input
              type="text"
              placeholder="Search employee..."
              className="bg-transparent text-black font-black text-lg focus:outline-none w-full placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white border border-gray-300 rounded-4xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-300 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-black text-black">Recent Requests</h3>
          <button className="text-rose-600 hover:text-rose-700 transition-colors">
            <Download className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Employee</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Leave Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Days</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Reason</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Approver</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredRequests.map((req) => {
                const Icon = getLeaveTypeIcon(req.type)
                return (
                  <tr key={req.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center text-black font-black text-xs">
                          {req.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="font-black text-black text-sm group-hover:text-rose-600 transition-colors">{req.employee}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-rose-600" />
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{req.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-black">{req.startDate}</span>
                        <ArrowUpRight className="h-3 w-3 text-gray-400" />
                        <span className="text-sm font-black text-gray-600">{req.endDate}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-black">{req.days} Days</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-gray-600 font-medium max-w-50 truncate">{req.reason}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-gray-600">{req.approver}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Balance & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-300 rounded-4xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-300 bg-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-black flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-rose-600" />
              Employee Leave Balance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Employee</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Annual</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Sick</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Compassionate</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Maternity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {leaveBalance.map((emp, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-black text-sm">{emp.employee}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-rose-600">{emp.annual}d</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-amber-600">{emp.sick}d</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-purple-600">{emp.compassionate}d</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-pink-600">{emp.maternity}d</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-linear-to-br from-rose-600 to-purple-600 rounded-4xl p-8 text-white shadow-2xl shadow-rose-600/20">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6" />
              Compliance
            </h3>
            <p className="text-sm font-bold leading-relaxed opacity-90 mb-6">
              All leave requests are processed according to UAE Labor Law. Annual leave accrual is 2.5 days per month.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest">UAE Labor Law v2024</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest">Accrual Logic Verified</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-4xl p-8">
            <h3 className="text-lg font-black text-black mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
                <Download className="h-4 w-4" />
                Export All Data
              </button>
              <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3">
                <Plus className="h-4 w-4" />
                Bulk Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
