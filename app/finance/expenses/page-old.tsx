'use client'

import { useState, useCallback, useMemo } from 'react'
import { DollarSign, Plus, Download, Filter, Trash2, Edit3, Eye } from 'lucide-react'

interface Expense {
  id: string
  date: string
  description: string
  category: string
  amount: number
  paymentMethod: string
  receiptStatus: 'Attached' | 'Missing'
  approvalStatus: 'Approved' | 'Pending' | 'Rejected'
  reimbursement: boolean
  vendor?: string
}

export default function FinanceExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Office Equipment - Computer Monitors',
      category: 'Equipment',
      amount: 3500,
      paymentMethod: 'Credit Card',
      receiptStatus: 'Attached',
      approvalStatus: 'Approved',
      reimbursement: false,
      vendor: 'Tech Store Inc'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Software Licenses - Annual Subscription',
      category: 'Software',
      amount: 5000,
      paymentMethod: 'Bank Transfer',
      receiptStatus: 'Attached',
      approvalStatus: 'Approved',
      reimbursement: false,
      vendor: 'SaaS Provider'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Office Rent - Monthly Lease',
      category: 'Rent',
      amount: 8000,
      paymentMethod: 'Bank Transfer',
      receiptStatus: 'Attached',
      approvalStatus: 'Approved',
      reimbursement: false,
      vendor: 'Commercial Properties LLC'
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Utilities - Electric and Internet',
      category: 'Utilities',
      amount: 1200,
      paymentMethod: 'Auto Pay',
      receiptStatus: 'Missing',
      approvalStatus: 'Pending',
      reimbursement: false
    },
    {
      id: '5',
      date: '2024-01-11',
      description: 'Marketing Services - Social Media Campaign',
      category: 'Marketing',
      amount: 4500,
      paymentMethod: 'Credit Card',
      receiptStatus: 'Attached',
      approvalStatus: 'Approved',
      reimbursement: false,
      vendor: 'Marketing Agency Pro'
    },
    {
      id: '6',
      date: '2024-01-10',
      description: 'Employee Travel - Conference Registration',
      category: 'Travel',
      amount: 2000,
      paymentMethod: 'Credit Card',
      receiptStatus: 'Attached',
      approvalStatus: 'Pending',
      reimbursement: true,
      vendor: 'Conference Organizer'
    }
  ])

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate summary statistics
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const approvedExpenses = useMemo(() => {
    return expenses
      .filter(e => e.approvalStatus === 'Approved')
      .reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const pendingExpenses = useMemo(() => {
    return expenses
      .filter(e => e.approvalStatus === 'Pending')
      .reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const reimbursableAmount = useMemo(() => {
    return expenses
      .filter(e => e.reimbursement && e.approvalStatus === 'Approved')
      .reduce((sum, e) => sum + e.amount, 0)
  }, [expenses])

  const expensesByCategory = useMemo(() => {
    const categories: { [key: string]: number } = {}
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + e.amount
    })
    return Object.entries(categories)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: Math.round((amount / totalExpenses) * 100)
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses, totalExpenses])

  // Filtered expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory
      const matchesStatus = filterStatus === 'all' || expense.approvalStatus === filterStatus
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      return matchesCategory && matchesStatus && matchesSearch
    })
  }, [expenses, filterCategory, filterStatus, searchTerm])

  // Handler functions
  const handleViewExpense = useCallback((expense: Expense) => {
    setSelectedExpense(expense)
    setShowExpenseModal(true)
  }, [])

  const handleApproveExpense = useCallback((expenseId: string) => {
    setExpenses(prev => prev.map(e => 
      e.id === expenseId ? { ...e, approvalStatus: 'Approved' } : e
    ))
    alert('Expense approved successfully!')
  }, [])

  const handleRejectExpense = useCallback((expenseId: string) => {
    setExpenses(prev => prev.map(e => 
      e.id === expenseId ? { ...e, approvalStatus: 'Rejected' } : e
    ))
    alert('Expense rejected. Notification sent to requester.')
  }, [])

  const handleDeleteExpense = useCallback((expenseId: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(e => e.id !== expenseId))
      alert('Expense deleted successfully!')
    }
  }, [])

  const handleProcessReimbursement = useCallback((expenseId: string) => {
    alert('Reimbursement processed successfully! Payment will be sent within 2-3 business days.')
  }, [])

  const handleAddExpense = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const handleCreateExpense = useCallback(() => {
    alert('New expense added successfully!')
    setShowAddModal(false)
  }, [])

  const handleDownloadReceipt = useCallback((expenseId: string) => {
    alert('Receipt downloaded.')
  }, [])

  const handleUploadReceipt = useCallback((expenseId: string) => {
    alert('Receipt upload initiated. Please select file.')
  }, [])

  const handleExportExpenses = useCallback(() => {
    alert('Expenses exported as CSV file.')
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getReceiptColor = (status: string) => {
    return status === 'Attached'
      ? 'text-green-600 dark:text-green-400'
      : 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Expense Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Track, approve, and reimburse expenses</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddExpense}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Add Expense
              </button>
              <button
                onClick={handleExportExpenses}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          {/* Approved Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">${approvedExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Pending Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">${pendingExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <Filter size={24} className="text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Reimbursable Amount */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">To Reimburse</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${reimbursableAmount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Expenses by Category</h2>
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

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search by description or vendor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            {expensesByCategory.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Expenses List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Expenses</h2>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{expense.description}</h3>
                    {expense.vendor && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">Vendor: {expense.vendor}</p>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${expense.amount.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">DATE</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{expense.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">CATEGORY</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{expense.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">PAYMENT</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{expense.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">RECEIPT</p>
                    <p className={`text-sm font-semibold ${getReceiptColor(expense.receiptStatus)}`}>{expense.receiptStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">STATUS</p>
                    <span className={`text-xs inline-block px-2 py-1 rounded font-semibold ${getStatusColor(expense.approvalStatus)}`}>
                      {expense.approvalStatus}
                    </span>
                  </div>
                </div>

                {expense.reimbursement && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">This is a reimbursable expense</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewExpense(expense)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  {expense.approvalStatus === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApproveExpense(expense.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectExpense(expense.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {expense.reimbursement && expense.approvalStatus === 'Approved' && (
                    <button
                      onClick={() => handleProcessReimbursement(expense.id)}
                      className="flex-1 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                    >
                      Reimburse
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense Detail Modal */}
      {showExpenseModal && selectedExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Expense Details</h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedExpense.description}</p>
              </div>
              {selectedExpense.vendor && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vendor</p>
                  <p className="text-gray-900 dark:text-white">{selectedExpense.vendor}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                  <p className="text-gray-900 dark:text-white">{selectedExpense.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedExpense.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-gray-900 dark:text-white">{selectedExpense.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                  <p className="text-gray-900 dark:text-white">{selectedExpense.paymentMethod}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receipt Status</p>
                  <p className={`font-semibold ${getReceiptColor(selectedExpense.receiptStatus)}`}>{selectedExpense.receiptStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Approval Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${getStatusColor(selectedExpense.approvalStatus)}`}>
                    {selectedExpense.approvalStatus}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowExpenseModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Add New Expense</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <input type="text" placeholder="Enter expense description" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Equipment</option>
                  <option>Software</option>
                  <option>Rent</option>
                  <option>Utilities</option>
                  <option>Marketing</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
                <input type="number" placeholder="Enter amount" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Check</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">This is a reimbursable expense</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateExpense}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
              >
                Add Expense
              </button>
              <button
                onClick={() => setShowAddModal(false)}
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
