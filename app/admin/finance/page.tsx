'use client'

import { useState, useCallback } from 'react'
import { TrendingUp, DollarSign, CreditCard, Eye, Plus, X, ArrowUpRight, ArrowDownRight, FileText, BarChart3, Users, Wallet } from 'lucide-react'
import Link from 'next/link'

interface Invoice {
  id: number
  invoiceNumber: string
  client: string
  amount: number
  status: 'Pending' | 'Paid' | 'Overdue'
  dueDate: string
  issuedDate: string
}

interface Expense {
  id: number
  description: string
  category: string
  amount: number
  date: string
  paymentMethod: string
}

export default function Finance() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'expenses'>('invoices')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, invoiceNumber: '#INV-001', client: 'Ahmed Al-Mansoori', amount: 2500, status: 'Paid', dueDate: '2025-12-25', issuedDate: '2025-12-15' },
    { id: 2, invoiceNumber: '#INV-002', client: 'Business Corp', amount: 8500, status: 'Pending', dueDate: '2025-12-28', issuedDate: '2025-12-18' },
    { id: 3, invoiceNumber: '#INV-003', client: 'Fatima Al-Zahra', amount: 1800, status: 'Overdue', dueDate: '2025-12-10', issuedDate: '2025-12-01' }
  ])

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Cleaning Supplies', category: 'Supplies', amount: 850, date: '2025-12-20', paymentMethod: 'Credit Card' },
    { id: 2, description: 'Vehicle Fuel', category: 'Transportation', amount: 450, date: '2025-12-19', paymentMethod: 'Debit Card' },
    { id: 3, description: 'Staff Salaries', category: 'Payroll', amount: 45000, date: '2025-12-15', paymentMethod: 'Bank Transfer' }
  ])

  const [newInvoice, setNewInvoice] = useState({ client: '', amount: '', dueDate: '' })

  const totalIncome = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const profit = totalIncome - totalExpenses
  const debtorsCount = 4 // This would come from actual debtors data

  const handleAddInvoice = useCallback(() => {
    if (newInvoice.client && newInvoice.amount) {
      const invoice: Invoice = {
        id: Math.max(...invoices.map(i => i.id), 0) + 1,
        invoiceNumber: `#INV-${String(invoices.length + 1).padStart(3, '0')}`,
        client: newInvoice.client,
        amount: Number(newInvoice.amount),
        status: 'Pending',
        dueDate: newInvoice.dueDate,
        issuedDate: new Date().toISOString().split('T')[0]
      }
      setInvoices([...invoices, invoice])
      setNewInvoice({ client: '', amount: '', dueDate: '' })
      setShowAddModal(false)
      alert(`✓ Invoice ${invoice.invoiceNumber} created!`)
    }
  }, [newInvoice, invoices])

  const handleStatusChange = useCallback((id: number, newStatus: string) => {
    setInvoices(invoices.map(i =>
      i.id === id ? { ...i, status: newStatus as any } : i
    ))
    alert(`✓ Invoice status updated to "${newStatus}"`)
  }, [invoices])

  const handleMarkPaid = useCallback((id: number) => {
    setInvoices(invoices.map(i =>
      i.id === id ? { ...i, status: 'Paid' as const } : i
    ))
    alert(`✓ Invoice marked as Paid`)
  }, [invoices])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Supplies': return 'bg-blue-100 text-blue-700'
      case 'Transportation': return 'bg-purple-100 text-purple-700'
      case 'Payroll': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Finance</h1>
          <p className="text-slate-500">Manage invoices, payments, and expenses.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus className="h-5 w-5" />
          New Invoice
        </button>
      </div>

      {/* Finance Modules Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Link
          href="/admin/finance"
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Invoices</h3>
              <p className="text-xs text-slate-500">Create & manage</p>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{invoices.length}</div>
          <div className="text-xs text-slate-500 mt-1">Active invoices</div>
        </Link>

        <Link
          href="/admin/finance/invoice-generator"
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Plus className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Generator</h3>
              <p className="text-xs text-slate-500">Create invoices</p>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">New</div>
          <div className="text-xs text-slate-500 mt-1">Invoice creation</div>
        </Link>

        <Link
          href="/admin/finance/debtors-dashboard"
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Debtors</h3>
              <p className="text-xs text-slate-500">Monitor payments</p>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{debtorsCount}</div>
          <div className="text-xs text-slate-500 mt-1">Outstanding</div>
        </Link>

        <Link
          href="/admin/finance/payment-tracker"
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Payments</h3>
              <p className="text-xs text-slate-500">Track & monitor</p>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{invoices.filter(i => i.status === 'Paid').length}</div>
          <div className="text-xs text-slate-500 mt-1">Paid this month</div>
        </Link>

        <Link
          href="/admin/finance/finance-reports"
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Reports</h3>
              <p className="text-xs text-slate-500">Analytics & insights</p>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">12</div>
          <div className="text-xs text-slate-500 mt-1">Reports available</div>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Income</span>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">AED {totalIncome.toLocaleString()}</p>
          <p className="text-xs font-bold text-green-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> +12.5% from last month
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Expenses</span>
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">AED {totalExpenses.toLocaleString()}</p>
          <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1">
            <ArrowDownRight className="h-3 w-3" /> +5.2% from last month
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Net Profit</span>
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900">AED {profit.toLocaleString()}</p>
          <p className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> Healthy margins
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('invoices')}
          className={`px-6 py-3 font-black transition-all border-b-2 ${
            activeTab === 'invoices' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          Invoices ({invoices.length})
        </button>
        <button 
          onClick={() => setActiveTab('expenses')}
          className={`px-6 py-3 font-black transition-all border-b-2 ${
            activeTab === 'expenses' 
              ? 'text-blue-600 border-blue-600' 
              : 'text-slate-600 border-transparent hover:text-slate-900'
          }`}
        >
          Expenses ({expenses.length})
        </button>
      </div>

      {/* Invoices */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Invoice #</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Issued</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Due</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-blue-600">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{invoice.client}</td>
                    <td className="px-6 py-4 font-black text-slate-900">AED {invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{invoice.issuedDate}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={invoice.status}
                        onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg font-bold text-sm border-0 cursor-pointer ${getStatusColor(invoice.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setShowDetails(true)
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {invoice.status !== 'Paid' && (
                          <button 
                            onClick={() => handleMarkPaid(invoice.id)}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all"
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expenses */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-700 uppercase">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{expense.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">AED {expense.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{expense.date}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-bold">{expense.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">New Invoice</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-black text-slate-900">Client *</label>
                <input 
                  type="text"
                  value={newInvoice.client}
                  onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                  placeholder="Client Name"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-black text-slate-900">Amount (AED) *</label>
                <input 
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  placeholder="0"
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-black text-slate-900">Due Date</label>
                <input 
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                  className="w-full mt-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border-2 border-slate-200 text-slate-900 font-black rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddInvoice}
                  className="flex-1 py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showDetails && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Invoice Details</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs font-black text-blue-600 uppercase">Invoice Number</p>
                <p className="text-2xl font-black text-blue-700">{selectedInvoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase">Client</p>
                <p className="text-slate-900 font-bold">{selectedInvoice.client}</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase">Amount</p>
                <p className="text-3xl font-black text-slate-900">AED {selectedInvoice.amount.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase">Issued</p>
                  <p className="text-slate-700 font-bold">{selectedInvoice.issuedDate}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase">Due</p>
                  <p className="text-slate-700 font-bold">{selectedInvoice.dueDate}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="w-full py-2 bg-blue-600 text-white font-black rounded-lg hover:bg-blue-700 mt-6"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
