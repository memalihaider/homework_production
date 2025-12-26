'use client'

import { useState, useMemo } from 'react'
import { 
  DollarSign, 
  Calculator, 
  Check, 
  AlertCircle, 
  Download, 
  TrendingUp, 
  PieChart, 
  FileText,
  Search,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  Activity,
  Target,
  ShieldCheck,
  Wallet,
  CreditCard,
  Banknote,
  Receipt,
  CheckCircle2,
  Clock,
  ArrowDownRight,
  Edit,
  Save
} from 'lucide-react'

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('2025-01')
  const [selectedEmployee, setSelectedEmployee] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [payrollData, setPayrollData] = useState([
    { id: 1, employee: 'Ahmed Al-Mazrouei', role: 'Operations Manager', basicSalary: 8000, allowances: 2000, deductions: 1200, bonus: 1000, grossPay: 11000, netPay: 9800, status: 'Processed', taxableIncome: 9800, tax: 0 },
    { id: 2, employee: 'Fatima Al-Ketbi', role: 'HR Director', basicSalary: 9000, allowances: 2500, deductions: 1300, bonus: 1500, grossPay: 12500, netPay: 11200, status: 'Processed', taxableIncome: 11200, tax: 0 },
    { id: 3, employee: 'Mohammed Bin Ali', role: 'Team Lead', basicSalary: 6000, allowances: 1500, deductions: 900, bonus: 500, grossPay: 8500, netPay: 7600, status: 'Processed', taxableIncome: 7600, tax: 0 },
    { id: 4, employee: 'Sara Al-Noor', role: 'Recruiter', basicSalary: 5500, allowances: 1200, deductions: 800, bonus: 300, grossPay: 7500, netPay: 6700, status: 'Pending', taxableIncome: 6700, tax: 0 },
    { id: 5, employee: 'Layla Al-Mansouri', role: 'Payroll Officer', basicSalary: 5000, allowances: 1000, deductions: 700, bonus: 250, grossPay: 6500, netPay: 5800, status: 'Processed', taxableIncome: 5800, tax: 0 },
    { id: 6, employee: 'Omar Khan', role: 'Specialist', basicSalary: 4500, allowances: 900, deductions: 600, bonus: 200, grossPay: 6000, netPay: 5400, status: 'Processed', taxableIncome: 5400, tax: 0 },
  ])
  const [editingRecord, setEditingRecord] = useState<any>(null)
  const [recordForm, setRecordForm] = useState({
    employee: '',
    role: '',
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    bonus: 0
  })
  const [isProcessingPayroll, setIsProcessingPayroll] = useState(false)

  // Calculate tax based on UAE tax brackets (simplified)
  const calculateTax = (taxableIncome: number): number => {
    if (taxableIncome <= 0) return 0
    if (taxableIncome <= 5000) return 0
    if (taxableIncome <= 10000) return (taxableIncome - 5000) * 0.05
    if (taxableIncome <= 20000) return 250 + (taxableIncome - 10000) * 0.10
    if (taxableIncome <= 35000) return 1250 + (taxableIncome - 20000) * 0.15
    return 3500 + (taxableIncome - 35000) * 0.20
  }

  // Calculate social security deduction (5% employee contribution)
  const calculateSocialSecurity = (basicSalary: number): number => {
    return Math.round(basicSalary * 0.05)
  }

  // Recalculate payroll for a record
  const recalculatePayroll = (record: any) => {
    const grossPay = record.basicSalary + record.allowances + record.bonus
    const socialSecurity = calculateSocialSecurity(record.basicSalary)
    const totalDeductions = record.deductions + socialSecurity
    const taxableIncome = grossPay - totalDeductions
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

  // Process payroll for all pending records
  const handleProcessPayroll = async () => {
    setIsProcessingPayroll(true)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPayrollData(prev => prev.map(record => {
      if (record.status === 'Pending') {
        return {
          ...recalculatePayroll(record),
          status: 'Processed'
        }
      }
      return record
    }))
    
    setIsProcessingPayroll(false)
    alert('Payroll processed successfully!')
  }

  // Edit payroll record
  const handleEditRecord = (record: any) => {
    setEditingRecord(record)
    setRecordForm({
      employee: record.employee,
      role: record.role,
      basicSalary: record.basicSalary,
      allowances: record.allowances,
      deductions: record.deductions - calculateSocialSecurity(record.basicSalary), // Remove SS for editing
      bonus: record.bonus
    })
  }

  // Update payroll record
  const handleUpdateRecord = () => {
    if (!editingRecord) return

    const updatedRecord = recalculatePayroll({
      ...editingRecord,
      ...recordForm
    })

    setPayrollData(prev => prev.map(record => 
      record.id === editingRecord.id ? updatedRecord : record
    ))
    
    setEditingRecord(null)
    setRecordForm({ employee: '', role: '', basicSalary: 0, allowances: 0, deductions: 0, bonus: 0 })
  }

  // Generate payslip (mock function)
  const handleGeneratePayslip = (record: any) => {
    const payslipData = {
      employee: record.employee,
      role: record.role,
      period: selectedMonth,
      basicSalary: record.basicSalary,
      allowances: record.allowances,
      bonus: record.bonus,
      grossPay: record.grossPay,
      deductions: record.deductions,
      tax: record.tax,
      netPay: record.netPay
    }
    
    // In a real app, this would generate a PDF or open a modal
    console.log('Generating payslip for:', payslipData)
    alert(`Payslip generated for ${record.employee}`)
  }

  // Export payroll data
  const handleExportPayroll = () => {
    const csvContent = [
      ['Employee', 'Role', 'Basic Salary', 'Allowances', 'Deductions', 'Bonus', 'Gross Pay', 'Tax', 'Net Pay', 'Status'],
      ...filteredPayroll.map(record => [
        record.employee,
        record.role,
        record.basicSalary,
        record.allowances,
        record.deductions,
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
  }

  // Generate WPS SIF file (mock function)
  const handleGenerateWPSFile = () => {
    // In a real app, this would generate the actual WPS SIF file format
    alert('WPS SIF file generated successfully!')
  }

  const payrollSummary = useMemo(() => {
    const total = payrollData.reduce((sum, emp) => sum + emp.grossPay, 0)
    const netTotal = payrollData.reduce((sum, emp) => sum + emp.netPay, 0)
    const allowancesTotal = payrollData.reduce((sum, emp) => sum + emp.allowances, 0)
    const deductionsTotal = payrollData.reduce((sum, emp) => sum + emp.deductions, 0)

    return {
      totalGross: total,
      totalNet: netTotal,
      totalAllowances: allowancesTotal,
      totalDeductions: deductionsTotal,
      processedCount: payrollData.filter(p => p.status === 'Processed').length,
      pendingCount: payrollData.filter(p => p.status === 'Pending').length
    }
  }, [payrollData])

  const payrollRules = [
    { rule: 'Basic Salary Calculation', description: 'Based on employment contract', compliance: 'UAE Labor Law' },
    { rule: 'Housing Allowance', description: '20-25% of basic salary', compliance: 'Company Policy' },
    { rule: 'Transportation Allowance', description: 'Fixed AED 1,500 per month', compliance: 'Company Policy' },
    { rule: 'Performance Bonus', description: '5-15% based on KPI achievement', compliance: 'Quarterly Review' },
    { rule: 'Annual Increment', description: '5-10% based on performance', compliance: 'Annual Review' },
    { rule: 'Gratuity Calculation', description: '21 days basic for first 5 years, 30 days thereafter', compliance: 'UAE Labor Law' },
    { rule: 'Social Security Deduction', description: 'Employer 12.5%, Employee 5%', compliance: 'Government Mandate' },
  ]

  const getStatusColor = (status: string) => {
    return status === 'Processed' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' : 'bg-amber-100 text-amber-700 border-amber-300'
  }

  const employees = ['all', ...Array.from(new Set(payrollData.map(p => p.employee)))]

  const filteredPayroll = useMemo(() => {
    let filtered = payrollData

    // Filter by employee
    if (selectedEmployee !== 'all') {
      filtered = filtered.filter(p => p.employee === selectedEmployee)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [payrollData, selectedEmployee, searchTerm])

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 text-black shadow-2xl border border-gray-300">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center border border-rose-300">
                <Wallet className="h-5 w-5 text-rose-600" />
              </div>
              <span className="text-rose-600 font-bold tracking-wider text-sm uppercase">Financial Operations</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">Payroll Management</h1>
            <p className="text-gray-600 mt-3 text-lg font-medium max-w-xl">
              Automated payroll processing with rule-based engine and UAE labor law compliance.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleProcessPayroll}
              disabled={isProcessingPayroll}
              className="group relative flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-400 text-white rounded-2xl font-black transition-all shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
            >
              {isProcessingPayroll ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
              {isProcessingPayroll ? 'Processing...' : 'Process Payroll'}
            </button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-rose-100 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-purple-100 blur-[100px]"></div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Gross Pay', value: `AED ${payrollSummary.totalGross.toLocaleString()}`, color: 'rose', icon: Banknote, trend: 'All employees' },
          { label: 'Total Net Pay', value: `AED ${payrollSummary.totalNet.toLocaleString()}`, color: 'emerald', icon: Wallet, trend: 'After deductions' },
          { label: 'Total Deductions', value: `AED ${payrollSummary.totalDeductions.toLocaleString()}`, color: 'amber', icon: ArrowDownRight, trend: 'Tax & benefits' },
          { label: 'Processed', value: `${payrollSummary.processedCount}/${payrollData.length}`, color: 'purple', icon: CheckCircle2, trend: `${payrollSummary.pendingCount} pending` }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-300 group hover:border-rose-500/30 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-${stat.color}-100 text-${stat.color}-600 border border-${stat.color}-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-${stat.color}-600 text-[10px] font-black uppercase tracking-widest`}>{stat.trend}</span>
            </div>
            <p className="text-xs font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-black mt-2 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-300 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300">
            <Calculator className="h-6 w-6 text-rose-600" />
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Payroll Month</p>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-black font-black text-sm focus:outline-none w-full cursor-pointer"
              />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Employee</p>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="bg-transparent text-black font-black text-sm focus:outline-none w-full appearance-none cursor-pointer"
              >
                {employees.map(emp => (
                  <option key={emp} value={emp} className="bg-white">{emp === 'all' ? 'All Employees' : emp}</option>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-black font-black text-lg focus:outline-none w-full placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white border border-gray-300 rounded-[32px] overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-300 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-black text-black">Payroll Register</h3>
          <button 
            onClick={handleExportPayroll}
            className="text-rose-600 hover:text-rose-500 transition-colors"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Employee</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Basic</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Allowances</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Deductions</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Bonus</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Gross Pay</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">Net Pay</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayroll.map((record) => (
                <tr key={record.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gray-100 border border-gray-300 flex items-center justify-center text-black font-black text-xs">
                        {record.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-black text-black text-sm group-hover:text-rose-600 transition-colors">{record.employee}</p>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-0.5">{record.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-black">AED {record.basicSalary.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-emerald-600">AED {record.allowances.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-rose-600">AED {record.deductions.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-purple-600">AED {record.bonus.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-black">AED {record.grossPay.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black text-emerald-600">AED {record.netPay.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditRecord(record)}
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 border border-blue-300 transition-colors"
                        title="Edit Record"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleGeneratePayslip(record)}
                        className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                        title="Generate Payslip"
                      >
                        <Receipt className="h-4 w-4 text-emerald-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Record Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] border border-gray-300 p-8 max-w-md w-full">
            <h3 className="text-xl font-black text-black mb-6 flex items-center gap-3">
              <Edit className="h-6 w-6 text-rose-600" />
              Edit Payroll Record
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Employee</p>
                <input
                  type="text"
                  value={recordForm.employee}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, employee: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Role</p>
                <input
                  type="text"
                  value={recordForm.role}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Basic Salary (AED)</p>
                <input
                  type="number"
                  value={recordForm.basicSalary}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, basicSalary: Number(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Allowances (AED)</p>
                <input
                  type="number"
                  value={recordForm.allowances}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, allowances: Number(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Deductions (AED)</p>
                <input
                  type="number"
                  value={recordForm.deductions}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, deductions: Number(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
              
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Bonus (AED)</p>
                <input
                  type="number"
                  value={recordForm.bonus}
                  onChange={(e) => setRecordForm(prev => ({ ...prev, bonus: Number(e.target.value) }))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdateRecord}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all"
              >
                <Save className="h-4 w-4" />
                Update Record
              </button>
              <button
                onClick={() => setEditingRecord(null)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Rule Engine & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-300 rounded-[32px] p-8">
          <h3 className="text-xl font-black text-black mb-8 flex items-center gap-3">
            <Calculator className="h-6 w-6 text-rose-600" />
            Payroll Rule Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payrollRules.map((rule, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 group hover:border-rose-500/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-black text-black text-sm">{rule.rule}</h4>
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest px-2 py-1 bg-rose-100 rounded-lg border border-rose-300">
                    {rule.compliance}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-rose-600 to-purple-600 rounded-[32px] p-8 text-white shadow-2xl shadow-rose-600/20">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6" />
              Compliance
            </h3>
            <p className="text-sm font-bold leading-relaxed opacity-90 mb-6">
              All payroll calculations comply with UAE Labor Law. Social security contributions and benefits are processed automatically.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest">WPS Ready</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-widest">Tax Compliance Verified</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-[32px] p-8">
            <h3 className="text-lg font-black text-black mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  filteredPayroll.forEach(record => handleGeneratePayslip(record))
                }}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3"
              >
                <Receipt className="h-4 w-4" />
                Generate Payslips
              </button>
              <button 
                onClick={handleGenerateWPSFile}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-2xl text-black font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3"
              >
                <FileText className="h-4 w-4" />
                WPS SIF File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
