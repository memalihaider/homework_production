'use client'

import { useState, useCallback, useMemo } from 'react'
import { Download, Filter, BarChart3, TrendingUp, Eye, Plus } from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'Income' | 'Expense' | 'Profit & Loss' | 'Cash Flow' | 'Budget Variance'
  period: string
  dateRange: string
  generatedDate: string
  totalAmount: number
  status: 'Generated' | 'Pending' | 'Scheduled'
  format: 'PDF' | 'Excel' | 'CSV'
}

export default function FinanceReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPeriod, setFilterPeriod] = useState<string>('all')

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Q1 2024 Income Report',
      type: 'Income',
      period: 'Q1 2024',
      dateRange: 'Jan 1 - Mar 31, 2024',
      generatedDate: '2024-01-15',
      totalAmount: 180000,
      status: 'Generated',
      format: 'PDF'
    },
    {
      id: '2',
      name: 'Monthly Expense Report - January',
      type: 'Expense',
      period: 'Jan 2024',
      dateRange: 'Jan 1 - Jan 31, 2024',
      generatedDate: '2024-02-01',
      totalAmount: 42000,
      status: 'Generated',
      format: 'Excel'
    },
    {
      id: '3',
      name: 'Profit & Loss Statement - Q4 2023',
      type: 'Profit & Loss',
      period: 'Q4 2023',
      dateRange: 'Oct 1 - Dec 31, 2023',
      generatedDate: '2024-01-10',
      totalAmount: 95000,
      status: 'Generated',
      format: 'PDF'
    },
    {
      id: '4',
      name: 'Cash Flow Analysis - December 2023',
      type: 'Cash Flow',
      period: 'Dec 2023',
      dateRange: 'Dec 1 - Dec 31, 2023',
      generatedDate: '2024-01-05',
      totalAmount: 78000,
      status: 'Generated',
      format: 'Excel'
    },
    {
      id: '5',
      name: 'Budget Variance Report - Q1 2024',
      type: 'Budget Variance',
      period: 'Q1 2024',
      dateRange: 'Jan 1 - Mar 31, 2024',
      generatedDate: '2024-01-15',
      totalAmount: -5000,
      status: 'Pending',
      format: 'CSV'
    },
    {
      id: '6',
      name: 'Annual Income Summary - 2023',
      type: 'Income',
      period: 'Full Year 2023',
      dateRange: 'Jan 1 - Dec 31, 2023',
      generatedDate: '2024-01-01',
      totalAmount: 650000,
      status: 'Generated',
      format: 'PDF'
    },
    {
      id: '7',
      name: 'Expense Breakdown - Q1 2024',
      type: 'Expense',
      period: 'Q1 2024',
      dateRange: 'Jan 1 - Mar 31, 2024',
      generatedDate: '2024-01-20',
      totalAmount: 128000,
      status: 'Pending',
      format: 'Excel'
    },
    {
      id: '8',
      name: 'Monthly P&L - January 2024',
      type: 'Profit & Loss',
      period: 'Jan 2024',
      dateRange: 'Jan 1 - Jan 31, 2024',
      generatedDate: '2024-02-01',
      totalAmount: 65000,
      status: 'Generated',
      format: 'PDF'
    }
  ]

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesType = filterType === 'all' || report.type === filterType
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus
      const matchesPeriod = filterPeriod === 'all' || report.period.includes(filterPeriod)
      return matchesType && matchesStatus && matchesPeriod
    })
  }, [filterType, filterStatus, filterPeriod])

  // Calculate summary statistics
  const totalReports = useMemo(() => reports.length, [])
  const generatedReports = useMemo(() => reports.filter(r => r.status === 'Generated').length, [])
  const pendingReports = useMemo(() => reports.filter(r => r.status === 'Pending').length, [])

  const reportsByType = useMemo(() => {
    const types: { [key: string]: number } = {}
    reports.forEach(r => {
      types[r.type] = (types[r.type] || 0) + 1
    })
    return Object.entries(types).map(([name, count]) => ({ name, count }))
  }, [])

  // Handler functions
  const handleViewReport = useCallback((report: Report) => {
    setSelectedReport(report)
    setShowReportModal(true)
  }, [])

  const handleDownloadReport = useCallback((reportId: string) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      alert(`Report "${report.name}" downloaded as ${report.format}`)
    }
  }, [])

  const handleGenerateNewReport = useCallback(() => {
    setShowGenerateModal(true)
  }, [])

  const handleCreateReport = useCallback(() => {
    alert('New report generation started. You will receive notification when ready.')
    setShowGenerateModal(false)
  }, [])

  const handleScheduleReport = useCallback(() => {
    alert('Report scheduled for automatic generation. Frequency set to monthly.')
  }, [])

  const handleEmailReport = useCallback((reportId: string) => {
    alert('Report sent to your email address.')
  }, [])

  const handleExportAllReports = useCallback(() => {
    alert('All reports exported as ZIP file.')
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Income':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'Expense':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      case 'Profit & Loss':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'Cash Flow':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      case 'Budget Variance':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Generate, view, and manage financial reports</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerateNewReport}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Generate Report
              </button>
              <button
                onClick={handleExportAllReports}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <Download size={18} />
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalReports}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <BarChart3 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Generated</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{generatedReports}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Pending Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingReports}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <Filter size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Report Types */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Report Types</p>
              <div className="space-y-2">
                {reportsByType.slice(0, 2).map((type) => (
                  <div key={type.name} className="flex justify-between">
                    <span className="text-xs text-gray-700 dark:text-gray-300">{type.name}</span>
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Report Types Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Report Types Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {reportsByType.map((type) => (
              <div key={type.name} className="text-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{type.count}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-col md:flex-row">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Profit & Loss">Profit & Loss</option>
            <option value="Cash Flow">Cash Flow</option>
            <option value="Budget Variance">Budget Variance</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="Generated">Generated</option>
            <option value="Pending">Pending</option>
            <option value="Scheduled">Scheduled</option>
          </select>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Periods</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="Q1">Q1</option>
            <option value="Q4">Q4</option>
          </select>
        </div>

        {/* Reports List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Reports</h2>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{report.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{report.dateRange}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">PERIOD</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{report.period}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">GENERATED</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{report.generatedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">AMOUNT</p>
                    <p className={`text-sm font-semibold ${
                      report.totalAmount >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      ${report.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">FORMAT</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{report.format}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadReport(report.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => handleEmailReport(report.id)}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedReport.name}</h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Report Type</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedReport.type)}`}>
                    {selectedReport.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date Range</p>
                <p className="text-gray-900 dark:text-white">{selectedReport.dateRange}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Generated Date</p>
                  <p className="text-gray-900 dark:text-white">{selectedReport.generatedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Format</p>
                  <p className="text-gray-900 dark:text-white">{selectedReport.format}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                <p className={`text-2xl font-bold ${
                  selectedReport.totalAmount >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  ${selectedReport.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleDownloadReport(selectedReport.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
              >
                <Download size={18} />
                Download
              </button>
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Generate New Report</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Income Report</option>
                  <option>Expense Report</option>
                  <option>Profit & Loss Statement</option>
                  <option>Cash Flow Analysis</option>
                  <option>Budget Variance Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Quarter</option>
                  <option>Last Quarter</option>
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Format</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Send to email after generation</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateReport}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
              >
                Generate Report
              </button>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
