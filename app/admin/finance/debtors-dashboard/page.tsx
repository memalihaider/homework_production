'use client'

import { useState, useMemo } from 'react'
import {
  AlertTriangle,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Building2,
  Wallet,
  CreditCard,
  Bell,
  MessageSquare,
  FileText,
  Zap
} from 'lucide-react'

interface Debtor {
  id: number
  name: string
  company: string
  email: string
  phone: string
  totalDebt: number
  overdueAmount: number
  lastPayment: string
  nextDueDate: string
  status: 'Current' | 'Overdue' | 'Critical' | 'Legal'
  daysOverdue: number
  paymentHistory: {
    date: string
    amount: number
    method: string
  }[]
  notes: string
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
}

export default function DebtorsDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const [debtors, setDebtors] = useState<Debtor[]>([
    {
      id: 1,
      name: 'Ahmed Al-Mansoori',
      company: 'Mansoori Enterprises',
      email: 'ahmed@mansoori.com',
      phone: '+971 50 123 4567',
      totalDebt: 15750.00,
      overdueAmount: 5250.00,
      lastPayment: '2025-11-15',
      nextDueDate: '2025-12-15',
      status: 'Overdue',
      daysOverdue: 12,
      riskLevel: 'Medium',
      notes: 'Regular client, usually pays on time. Contacted about overdue payment.',
      paymentHistory: [
        { date: '2025-11-15', amount: 10500, method: 'Bank Transfer' },
        { date: '2025-10-15', amount: 8400, method: 'Credit Card' },
        { date: '2025-09-15', amount: 7350, method: 'Bank Transfer' }
      ]
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      company: 'Al-Zahra Properties',
      email: 'fatima@zahra-properties.ae',
      phone: '+971 50 987 6543',
      totalDebt: 22300.00,
      overdueAmount: 22300.00,
      lastPayment: '2025-09-20',
      nextDueDate: '2025-11-20',
      status: 'Critical',
      daysOverdue: 37,
      riskLevel: 'Critical',
      notes: 'Multiple reminders sent. Legal action being considered.',
      paymentHistory: [
        { date: '2025-09-20', amount: 12800, method: 'Bank Transfer' },
        { date: '2025-08-20', amount: 11200, method: 'Cheque' }
      ]
    },
    {
      id: 3,
      name: 'Business Corp LLC',
      company: 'Business Corp LLC',
      email: 'accounts@businesscorp.ae',
      phone: '+971 4 123 4567',
      totalDebt: 45600.00,
      overdueAmount: 0,
      lastPayment: '2025-12-01',
      nextDueDate: '2026-01-01',
      status: 'Current',
      daysOverdue: 0,
      riskLevel: 'Low',
      notes: 'Excellent payment history. Large corporate client.',
      paymentHistory: [
        { date: '2025-12-01', amount: 15200, method: 'Bank Transfer' },
        { date: '2025-11-01', amount: 15200, method: 'Bank Transfer' },
        { date: '2025-10-01', amount: 15200, method: 'Bank Transfer' }
      ]
    },
    {
      id: 4,
      name: 'Omar Al-Rashid',
      company: 'Rashid Construction',
      email: 'omar@rashidconstruction.com',
      phone: '+971 50 555 1234',
      totalDebt: 8900.00,
      overdueAmount: 4450.00,
      lastPayment: '2025-10-25',
      nextDueDate: '2025-12-25',
      status: 'Overdue',
      daysOverdue: 2,
      riskLevel: 'Low',
      notes: 'Recently overdue but historically good payer.',
      paymentHistory: [
        { date: '2025-10-25', amount: 4450, method: 'Credit Card' }
      ]
    }
  ])

  const filteredDebtors = useMemo(() => {
    return debtors.filter(debtor => {
      const matchesSearch = debtor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          debtor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          debtor.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'all' || debtor.status.toLowerCase() === statusFilter
      const matchesRisk = riskFilter === 'all' || debtor.riskLevel.toLowerCase() === riskFilter

      return matchesSearch && matchesStatus && matchesRisk
    })
  }, [debtors, searchTerm, statusFilter, riskFilter])

  const stats = useMemo(() => {
    const totalDebt = debtors.reduce((sum, d) => sum + d.totalDebt, 0)
    const totalOverdue = debtors.reduce((sum, d) => sum + d.overdueAmount, 0)
    const criticalDebtors = debtors.filter(d => d.status === 'Critical').length
    const overdueDebtors = debtors.filter(d => d.status === 'Overdue').length

    return { totalDebt, totalOverdue, criticalDebtors, overdueDebtors }
  }, [debtors])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-700'
      case 'Overdue': return 'bg-yellow-100 text-yellow-700'
      case 'Critical': return 'bg-red-100 text-red-700'
      case 'Legal': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Critical': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleSendReminder = (debtor: Debtor) => {
    alert(`Reminder sent to ${debtor.name} for AED ${debtor.overdueAmount.toLocaleString()}`)
  }

  const handleMarkPaid = (debtorId: number) => {
    setDebtors(debtors.map(d =>
      d.id === debtorId ? { ...d, overdueAmount: 0, status: 'Current' as const, daysOverdue: 0 } : d
    ))
    alert('Payment recorded successfully!')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Debtors Dashboard</h1>
          <p className="text-slate-500">Monitor outstanding payments and manage debtor relationships.</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">
            <Mail className="h-4 w-4" />
            Send Bulk Reminders
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all">
            <FileText className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Debt</span>
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">AED {stats.totalDebt.toLocaleString()}</p>
          <p className="text-xs font-bold text-blue-600 mt-2">Across {debtors.length} debtors</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Overdue Amount</span>
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">AED {stats.totalOverdue.toLocaleString()}</p>
          <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> {((stats.totalOverdue / stats.totalDebt) * 100).toFixed(1)}% of total
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Critical Debtors</span>
            <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats.criticalDebtors}</p>
          <p className="text-xs font-bold text-orange-600 mt-2">Require immediate attention</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Overdue Debtors</span>
            <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{stats.overdueDebtors}</p>
          <p className="text-xs font-bold text-yellow-600 mt-2">Need follow-up</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search debtors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="current">Current</option>
            <option value="overdue">Overdue</option>
            <option value="critical">Critical</option>
            <option value="legal">Legal</option>
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical Risk</option>
          </select>
        </div>
      </div>

      {/* Debtors Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Debtor</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Total Debt</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Overdue</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Next Due</th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDebtors.map((debtor) => (
                <tr key={debtor.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{debtor.name}</div>
                        <div className="text-sm text-slate-500">{debtor.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">AED {debtor.totalDebt.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-red-600">AED {debtor.overdueAmount.toLocaleString()}</div>
                    {debtor.daysOverdue > 0 && (
                      <div className="text-xs text-slate-500">{debtor.daysOverdue} days overdue</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(debtor.status)}`}>
                      {debtor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getRiskColor(debtor.riskLevel)}`}>
                      {debtor.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{debtor.nextDueDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendReminder(debtor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Send Reminder"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMarkPaid(debtor.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as Paid"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDebtor(debtor)
                          setShowDetails(true)
                        }}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Debtor Details Modal */}
      {showDetails && selectedDebtor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedDebtor.name}</h2>
                  <p className="text-slate-500">{selectedDebtor.company}</p>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-500">Contact Information</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedDebtor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{selectedDebtor.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-500">Financial Summary</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Debt:</span>
                        <span className="font-bold">AED {selectedDebtor.totalDebt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Overdue Amount:</span>
                        <span className="font-bold text-red-600">AED {selectedDebtor.overdueAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Days Overdue:</span>
                        <span className="font-bold">{selectedDebtor.daysOverdue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-500">Status & Risk</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(selectedDebtor.status)}`}>
                          {selectedDebtor.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${getRiskColor(selectedDebtor.riskLevel)}`}>
                          {selectedDebtor.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-500">Payment Schedule</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Last Payment:</span>
                        <span className="text-sm">{selectedDebtor.lastPayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Next Due Date:</span>
                        <span className="text-sm">{selectedDebtor.nextDueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-bold text-slate-500">Notes</label>
                <p className="mt-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{selectedDebtor.notes}</p>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-500 mb-3 block">Payment History</label>
                <div className="space-y-2">
                  {selectedDebtor.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">AED {payment.amount.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">{payment.date} • {payment.method}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => handleSendReminder(selectedDebtor)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Send Payment Reminder
                </button>
                <button
                  onClick={() => handleMarkPaid(selectedDebtor.id)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-700 transition-colors"
                >
                  Record Payment
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
