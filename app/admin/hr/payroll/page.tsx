'use client'

import { useState, useMemo } from 'react'
import {
  DollarSign,
  Calculator,
  Check,
  AlertCircle,
  Download,
  Send,
  FileText,
  Search,
  X,
  Wallet,
  CreditCard,
  Banknote,
  Receipt,
  CheckCircle2,
  Clock,
  ArrowDownRight,
  Edit,
  Save,
  Zap
} from 'lucide-react'

interface PayrollRecord {
  id: number
  employee: string
  role: string
  email: string
  bankAccount?: string
  paymentMethod: 'bank' | 'stripe' | 'paypal'
  basicSalary: number
  allowances: number
  deductions: number
  bonus: number
  grossPay: number
  netPay: number
  tax: number
  taxableIncome: number
  status: 'Pending' | 'Processed' | 'Paid'
  paidDate?: string
  paymentReference?: string
}

interface PaymentProvider {
  name: string
  icon: React.ReactNode
  fee: number
}


export default function Payroll() {
  const [activeTab, setActiveTab] = useState<'payroll' | 'payments' | 'settings'>('payroll')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [searchTerm, setSearchTerm] = useState('')
  const [editingRecord, setEditingRecord] = useState<PayrollRecord | null>(null)
  const [processingPayment, setProcessingPayment] = useState<number | null>(null)
  const [payslipModal, setPayslipModal] = useState<PayrollRecord | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'bank' | 'stripe' | 'paypal'>('bank')

  const [payrollData, setPayrollData] = useState<PayrollRecord[]>([
    { id: 1, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', email: 'ahmed@company.com', paymentMethod: 'bank', bankAccount: 'AE123456789', basicSalary: 8000, allowances: 2000, deductions: 1200, bonus: 1000, grossPay: 11000, netPay: 9800, status: 'Pending', taxableIncome: 9800, tax: 0 },
    { id: 2, employee: 'Fatima Al-Ketbi', role: 'HR Director', email: 'fatima@company.com', paymentMethod: 'stripe', basicSalary: 9000, allowances: 2500, deductions: 1300, bonus: 1500, grossPay: 12500, netPay: 11200, status: 'Processed', taxableIncome: 11200, tax: 0 },
    { id: 3, employee: 'Mohammed Bin Ali', role: 'Team Lead', email: 'mohammed@company.com', paymentMethod: 'paypal', basicSalary: 6000, allowances: 1500, deductions: 900, bonus: 500, grossPay: 8500, netPay: 7600, status: 'Processed', taxableIncome: 7600, tax: 0 },
    { id: 4, employee: 'Sara Al-Noor', role: 'Recruiter', email: 'sara@company.com', paymentMethod: 'bank', bankAccount: 'AE987654321', basicSalary: 5500, allowances: 1200, deductions: 800, bonus: 300, grossPay: 7500, netPay: 6700, status: 'Pending', taxableIncome: 6700, tax: 0 },
    { id: 5, employee: 'Layla Al-Mansouri', role: 'Payroll Officer', email: 'layla@company.com', paymentMethod: 'stripe', basicSalary: 5000, allowances: 1000, deductions: 700, bonus: 250, grossPay: 6500, netPay: 5800, status: 'Paid', taxableIncome: 5800, tax: 0, paidDate: '2025-01-05', paymentReference: 'TXN-20250105-001' },
    { id: 6, employee: 'Omar Khan', role: 'Specialist', email: 'omar@company.com', paymentMethod: 'paypal', basicSalary: 4500, allowances: 900, deductions: 600, bonus: 200, grossPay: 6000, netPay: 5400, status: 'Paid', taxableIncome: 5400, tax: 0, paidDate: '2025-01-05', paymentReference: 'TXN-20250105-002' },
  ])

  const [recordForm, setRecordForm] = useState({
    employee: '',
    role: '',
    email: '',
    paymentMethod: 'bank' as 'bank' | 'stripe' | 'paypal',
    bankAccount: '',
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    bonus: 0
  })

  const calculateTax = (taxableIncome: number): number => {
    if (taxableIncome <= 5000) return 0
    if (taxableIncome <= 10000) return (taxableIncome - 5000) * 0.05
    if (taxableIncome <= 20000) return 250 + (taxableIncome - 10000) * 0.10
    if (taxableIncome <= 35000) return 1250 + (taxableIncome - 20000) * 0.15
    return 3500 + (taxableIncome - 35000) * 0.20
  }

  const calculateSocialSecurity = (basicSalary: number): number => {
    return Math.round(basicSalary * 0.05)
  }

  const recalculatePayroll = (record: PayrollRecord) => {
    const grossPay = record.basicSalary + record.allowances + record.bonus
    const socialSecurity = calculateSocialSecurity(record.basicSalary)
    const totalDeductions = record.deductions + socialSecurity
    const taxableIncome = Math.max(0, grossPay - totalDeductions)
    const tax = calculateTax(taxableIncome)
    const netPay = grossPay - totalDeductions - tax

    return {
      ...record,
      deductions: totalDeductions,
      grossPay,
      netPay,
      taxableIncome,
      tax
    }
  }

  const filteredPayroll = useMemo(() => {
    return payrollData.filter(p => {
      const matchesSearch = searchTerm === '' || 
        p.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [payrollData, searchTerm])

  const stats = useMemo(() => {
    return {
      totalGross: filteredPayroll.reduce((sum, p) => sum + p.grossPay, 0),
      totalNet: filteredPayroll.reduce((sum, p) => sum + p.netPay, 0),
      totalDeductions: filteredPayroll.reduce((sum, p) => sum + p.deductions + p.tax, 0),
      pending: filteredPayroll.filter(p => p.status === 'Pending').length,
      processed: filteredPayroll.filter(p => p.status === 'Processed').length,
      paid: filteredPayroll.filter(p => p.status === 'Paid').length
    }
  }, [filteredPayroll])

  const handleProcessPayroll = async () => {
    const updatedData = payrollData.map(record => 
      record.status === 'Pending' 
        ? { ...recalculatePayroll(record), status: 'Processed' as const }
        : record
    )
    setPayrollData(updatedData)
    alert('Payroll processed successfully!')
  }

  const handlePayEmployee = async (recordId: number) => {
    setProcessingPayment(recordId)
    const record = payrollData.find(r => r.id === recordId)
    if (!record) return

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate payment reference
    const paymentRef = `TXN-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${recordId}`

    const updatedRecord = {
      ...record,
      status: 'Paid' as const,
      paidDate: new Date().toISOString().split('T')[0],
      paymentReference: paymentRef
    }

    setPayrollData(payrollData.map(r => r.id === recordId ? updatedRecord : r))
    setProcessingPayment(null)
    alert(`Payment successful!\nReference: ${paymentRef}\nAmount: AED ${record.netPay}`)
  }

  const handleEditRecord = (record: PayrollRecord) => {
    setEditingRecord(record)
    setRecordForm({
      employee: record.employee,
      role: record.role,
      email: record.email,
      paymentMethod: record.paymentMethod,
      bankAccount: record.bankAccount || '',
      basicSalary: record.basicSalary,
      allowances: record.allowances,
      deductions: record.deductions - calculateSocialSecurity(record.basicSalary),
      bonus: record.bonus
    })
  }

  const handleUpdateRecord = () => {
    if (!editingRecord) return
    const updated = recalculatePayroll({
      ...editingRecord,
      ...recordForm
    })
    setPayrollData(payrollData.map(r => r.id === editingRecord.id ? updated : r))
    setEditingRecord(null)
  }

  const generateWPSSIFFile = () => {
    // Generate WPS SIF format file
    const wpsContent = generateWPSContent()
    const blob = new Blob([wpsContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wps_sif_${selectedMonth}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
    alert('WPS SIF file generated successfully!')
  }

  const generateWPSContent = (): string => {
    const lines: string[] = []
    lines.push('WPS PAYROLL FILE')
    lines.push(`MONTH: ${selectedMonth}`)
    lines.push(`GENERATED: ${new Date().toISOString()}`)
    lines.push('')
    lines.push('EMPLOYEE RECORDS:')
    lines.push('---')

    filteredPayroll.forEach(record => {
      lines.push(`NAME: ${record.employee}`)
      lines.push(`EMPLOYEE ID: E${record.id}`)
      lines.push(`BASIC SALARY: ${record.basicSalary}`)
      lines.push(`GROSS PAY: ${record.grossPay}`)
      lines.push(`DEDUCTIONS: ${record.deductions}`)
      lines.push(`TAX: ${record.tax}`)
      lines.push(`NET PAY: ${record.netPay}`)
      lines.push(`STATUS: ${record.status}`)
      if (record.paymentReference) {
        lines.push(`PAYMENT REF: ${record.paymentReference}`)
      }
      lines.push('---')
    })

    lines.push('')
    lines.push('SUMMARY:')
    lines.push(`Total Gross: ${stats.totalGross}`)
    lines.push(`Total Deductions: ${stats.totalDeductions}`)
    lines.push(`Total Net: ${stats.totalNet}`)
    lines.push(`Processed: ${stats.processed}`)
    lines.push(`Pending: ${stats.pending}`)
    lines.push(`Paid: ${stats.paid}`)

    return lines.join('\n')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Processed':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe':
        return '🔷'
      case 'paypal':
        return '🅿️'
      default:
        return '🏦'
    }
  }


  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
        <p className="text-gray-600 mt-1">Process payments and manage employee compensation</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 flex gap-4">
        <button
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-3 font-medium text-sm border-b-2 ${
            activeTab === 'payroll'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Payroll
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-3 font-medium text-sm border-b-2 ${
            activeTab === 'payments'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Payment History
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 font-medium text-sm border-b-2 ${
            activeTab === 'settings'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Gross</p>
                  <p className="text-2xl font-bold text-gray-900">AED {stats.totalGross.toLocaleString()}</p>
                </div>
                <Banknote className="h-8 w-8 text-blue-500 opacity-20" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Net</p>
                  <p className="text-2xl font-bold text-gray-900">AED {stats.totalNet.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-500 opacity-20" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500 opacity-20" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Paid</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500 opacity-20" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payroll Month</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 items-end">
              <button
                onClick={handleProcessPayroll}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Process All
              </button>
              <button
                onClick={() => {
                  const csvContent = [
                    ['Employee', 'Role', 'Basic Salary', 'Allowances', 'Deductions', 'Bonus', 'Gross Pay', 'Tax', 'Net Pay', 'Status'],
                    ...filteredPayroll.map(record => [
                      record.employee,
                      record.role,
                      record.basicSalary,
                      record.allowances,
                      record.deductions - calculateSocialSecurity(record.basicSalary),
                      record.bonus,
                      record.grossPay,
                      record.tax,
                      record.netPay,
                      record.status
                    ])
                  ].map(row => row.join(',')).join('\n')
                  
                  const blob = new Blob([csvContent], { type: 'text/csv' })
                  const url = window.URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `payroll-${selectedMonth}.csv`
                  a.click()
                  window.URL.revokeObjectURL(url)
                }}
                className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Basic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Allowances</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Bonus</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Gross</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Net Pay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayroll.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{record.employee}</p>
                        <p className="text-xs text-gray-500">{record.role}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">AED {record.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">AED {record.allowances.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">AED {record.bonus.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AED {record.grossPay.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">AED {(record.deductions + record.tax).toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-600">AED {record.netPay.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span title={record.paymentMethod}>{getPaymentMethodIcon(record.paymentMethod)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleEditRecord(record)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 inline" />
                      </button>
                      {record.status !== 'Paid' && (
                        <button
                          onClick={() => {
                            setSelectedPaymentMethod(record.paymentMethod)
                            handlePayEmployee(record.id)
                          }}
                          disabled={processingPayment === record.id}
                          className="text-green-600 hover:text-green-800 font-medium disabled:opacity-50"
                          title="Pay Employee"
                        >
                          {processingPayment === record.id ? (
                            <Clock className="h-4 w-4 inline animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 inline" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => setPayslipModal(record)}
                        className="text-amber-600 hover:text-amber-800 font-medium"
                        title="View Payslip"
                      >
                        <Receipt className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payrollData.filter(r => r.status === 'Paid').map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{record.employee}</td>
                  <td className="px-6 py-4 font-bold text-green-600">AED {record.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4">{getPaymentMethodIcon(record.paymentMethod)} {record.paymentMethod}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.paidDate}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{record.paymentReference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {payrollData.filter(r => r.status === 'Paid').length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No payments made yet
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">🏦 Bank Transfer</h3>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Direct transfer to employee bank accounts</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">🔷 Stripe</h3>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Secure payment processing with Stripe API. Fee: 2.9% + AED 1</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Configure Stripe API
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">🅿️ PayPal</h3>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">PayPal business transfers. Fee: 3.5% + AED 2</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Configure PayPal API
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">WPS File Generation</h2>
            <p className="text-gray-600 mb-4">Generate WPS SIF files for government compliance and payroll reporting</p>
            <button
              onClick={generateWPSSIFFile}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Zap className="h-5 w-5" />
              Generate WPS SIF File
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payroll Rules</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900 text-sm">Basic Salary</p>
                <p className="text-xs text-gray-600">Based on employment contract</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900 text-sm">Social Security</p>
                <p className="text-xs text-gray-600">5% employee contribution from basic salary</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900 text-sm">Tax Calculation</p>
                <p className="text-xs text-gray-600">Progressive tax based on taxable income brackets</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <p className="font-medium text-gray-900 text-sm">Allowances & Bonuses</p>
                <p className="text-xs text-gray-600">Additional compensation components</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Edit Payroll Record</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <input
                  type="text"
                  value={recordForm.employee}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={recordForm.email}
                  onChange={(e) => setRecordForm({ ...recordForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={recordForm.paymentMethod}
                  onChange={(e) => setRecordForm({ ...recordForm, paymentMethod: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              {recordForm.paymentMethod === 'bank' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                  <input
                    type="text"
                    value={recordForm.bankAccount}
                    onChange={(e) => setRecordForm({ ...recordForm, bankAccount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <input
                  type="number"
                  value={recordForm.basicSalary}
                  onChange={(e) => setRecordForm({ ...recordForm, basicSalary: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
                <input
                  type="number"
                  value={recordForm.allowances}
                  onChange={(e) => setRecordForm({ ...recordForm, allowances: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                <input
                  type="number"
                  value={recordForm.bonus}
                  onChange={(e) => setRecordForm({ ...recordForm, bonus: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleUpdateRecord}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingRecord(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {payslipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Payslip</h2>
              <button onClick={() => setPayslipModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Employee</span>
                <span className="font-medium text-gray-900">{payslipModal.employee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Period</span>
                <span className="font-medium text-gray-900">{selectedMonth}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Basic Salary</span>
                <span className="text-gray-900">AED {payslipModal.basicSalary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Allowances</span>
                <span className="text-gray-900">AED {payslipModal.allowances}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bonus</span>
                <span className="text-gray-900">AED {payslipModal.bonus}</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2 mt-2">
                <span className="text-gray-900">Gross Pay</span>
                <span className="text-gray-900">AED {payslipModal.grossPay}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4 border-b pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Deductions</span>
                <span className="text-gray-900">AED {payslipModal.deductions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">AED {payslipModal.tax}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-base">
              <span>Net Pay</span>
              <span className="text-green-600">AED {payslipModal.netPay}</span>
            </div>

            <button
              onClick={() => setPayslipModal(null)}
              className="w-full mt-6 px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
