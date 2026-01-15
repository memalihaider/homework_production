'use client'

import { useState, useCallback, useMemo } from 'react'
import { DollarSign, TrendingUp, AlertCircle, Plus, Edit3, Trash2, Eye } from 'lucide-react'

interface Budget {
  id: string
  name: string
  category: string
  limit: number
  spent: number
  period: 'Monthly' | 'Quarterly' | 'Annual'
  startDate: string
  endDate: string
  status: 'On Track' | 'At Risk' | 'Exceeded' | 'Not Started'
  alerts: boolean
  owner: string
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Marketing Budget',
      category: 'Marketing',
      limit: 50000,
      spent: 35000,
      period: 'Monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'On Track',
      alerts: true,
      owner: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'IT Infrastructure',
      category: 'IT',
      limit: 30000,
      spent: 28500,
      period: 'Quarterly',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'At Risk',
      alerts: true,
      owner: 'Mike Chen'
    },
    {
      id: '3',
      name: 'Office Operations',
      category: 'Operations',
      limit: 100000,
      spent: 125000,
      period: 'Annual',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'Exceeded',
      alerts: true,
      owner: 'Jane Wilson'
    },
    {
      id: '4',
      name: 'Employee Training',
      category: 'HR',
      limit: 15000,
      spent: 8000,
      period: 'Annual',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'On Track',
      alerts: false,
      owner: 'John Smith'
    },
    {
      id: '5',
      name: 'Travel & Events',
      category: 'Travel',
      limit: 25000,
      spent: 12000,
      period: 'Quarterly',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'On Track',
      alerts: false,
      owner: 'Robert Brown'
    },
    {
      id: '6',
      name: 'Research & Development',
      category: 'R&D',
      limit: 80000,
      spent: 0,
      period: 'Quarterly',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'Not Started',
      alerts: false,
      owner: 'Emily Davis'
    }
  ])

  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)
  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPeriod, setFilterPeriod] = useState<string>('all')

  // Calculate summary statistics
  const totalBudgetLimit = useMemo(() => {
    return budgets.reduce((sum, b) => sum + b.limit, 0)
  }, [budgets])

  const totalSpent = useMemo(() => {
    return budgets.reduce((sum, b) => sum + b.spent, 0)
  }, [budgets])

  const totalRemaining = useMemo(() => {
    return totalBudgetLimit - totalSpent
  }, [totalBudgetLimit, totalSpent])

  const budgetsOnTrack = useMemo(() => {
    return budgets.filter(b => b.status === 'On Track').length
  }, [budgets])

  const budgetsAtRisk = useMemo(() => {
    return budgets.filter(b => b.status === 'At Risk' || b.status === 'Exceeded').length
  }, [budgets])

  // Filtered budgets
  const filteredBudgets = useMemo(() => {
    return budgets.filter(budget => {
      const matchesCategory = filterCategory === 'all' || budget.category === filterCategory
      const matchesStatus = filterStatus === 'all' || budget.status === filterStatus
      const matchesPeriod = filterPeriod === 'all' || budget.period === filterPeriod
      return matchesCategory && matchesStatus && matchesPeriod
    })
  }, [budgets, filterCategory, filterStatus, filterPeriod])

  // Get budget categories
  const categories = useMemo(() => {
    return [...new Set(budgets.map(b => b.category))]
  }, [budgets])

  // Handler functions
  const handleViewBudget = useCallback((budget: Budget) => {
    setSelectedBudget(budget)
    setShowBudgetModal(true)
  }, [])

  const handleAddBudget = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const handleCreateBudget = useCallback(() => {
    alert('New budget created successfully!')
    setShowAddModal(false)
  }, [])

  const handleDeleteBudget = useCallback((budgetId: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      setBudgets(prev => prev.filter(b => b.id !== budgetId))
      alert('Budget deleted successfully!')
    }
  }, [])

  const handleEditBudget = useCallback((budgetId: string) => {
    const budget = budgets.find(b => b.id === budgetId)
    if (budget) {
      setSelectedBudget(budget)
      setShowBudgetModal(true)
    }
  }, [budgets])

  const handleAlertSettings = useCallback((budgetId: string) => {
    alert('Budget alert settings updated.')
  }, [])

  const handleAdjustBudget = useCallback((budgetId: string, newLimit: number) => {
    alert(`Budget adjusted to $${newLimit.toLocaleString()}`)
  }, [])

  const handleExportBudgets = useCallback(() => {
    alert('Budgets exported as CSV file.')
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Exceeded':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'Not Started':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return 'bg-red-600'
    if (percentage >= 80) return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const getProgressPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Create, track, and manage departmental budgets</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddBudget}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                New Budget
              </button>
              <button
                onClick={handleExportBudgets}
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
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Budget */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Budget Limit</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalBudgetLimit.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalSpent.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <TrendingUp size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-3">{((totalSpent / totalBudgetLimit) * 100).toFixed(1)}% utilization</p>
          </div>

          {/* Remaining */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Remaining</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">${totalRemaining.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <DollarSign size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Budget Status</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-700 dark:text-gray-300">On Track</span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">{budgetsOnTrack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-700 dark:text-gray-300">At Risk/Exceeded</span>
                  <span className="text-xs font-bold text-red-600 dark:text-red-400">{budgetsAtRisk}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Budget Utilization */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overall Budget Utilization</h2>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700 dark:text-gray-300">Total Spent vs Budget</span>
              <span className="text-gray-900 dark:text-white font-bold">${totalSpent.toLocaleString()} / ${totalBudgetLimit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className={`${getProgressColor(totalSpent, totalBudgetLimit)} h-4 rounded-full`}
                style={{ width: `${getProgressPercentage(totalSpent, totalBudgetLimit)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {((totalSpent / totalBudgetLimit) * 100).toFixed(1)}% of total budget used
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4 flex-col md:flex-row">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Exceeded">Exceeded</option>
            <option value="Not Started">Not Started</option>
          </select>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Periods</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annual">Annual</option>
          </select>
        </div>

        {/* Budgets List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Budgets</h2>
          <div className="space-y-4">
            {filteredBudgets.map((budget) => (
              <div key={budget.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{budget.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {budget.startDate} - {budget.endDate} ({budget.period})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Owner: {budget.owner}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(budget.status)}`}>
                    {budget.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Spending Progress</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      ${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`${getProgressColor(budget.spent, budget.limit)} h-3 rounded-full`}
                      style={{ width: `${getProgressPercentage(budget.spent, budget.limit)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getProgressPercentage(budget.spent, budget.limit).toFixed(0)}% used
                    </span>
                    <span className={`text-xs font-semibold ${
                      budget.spent > budget.limit
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {budget.spent > budget.limit 
                        ? `$${(budget.spent - budget.limit).toLocaleString()} over`
                        : `$${(budget.limit - budget.spent).toLocaleString()} remaining`
                      }
                    </span>
                  </div>
                </div>

                {/* Budget Info Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">CATEGORY</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{budget.category}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">BUDGET LIMIT</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${budget.limit.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">SPENT</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${budget.spent.toLocaleString()}</p>
                  </div>
                </div>

                {/* Alerts */}
                {budget.status === 'Exceeded' && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800 flex items-start gap-2">
                    <AlertCircle size={18} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">Budget limit exceeded. Immediate action required.</p>
                  </div>
                )}
                {budget.status === 'At Risk' && (
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-start gap-2">
                    <AlertCircle size={18} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">Approaching budget limit. Review spending and plan accordingly.</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewBudget(budget)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleEditBudget(budget.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleAlertSettings(budget.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    Alerts
                  </button>
                  <button
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg transition text-sm font-medium"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Detail Modal */}
      {showBudgetModal && selectedBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{selectedBudget.name}</h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Budget Limit</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedBudget.limit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Amount Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedBudget.spent.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Spending Progress</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                  <div
                    className={`${getProgressColor(selectedBudget.spent, selectedBudget.limit)} h-4 rounded-full`}
                    style={{ width: `${getProgressPercentage(selectedBudget.spent, selectedBudget.limit)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-900 dark:text-white font-semibold">
                  {getProgressPercentage(selectedBudget.spent, selectedBudget.limit).toFixed(1)}% utilized
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Period</p>
                  <p className="text-gray-900 dark:text-white">{selectedBudget.period}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <span className={`text-sm inline-block px-2 py-1 rounded font-semibold ${getStatusColor(selectedBudget.status)}`}>
                    {selectedBudget.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Owner</p>
                <p className="text-gray-900 dark:text-white">{selectedBudget.owner}</p>
              </div>
            </div>
            <button
              onClick={() => setShowBudgetModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Budget Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Create New Budget</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Name</label>
                <input type="text" placeholder="e.g., Marketing Budget Q1" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Marketing</option>
                  <option>Operations</option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Travel</option>
                  <option>R&D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Limit</label>
                <input type="number" placeholder="Enter amount" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annual</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Enable budget alerts</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateBudget}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
              >
                Create Budget
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
