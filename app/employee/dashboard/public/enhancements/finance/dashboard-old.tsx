'use client'

import { useState, useCallback, useMemo } from 'react'
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3, Download, Calendar, Eye } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  status: 'Completed' | 'Pending'
}

interface FinancialMetric {
  id: string
  label: string
  value: number
  change: number
  changeType: 'increase' | 'decrease'
  icon: React.ReactNode
  bgColor: string
}

export default function FinanceDashboardPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('30')

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Project Invoice - Web Development',
      category: 'Income',
      amount: 25000,
      type: 'income',
      status: 'Completed'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Office Equipment - Computer Monitors',
      category: 'Equipment',
      amount: 3500,
      type: 'expense',
      status: 'Completed'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Software Licenses - Annual Subscription',
      category: 'Software',
      amount: 5000,
      type: 'expense',
      status: 'Completed'
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Retainer Payment - Consulting Services',
      category: 'Income',
      amount: 15000,
      type: 'income',
      status: 'Completed'
    },
    {
      id: '5',
      date: '2024-01-11',
      description: 'Office Rent - Monthly Lease',
      category: 'Rent',
      amount: 8000,
      type: 'expense',
      status: 'Completed'
    },
    {
      id: '6',
      date: '2024-01-10',
      description: 'Utilities - Electric and Internet',
      category: 'Utilities',
      amount: 1200,
      type: 'expense',
      status: 'Pending'
    },
    {
      id: '7',
      date: '2024-01-09',
      description: 'Marketing Services - Social Media Campaign',
      category: 'Marketing',
      amount: 4500,
      type: 'expense',
      status: 'Completed'
    },
    {
      id: '8',
      date: '2024-01-08',
      description: 'New Project Contract - Design Services',
      category: 'Income',
      amount: 18000,
      type: 'income',
      status: 'Pending'
    }
  ]

  // Calculate financial metrics
  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income' && t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [])

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense' && t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0)
  }, [])

  const netProfit = useMemo(() => {
    return totalIncome - totalExpenses
  }, [totalIncome, totalExpenses])

  const pendingTransactions = useMemo(() => {
    return transactions.filter(t => t.status === 'Pending').reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount
    }, 0)
  }, [])

  // Calculate category breakdown
  const expensesByCategory = useMemo(() => {
    const categories: { [key: string]: number } = {}
    transactions
      .filter(t => t.type === 'expense' && t.status === 'Completed')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount
      })
    return Object.entries(categories).map(([name, amount]) => ({
      name,
      amount,
      percentage: Math.round((amount / totalExpenses) * 100)
    }))
  }, [transactions, totalExpenses])

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory
      const matchesType = filterType === 'all' || t.type === filterType
      return matchesCategory && matchesType
    })
  }, [filterCategory, filterType])

  // Handler functions
  const handleViewTransaction = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionModal(true)
  }, [])

  const handleDownloadReport = useCallback(() => {
    alert('Financial report downloaded as PDF')
  }, [])

  const handleExportData = useCallback(() => {
    alert('Financial data exported as CSV')
  }, [])

  const handleGenerateInvoice = useCallback(() => {
    alert('New invoice created. Redirect to invoice editor.')
  }, [])

  const handleViewCashFlow = useCallback(() => {
    alert('Cash flow chart displayed. Showing monthly trends.')
  }, [])

  const getTransactionIcon = (type: string) => {
    if (type === 'income') {
      return <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
    }
    return <TrendingDown size={20} className="text-red-600 dark:text-red-400" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finance Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor income, expenses, and financial metrics</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Download size={18} />
                Report
              </button>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Income */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Income</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-3">↑ +12% vs last month</p>
          </div>

          {/* Total Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <TrendingDown size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-3">↑ +8% vs last month</p>
          </div>

          {/* Net Profit */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Net Profit</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${netProfit.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-3">Profit margin: {((netProfit / totalIncome) * 100).toFixed(1)}%</p>
          </div>

          {/* Pending Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Pending Balance</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${pendingTransactions.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <Calendar size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-3">{transactions.filter(t => t.status === 'Pending').length} pending</p>
          </div>
        </div>

        {/* Charts and Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart size={20} />
              Expense Breakdown
            </h2>
            <div className="space-y-4">
              {expensesByCategory.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{category.name}</span>
                    <span className="text-gray-900 dark:text-white font-bold">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">{category.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Income vs Expenses Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 size={20} />
              Income vs Expenses
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Income</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Expenses</span>
                  <span className="text-red-600 dark:text-red-400 font-bold">${totalExpenses.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Net Profit</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">${netProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleGenerateInvoice}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg transition"
            >
              <DollarSign size={24} className="text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-gray-900 dark:text-white font-medium">Create Invoice</p>
            </button>
            <button
              onClick={handleViewCashFlow}
              className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg transition"
            >
              <TrendingUp size={24} className="text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-gray-900 dark:text-white font-medium">Cash Flow Chart</p>
            </button>
            <button
              onClick={handleDownloadReport}
              className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg transition"
            >
              <Download size={24} className="text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-gray-900 dark:text-white font-medium">Download Report</p>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>

          {/* Filters */}
          <div className="mb-6 flex gap-4 flex-col md:flex-row">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="Income">Income</option>
              <option value="Equipment">Equipment</option>
              <option value="Software">Software</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{transaction.description}</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                          {transaction.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs mt-1 inline-block px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transaction Details</h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedTransaction.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedTransaction.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedTransaction.category}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className={`text-2xl font-bold ${
                  selectedTransaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}${selectedTransaction.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <span className={`text-sm inline-block px-3 py-1 rounded-full font-medium ${getStatusColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowTransactionModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
